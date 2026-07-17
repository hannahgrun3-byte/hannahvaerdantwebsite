import { Composition } from "remotion";
import { WebsiteDemo, SCROLL_DURATION, TERMINAL_DURATION, TRANSITION_DURATION } from "./WebsiteDemo";

export const MyComposition = () => {
  return (
    <Composition
      id="WebsiteDemo"
      component={WebsiteDemo}
      durationInFrames={SCROLL_DURATION + TERMINAL_DURATION - TRANSITION_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
