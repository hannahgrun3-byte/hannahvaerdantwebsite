import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BrowserScroll } from "./BrowserScroll";
import { TerminalDemo } from "./TerminalDemo";

export const SCROLL_DURATION = 300;
export const TERMINAL_DURATION = 270;
export const TRANSITION_DURATION = 15;

export const WebsiteDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCROLL_DURATION}>
        <BrowserScroll />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />
      <TransitionSeries.Sequence durationInFrames={TERMINAL_DURATION}>
        <TerminalDemo />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
