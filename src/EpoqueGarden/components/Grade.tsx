import { AbsoluteFill } from "remotion";
import {
  VIGNETTE,
  WARM_OVERLAY_COLOR,
  WARM_OVERLAY_OPACITY,
} from "../constants";

/**
 * Top layer of the warm cinematic look that sits above all footage:
 * a semi-transparent warm wash (overlay blend) plus a soft vignette.
 * The per-clip color filter is applied inside <Clip>.
 */
export const Grade: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundColor: WARM_OVERLAY_COLOR,
          opacity: WARM_OVERLAY_OPACITY,
          mixBlendMode: "overlay",
        }}
      />
      <AbsoluteFill style={{ background: VIGNETTE }} />
    </AbsoluteFill>
  );
};
