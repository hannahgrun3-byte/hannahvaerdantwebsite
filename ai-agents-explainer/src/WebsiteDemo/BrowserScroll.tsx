import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const IMAGE_WIDTH = 2560;
const IMAGE_HEIGHT = 18302;

const FRAME_WIDTH = 900;
const FRAME_HEIGHT = 1400;
const FRAME_TOP = 260;

export const BrowserScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });

  const displayedImageHeight = (FRAME_WIDTH / IMAGE_WIDTH) * IMAGE_HEIGHT;
  const maxScroll = displayedImageHeight - FRAME_HEIGHT;

  const scrollHoldFrames = 15;
  const scrollStart = scrollHoldFrames;
  const scrollEnd = durationInFrames - scrollHoldFrames;

  const scrollY = interpolate(
    frame,
    [scrollStart, scrollEnd],
    [0, -maxScroll],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          top: FRAME_TOP,
          transform: `scale(${entrance})`,
        }}
      >
        <div
          style={{
            width: FRAME_WIDTH,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              height: 56,
              background: "#161616",
              display: "flex",
              alignItems: "center",
              padding: "0 22px",
              gap: 8,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff5f57" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#febc2e" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#28c840" }} />
            <div
              style={{
                marginLeft: 20,
                flex: 1,
                background: "#242424",
                borderRadius: 8,
                height: 32,
                display: "flex",
                alignItems: "center",
                paddingLeft: 16,
                fontFamily: "Inter, sans-serif",
                fontSize: 28,
                color: "#9a9a9a",
              }}
            >
              hannahverdant.co
            </div>
          </div>
          <div style={{ height: FRAME_HEIGHT, overflow: "hidden", position: "relative" }}>
            <Img
              src={staticFile("website-fullpage.png")}
              style={{
                width: FRAME_WIDTH,
                position: "absolute",
                top: scrollY,
                left: 0,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
