import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CLOSING_TEXT_DELAY_FRAMES,
  LOGO_FILE,
  LOGO_WIDTH,
  SAFE,
  TEXT_COLOR,
  TEXT_SHADOW,
} from "../constants";
import type { OverlayTypography } from "../fonts";

const FADE_FRAMES = 12;

export type ClosingCardProps = {
  text: string;
  inFrame: number;
  outFrame: number;
  fontSize: number;
  typography: OverlayTypography;
};

const staggeredOpacity = (
  frame: number,
  inFrame: number,
  outFrame: number,
) => {
  if (frame < inFrame || frame > outFrame) {
    return 0;
  }

  if (frame < inFrame + FADE_FRAMES) {
    return interpolate(frame, [inFrame, inFrame + FADE_FRAMES], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  if (frame > outFrame - FADE_FRAMES) {
    return interpolate(
      frame,
      [outFrame - FADE_FRAMES, outFrame],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  }

  return 1;
};

/** Logo + reservations line centered, with staggered entrance. */
export const ClosingCard: React.FC<ClosingCardProps> = ({
  text,
  inFrame,
  outFrame,
  fontSize,
  typography,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < inFrame || frame > outFrame) {
    return null;
  }

  const textInFrame = inFrame + CLOSING_TEXT_DELAY_FRAMES;

  const logoOpacity = staggeredOpacity(frame, inFrame, outFrame);
  const textOpacity = staggeredOpacity(frame, textInFrame, outFrame);

  const logoEnter = spring({
    frame: frame - inFrame,
    fps,
    config: { damping: 200 },
  });
  const textEnter = spring({
    frame: frame - textInFrame,
    fps,
    config: { damping: 200 },
  });
  const logoY = interpolate(logoEnter, [0, 1], [36, 0]);
  const textY = interpolate(textEnter, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Img
          src={staticFile(LOGO_FILE)}
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
            width: LOGO_WIDTH,
            height: "auto",
            filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.55))",
          }}
        />
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            color: TEXT_COLOR,
            fontFamily: typography.fontFamily,
            fontWeight: typography.fontWeight,
            fontSize,
            lineHeight: typography.lineHeight ?? 1.2,
            letterSpacing: typography.letterSpacing,
            textAlign: "center",
            textShadow: TEXT_SHADOW,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
