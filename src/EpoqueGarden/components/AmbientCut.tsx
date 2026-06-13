import { type TransitionIn, videoFile } from "../constants";
import { Clip } from "./Clip";

export type AmbientCutProps = {
  /** Filename from CLIPS (resolved against /public/videos). */
  clip: string;
  trimBefore?: number;
  transitionIn?: TransitionIn;
  scaleFrom?: number;
  scaleTo?: number;
  scaleDurationInFrames?: number;
};

/**
 * A single ambient beat with optional incoming transition and punch-in.
 */
export const AmbientCut: React.FC<AmbientCutProps> = ({
  clip,
  trimBefore,
  transitionIn,
  scaleFrom,
  scaleTo,
  scaleDurationInFrames,
}) => {
  return (
    <Clip
      src={videoFile(clip)}
      trimBefore={trimBefore}
      transitionIn={transitionIn}
      scaleFrom={scaleFrom}
      scaleTo={scaleTo}
      scaleDurationInFrames={scaleDurationInFrames}
    />
  );
};
