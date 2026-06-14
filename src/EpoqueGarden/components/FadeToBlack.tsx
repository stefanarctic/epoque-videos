import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  DURATION_IN_FRAMES,
  FADE_IN_FRAMES,
  FADE_OUT_ALL_FRAMES,
  FADE_OUT_BG_FRAMES,
  FADE_OUT_HOLD_FRAMES,
  FADE_OUT_START,
} from "../constants";

const backgroundFadeEnd = FADE_OUT_START + FADE_OUT_BG_FRAMES;
const fullFadeStart = backgroundFadeEnd + FADE_OUT_HOLD_FRAMES;

/** Fades from black at the opening — covers the full frame. */
export const FadeFromBlack: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, FADE_IN_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (opacity === 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

/** Fades footage + grade to black while overlays stay visible. */
export const BackgroundFadeToBlack: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [FADE_OUT_START, backgroundFadeEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (opacity === 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

/** After a short hold on black, fades the remaining overlays to black. */
export const FullFadeToBlack: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [fullFadeStart, DURATION_IN_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (opacity === 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
