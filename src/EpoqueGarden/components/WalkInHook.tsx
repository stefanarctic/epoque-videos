import {
  CLIPS,
  TRIMS,
  videoFile,
  WALKIN_PLAYBACK_RATE,
} from "../constants";
import { Clip } from "./Clip";

/**
 * frames 0-90 - the hook. Follow-behind walk-in through the branded arch,
 * trimmed to start when the waiter actually steps forward.
 */
export const WalkInHook: React.FC = () => {
  return (
    <Clip
      src={videoFile(CLIPS.walkin)}
      trimBefore={TRIMS.walkin}
      playbackRate={WALKIN_PLAYBACK_RATE}
    />
  );
};
