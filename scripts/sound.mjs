/**
 * SightPress sound synthesis: turns one entry of sound/sound.json into a
 * 16-bit mono WAV. Pure and deterministic (no randomness), so `npm run check`
 * can compare the output byte for byte. No recorded audio is used.
 */

const NOTE = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };

/** "F#4" -> 369.99 Hz, equal temperament, A4 = 440 Hz. */
export function frequency(name) {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(name);
  if (!m) throw new Error(`Unknown note "${name}".`);
  const semis = NOTE[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + (Number(m[3]) - 4) * 12;
  return 440 * 2 ** (semis / 12);
}

const TAU = 2 * Math.PI;

function voice(out, rate, start, note, inst) {
  const f0 = frequency(note.note);
  const first = Math.round(start * rate);
  const held = note.for ?? 0;
  const sustained = inst.partials.every(([, , decay]) => decay === 0);
  // A decaying voice rings until its slowest partial is 60 dB down.
  const ring = sustained ? held + (inst.release ?? 0.2)
    : Math.max(...inst.partials.map(([, , d]) => d)) * 6.9;
  const last = Math.min(out.length, first + Math.round(ring * rate));
  const detunes = inst.detuneCents ? [-inst.detuneCents, inst.detuneCents] : [0];
  for (let i = first; i < last; i++) {
    const t = (i - first) / rate;
    let env = Math.min(1, t / inst.attack);
    if (sustained && t > held) env *= Math.max(0, 1 - (t - held) / (inst.release ?? 0.2));
    let s = 0;
    for (const [ratio, level, decay] of inst.partials) {
      const amp = level * (decay === 0 ? 1 : Math.exp(-t / decay));
      if (amp < 1e-5) continue;
      for (const c of detunes) s += amp * Math.sin(TAU * f0 * ratio * 2 ** (c / 1200) * t) / detunes.length;
    }
    out[i] += s * env * note.level;
  }
}

/** Render one sound. Returns { wav: Buffer, peakDb, seconds, problems: string[] }. */
export function renderSound(spec, lib) {
  const rate = lib.sampleRate;
  const rules = lib.rules[spec.kind];
  const problems = [];
  const out = new Float64Array(Math.round(spec.seconds * rate));
  for (const n of spec.notes) {
    const inst = lib.instruments[n.voice];
    if (!inst) { problems.push(`it uses an unknown voice "${n.voice}"`); continue; }
    const hz = frequency(n.note);
    if (hz < lib.rules.minHz || hz > lib.rules.maxHz) {
      problems.push(`${n.note} (${Math.round(hz)} Hz) is outside ${lib.rules.minHz} to ${lib.rules.maxHz} Hz`);
    }
    voice(out, rate, n.at, n, inst);
  }
  // Ease out over the last `fadeSeconds` (default 150 ms, or a third of a
  // short sound) so nothing is cut off or clicks, then normalise to the stated peak.
  const fade = Math.round(Math.min(spec.fadeSeconds ?? 0.15, spec.seconds / 3) * rate);
  for (let i = 0; i < fade; i++) out[out.length - 1 - i] *= (i / fade) ** 2;
  let peak = 0;
  for (const s of out) peak = Math.max(peak, Math.abs(s));
  const gain = peak ? 10 ** (spec.peakDb / 20) / peak : 0;

  const data = Buffer.alloc(out.length * 2);
  for (let i = 0; i < out.length; i++) {
    data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(out[i] * gain * 32767))), i * 2);
  }
  const head = Buffer.alloc(44);
  head.write('RIFF', 0); head.writeUInt32LE(36 + data.length, 4); head.write('WAVE', 8);
  head.write('fmt ', 12); head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20); head.writeUInt16LE(1, 22);
  head.writeUInt32LE(rate, 24); head.writeUInt32LE(rate * 2, 28); head.writeUInt16LE(2, 32); head.writeUInt16LE(16, 34);
  head.write('data', 36); head.writeUInt32LE(data.length, 40);

  if (!rules) problems.push(`its kind "${spec.kind}" is not "ui" or "logo"`);
  else {
    if (spec.seconds > rules.maxSeconds) problems.push(`it lasts ${spec.seconds} seconds; ${spec.kind} sounds last at most ${rules.maxSeconds}`);
    if (spec.peakDb > rules.maxPeakDb) problems.push(`its peak is ${spec.peakDb} dBFS; ${spec.kind} sounds peak at ${rules.maxPeakDb} dBFS or lower`);
  }
  for (const field of ['name', 'use', 'description']) if (!spec[field]?.trim()) problems.push(`it has no ${field}`);
  if (rules?.caption && !spec.caption) problems.push('it has no caption for videos');
  return { wav: Buffer.concat([head, data]), seconds: spec.seconds, problems };
}
