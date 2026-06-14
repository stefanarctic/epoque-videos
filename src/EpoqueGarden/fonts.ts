import { loadFont as loadCinzelFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadMarckScriptFont } from "@remotion/google-fonts/MarckScript";

const SUBSETS = ["latin", "latin-ext"] as const;

/** Roman serif — closest match to the EPOQUE signage (Trajan-style). */
export const { fontFamily: FONT_DISPLAY } = loadCinzelFont("normal", {
  weights: ["400", "700"],
  subsets: [...SUBSETS],
});

/** Brush script — matches the Steakhouse sign lettering. */
export const { fontFamily: FONT_SCRIPT } = loadMarckScriptFont("normal", {
  subsets: [...SUBSETS],
});

export type OverlayTypography = {
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
  lineHeight?: number;
};

export const OVERLAY_TYPOGRAPHY = {
  title: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    letterSpacing: "0.06em",
    lineHeight: 1.08,
  },
  subtitle: {
    fontFamily: FONT_SCRIPT,
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: 1.15,
  },
  cta: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    letterSpacing: "0.12em",
    lineHeight: 1.2,
  },
} as const satisfies Record<string, OverlayTypography>;
