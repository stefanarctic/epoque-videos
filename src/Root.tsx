import { Composition } from "remotion";
import { EpoqueGarden } from "./EpoqueGarden/EpoqueGarden";
import {
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
} from "./EpoqueGarden/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // Render with: npm run render
        id="EpoqueGarden"
        component={EpoqueGarden}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
