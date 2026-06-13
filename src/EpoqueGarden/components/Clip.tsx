import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  useCurrentFrame,
} from "remotion";
import { GRADE_FILTER, type TransitionIn } from "../constants";

export type ClipProps = {
  src: string;
  /** Source-frame offset (trim the start of the clip). */
  trimBefore?: number;
  /** Playback speed. < 1 is slow motion. */
  playbackRate?: number;
  /** Incoming transition from the previous shot. */
  transitionIn?: TransitionIn;
  /** Punch-in (slow zoom) start scale. */
  scaleFrom?: number;
  /** Punch-in (slow zoom) end scale. */
  scaleTo?: number;
  /** Frames over which the punch-in is applied (usually the sequence duration). */
  scaleDurationInFrames?: number;
};

const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

const getTransitionProgress = (frame: number, frames: number, soft: boolean) =>
  interpolate(frame, [0, frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: soft ? easeOut : Easing.linear,
  });

/**
 * Shared footage wrapper: center-crops any source to the portrait frame
 * (objectFit: cover), applies the warm grade, and optionally animates a
 * punch-in and/or an incoming transition. Footage audio is muted - the music
 * track carries the edit.
 */
export const Clip: React.FC<ClipProps> = ({
  src,
  trimBefore,
  playbackRate,
  transitionIn,
  scaleFrom = 1,
  scaleTo = 1,
  scaleDurationInFrames = 1,
}) => {
  const frame = useCurrentFrame();

  const transitionFrames = transitionIn?.frames ?? 0;
  const progress =
    transitionIn && transitionFrames > 0
      ? getTransitionProgress(
          frame,
          transitionFrames,
          transitionIn.kind === "soft",
        )
      : 1;

  const opacity = transitionIn ? progress : 1;

  const entranceScale =
    transitionIn?.kind === "fade-scale" && transitionFrames > 0
      ? interpolate(progress, [0, 1], [1.04, 1])
      : 1;

  const punchScale =
    scaleFrom === scaleTo
      ? scaleFrom
      : interpolate(frame, [0, scaleDurationInFrames], [scaleFrom, scaleTo], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const scale = entranceScale * punchScale;

  const dipOpacity =
    transitionIn?.kind === "dip"
      ? interpolate(progress, [0, 1], [1, 0])
      : 0;

  return (
    <AbsoluteFill style={{ opacity }}>
      <OffthreadVideo
        src={src}
        trimBefore={trimBefore}
        playbackRate={playbackRate}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          filter: GRADE_FILTER,
        }}
      />
      {dipOpacity > 0 && (
        <AbsoluteFill style={{ backgroundColor: "black", opacity: dipOpacity }} />
      )}
    </AbsoluteFill>
  );
};
