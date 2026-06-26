// A tiny synthesized "pop" played when a tree lifts off the page.
// No audio file needed — it's a short pitched blip with a fast decay.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Browsers keep the AudioContext suspended until a real user gesture. Hovering
// isn't a gesture, so we resume it on the first click/keydown/touch — after
// that, hover pops play freely.
let unlocked = false;
export function initSound() {
  if (unlocked) return;
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    const ac = getCtx();
    if (ac && ac.state === "suspended") void ac.resume();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  window.addEventListener("touchstart", unlock);
}

export function playPop() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

  // quiet, quick in/out so it's a soft little "pop"
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.16);
}
