import {
  CLIPS,
  TRIMS,
  type TransitionIn,
  videoFile,
  WINE_CLINK_PLAYBACK_RATE,
} from "../constants";
import { Clip } from "./Clip";

type WineClinkProps = {
  transitionIn?: TransitionIn;
};

/**
 * THE PEAK — macro rosé "cheers" at 0.8× so the clink reads in slow motion.
 * trimBefore picks the approach; contact lands ~1.5 s into the beat.
 */
export const WineClink: React.FC<WineClinkProps> = ({ transitionIn }) => {
  return (
    <Clip
      src={videoFile(CLIPS.wineClink)}
      trimBefore={TRIMS.wineClink}
      playbackRate={WINE_CLINK_PLAYBACK_RATE}
      transitionIn={transitionIn}
    />
  );
};
