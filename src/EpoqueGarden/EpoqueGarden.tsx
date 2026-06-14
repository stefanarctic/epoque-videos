import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
} from "remotion";
import {
  CLIPS,
  DURATION_IN_FRAMES,
  ENABLE_MUSIC,
  FADE_OUT_START,
  INCOMING_TRANSITIONS,
  MUSIC_FILE,
  MUSIC_START_FROM,
  MUSIC_VOLUME,
  overlapForTransition,
  OVERLAYS,
  PUNCH_IN,
  TEXT,
  TIMELINE,
  TRIMS,
} from "./constants";
import { AmbientCut } from "./components/AmbientCut";
import { ClosingCard } from "./components/ClosingCard";
import {
  BackgroundFadeToBlack,
  FadeFromBlack,
  FullFadeToBlack,
} from "./components/FadeToBlack";
import { Grade } from "./components/Grade";
import { TextOverlay } from "./components/TextOverlay";
import { WalkInHook } from "./components/WalkInHook";
import { WineClink } from "./components/WineClink";
import { OVERLAY_TYPOGRAPHY } from "./fonts";

export const EpoqueGarden: React.FC = () => {
  const ambient = overlapForTransition(
    TIMELINE.ambientDetail.from,
    TIMELINE.ambientDetail.duration,
    INCOMING_TRANSITIONS.ambientDetail,
  );
  const reveal = overlapForTransition(
    TIMELINE.reveal.from,
    TIMELINE.reveal.duration,
    INCOMING_TRANSITIONS.reveal,
  );
  const crowd = overlapForTransition(
    TIMELINE.crowd.from,
    TIMELINE.crowd.duration,
    INCOMING_TRANSITIONS.crowd,
  );
  const waterChannel = overlapForTransition(
    TIMELINE.waterChannel.from,
    TIMELINE.waterChannel.duration,
    INCOMING_TRANSITIONS.waterChannel,
  );
  const wineClink = overlapForTransition(
    TIMELINE.wineClink.from,
    TIMELINE.wineClink.duration,
    INCOMING_TRANSITIONS.wineClink,
  );
  const finalSettle = overlapForTransition(
    TIMELINE.finalSettle.from,
    TIMELINE.finalSettle.duration,
    INCOMING_TRANSITIONS.finalSettle,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill>
        {/* --- Footage timeline --- */}
        <Sequence
          from={TIMELINE.walkin.from}
          durationInFrames={TIMELINE.walkin.duration}
        >
          <WalkInHook />
        </Sequence>

        <Sequence from={ambient.from} durationInFrames={ambient.durationInFrames}>
          <AmbientCut
            clip={CLIPS.ambientDetail}
            trimBefore={TRIMS.ambientDetail}
            transitionIn={INCOMING_TRANSITIONS.ambientDetail}
          />
        </Sequence>

        <Sequence from={reveal.from} durationInFrames={reveal.durationInFrames}>
          <AmbientCut
            clip={CLIPS.reveal}
            trimBefore={TRIMS.reveal}
            transitionIn={INCOMING_TRANSITIONS.reveal}
            scaleFrom={PUNCH_IN.revealFrom}
            scaleTo={PUNCH_IN.revealTo}
            scaleDurationInFrames={TIMELINE.reveal.duration}
          />
        </Sequence>

        <Sequence from={crowd.from} durationInFrames={crowd.durationInFrames}>
          <AmbientCut
            clip={CLIPS.crowd}
            trimBefore={TRIMS.crowd}
            transitionIn={INCOMING_TRANSITIONS.crowd}
          />
        </Sequence>

        <Sequence
          from={waterChannel.from}
          durationInFrames={waterChannel.durationInFrames}
        >
          <AmbientCut
            clip={CLIPS.waterChannel}
            trimBefore={TRIMS.waterChannel}
            transitionIn={INCOMING_TRANSITIONS.waterChannel}
          />
        </Sequence>

        <Sequence
          from={wineClink.from}
          durationInFrames={wineClink.durationInFrames}
        >
          <WineClink transitionIn={INCOMING_TRANSITIONS.wineClink} />
        </Sequence>

        <Sequence
          from={finalSettle.from}
          durationInFrames={finalSettle.durationInFrames}
        >
          <AmbientCut
            clip={CLIPS.reveal}
            trimBefore={TRIMS.finalSettle}
            transitionIn={INCOMING_TRANSITIONS.finalSettle}
            scaleFrom={PUNCH_IN.finalFrom}
            scaleTo={PUNCH_IN.finalTo}
            scaleDurationInFrames={finalSettle.durationInFrames}
          />
        </Sequence>

        <Grade />
        <BackgroundFadeToBlack />
      </AbsoluteFill>

      {/* --- Text overlays --- */}
      <TextOverlay
        text={TEXT.title}
        inFrame={OVERLAYS.title.in}
        outFrame={OVERLAYS.title.out}
        fontSize={112}
        typography={OVERLAY_TYPOGRAPHY.title}
        placement="center"
      />
      <TextOverlay
        text={TEXT.subtitle}
        inFrame={OVERLAYS.subtitle.in}
        outFrame={OVERLAYS.subtitle.out}
        fontSize={108}
        typography={OVERLAY_TYPOGRAPHY.subtitle}
        placement="center"
      />
      <ClosingCard
        text={TEXT.cta}
        inFrame={OVERLAYS.cta.in}
        outFrame={OVERLAYS.cta.out}
        fontSize={52}
        typography={OVERLAY_TYPOGRAPHY.cta}
        holdUntilEnd
      />

      <FullFadeToBlack />
      <FadeFromBlack />

      {/* --- Music (drop /public/music.mp3 and set ENABLE_MUSIC = true) --- */}
      {ENABLE_MUSIC && (
        <Audio
          src={staticFile(MUSIC_FILE)}
          trimBefore={MUSIC_START_FROM}
          volume={(f) =>
            interpolate(
              f,
              [FADE_OUT_START, DURATION_IN_FRAMES],
              [MUSIC_VOLUME, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
        />
      )}
    </AbsoluteFill>
  );
};
