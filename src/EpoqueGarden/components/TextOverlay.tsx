import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY, SAFE, TEXT_COLOR, TEXT_SHADOW } from "../constants";

const FADE_FRAMES = 12;

export type TextOverlayProps = {
  text: string;
  /** Absolute composition frame the overlay appears on. */
  inFrame: number;
  /** Absolute composition frame the overlay is fully gone by. */
  outFrame: number;
  fontSize: number;
  /** Vertical anchor within the safe zone. */
  placement?: "center" | "bottom";
};

/**
 * Absolute, horizontally-centered text. Fades in/out via opacity and does a
 * subtle spring slide-up on entry. Stays inside the IG/TikTok safe zones.
 */
export const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  inFrame,
  outFrame,
  fontSize,
  placement = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < inFrame || frame > outFrame) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [inFrame, inFrame + FADE_FRAMES, outFrame - FADE_FRAMES, outFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const enter = spring({
    frame: frame - inFrame,
    fps,
    config: { damping: 200 },
  });
  const translateY = interpolate(enter, [0, 1], [32, 0]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: placement === "bottom" ? "flex-end" : "center",
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          color: TEXT_COLOR,
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          textAlign: "center",
          textShadow: TEXT_SHADOW,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
