import { staticFile } from "remotion";

// ---------------------------------------------------------------------------
// Composition
// ---------------------------------------------------------------------------
export const FPS = 30;
export const DURATION_IN_FRAMES = 540; // 18 seconds
export const WIDTH = 1080;
export const HEIGHT = 1920;

// ---------------------------------------------------------------------------
// Footage
// ---------------------------------------------------------------------------
// Source clips live in /public/videos with timestamp filenames.
// To swap footage, change a filename here - nothing else needs to change.
const VIDEO_DIR = "videos";
export const videoFile = (name: string) => staticFile(`${VIDEO_DIR}/${name}`);

export const CLIPS = {
  walkin: "20260611_181051.mp4", // follow-behind walk-in through the branded arch
  ambientDetail: "20260611_181630.mp4", // tables through foreground palm fronds
  reveal: "20260611_181427.mp4", // reveal -> sail shades + water channel
  crowd: "20260611_191038.mp4", // lively evening service along the water channel
  waterChannel: "20260611_191408.mp4", // calm observational water-channel shot
  wineClink: "20260611_204808.mp4", // macro rosé "cheers" - the peak
} as const;

// ---------------------------------------------------------------------------
// Timeline (frame ranges) - edit these to retime the edit
// ---------------------------------------------------------------------------
export const TIMELINE = {
  walkin: { from: 0, duration: 90 },
  ambientDetail: { from: 90, duration: 60 },
  reveal: { from: 150, duration: 75 },
  crowd: { from: 225, duration: 90 },
  waterChannel: { from: 315, duration: 60 },
  wineClink: { from: 375, duration: 60 },
  finalSettle: { from: 435, duration: 105 },
} as const;

// Per-use trims (composition frames @ 30 fps). Each value skips dead air at the
// top of the source clip so the cut lands on motion. See public/.frames/ sheets.
export const TRIMS = {
  // f_005 (~4 s): mid-stride through the arch — not the 3 s idle before the gate.
  walkin: 120,
  // f_005 (~4 s): leaf-framed drift across the terrace (waiter is static early on).
  ambientDetail: 120,
  // f_003 (~2 s): skip the blurred wipe; open on sail shades + water channel.
  reveal: 60,
  // f_006 (~5 s): roam past the bridge; guest walking on the right.
  crowd: 150,
  // f_007 (~6 s): camera lowers toward the water edge — skip the static bench hold.
  waterChannel: 180,
  // f_005 (~4.5 s): paharele se apropie, apoi clinchetul la ~1.5 s în beat.
  wineClink: 135,
  // f_004 (~2.5 s): resolved terrace + figure along the channel (≠ reveal beat).
  finalSettle: 75,
} as const;

// Slow-motion for the peak.
export const WINE_CLINK_PLAYBACK_RATE = 0.8;
// Normal speed — trim already skips the idle intro.
export const WALKIN_PLAYBACK_RATE = 1;

// ---------------------------------------------------------------------------
// Transitions — incoming overlap per cut (keeps timeline frame positions).
// ---------------------------------------------------------------------------
export type TransitionKind = "crossfade" | "dip" | "soft" | "fade-scale";

export type TransitionIn = {
  kind: TransitionKind;
  frames: number;
};

/** Per-cut incoming transition matched to the editorial beat. */
export const INCOMING_TRANSITIONS = {
  // walk-in → fronds: gentle dissolve, same stroll
  ambientDetail: { kind: "crossfade", frames: 8 },
  // fronds → sail-shade reveal: opens up like the in-camera wipe
  reveal: { kind: "fade-scale", frames: 10 },
  // reveal → evening crowd: brief dip bridges daylight → service
  crowd: { kind: "dip", frames: 12 },
  // crowd → calm water: soft match cut, same venue
  waterChannel: { kind: "crossfade", frames: 8 },
  // water → macro wine: slow ease into the hero detail
  wineClink: { kind: "soft", frames: 10 },
  // wine → bookend wide: dissolve back to the terrace
  finalSettle: { kind: "crossfade", frames: 10 },
} as const satisfies Record<string, TransitionIn>;

export const overlapForTransition = (
  from: number,
  duration: number,
  transition: TransitionIn,
) => ({
  from: from - transition.frames,
  durationInFrames: duration + transition.frames,
});

// Punch-in (slow zoom) range applied to the reveal + final settle.
export const PUNCH_IN = {
  revealFrom: 1.0,
  revealTo: 1.05,
  finalFrom: 1.05,
  finalTo: 1.08,
} as const;

// ---------------------------------------------------------------------------
// Grade (warm cinematic look)
// ---------------------------------------------------------------------------
export const GRADE_FILTER = "saturate(1.15) contrast(1.05) brightness(1.02)";
export const WARM_OVERLAY_COLOR = "#ff8c42";
export const WARM_OVERLAY_OPACITY = 0.08;
// Subtle darkened edges for depth.
export const VIGNETTE =
  "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)";

// ---------------------------------------------------------------------------
// Text overlays (Romanian) - edit copy here
// ---------------------------------------------------------------------------
export const TEXT = {
  title: "Grădina Epoque",
  subtitle: "s-a deschis",
  cta: "Rezervări · [nr/link]",
} as const;

export const TEXT_COLOR = "#ffffff";
export const TEXT_SHADOW = "0 2px 18px rgba(0,0,0,0.55)";
export const FONT_FAMILY =
  '"Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif';

// IG / TikTok UI safe zones (px). Keep all text inside these margins.
export const SAFE = {
  top: 250,
  bottom: 320,
} as const;

// When each overlay enters / leaves (absolute composition frames).
export const OVERLAYS = {
  title: { in: 95, out: 220 },
  subtitle: { in: 230, out: 345 },
  cta: { in: 445, out: DURATION_IN_FRAMES },
} as const;

// ---------------------------------------------------------------------------
// Music (wired but gated until a track is added)
// ---------------------------------------------------------------------------
// Drop a track at /public/music.mp3, then set ENABLE_MUSIC = true.
export const ENABLE_MUSIC = true;
export const MUSIC_FILE = "music.mp3";
export const MUSIC_START_FROM = 0; // shift to land the first downbeat on frame 0
export const MUSIC_FADE_FRAMES = 30; // fade volume 1 -> 0 over the last 30 frames
