import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Line = {
  startFrame: number;
  text: string;
  kind: "prompt" | "output" | "success";
  typeSpeed?: number;
};

const LINES: Line[] = [
  { startFrame: 0, text: "claude", kind: "prompt", typeSpeed: 2 },
  {
    startFrame: 25,
    text: "> Build a landing page for Hannah Verdant, a marketing\n  partner for growing service businesses",
    kind: "output",
    typeSpeed: 0.8,
  },
  { startFrame: 90, text: "Reading brand notes...", kind: "output" },
  { startFrame: 115, text: "Scaffolding index.html + sections", kind: "output" },
  {
    startFrame: 140,
    text: 'Editing hero copy -> "Helping growing service\n  businesses simplify their marketing."',
    kind: "output",
  },
  { startFrame: 175, text: "Wiring up audit funnel + booking form", kind: "output" },
  { startFrame: 205, text: "Done. Site live at hannahverdant.co", kind: "success" },
];

const charsVisible = (frame: number, line: Line) => {
  const speed = line.typeSpeed ?? 1.4;
  const elapsed = Math.max(0, frame - line.startFrame);
  return Math.floor(elapsed * speed);
};

export const TerminalDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });

  const showCursorBlink = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 920,
          minHeight: 900,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: `scale(${entrance})`,
          background: "#111111",
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
              flex: 1,
              textAlign: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: 26,
              color: "#9a9a9a",
              marginRight: 60,
            }}
          >
            claude — zsh
          </div>
        </div>

        <div style={{ padding: "40px 44px", fontFamily: "Menlo, monospace", fontSize: 32, lineHeight: 1.6 }}>
          {LINES.map((line, i) => {
            const visible = charsVisible(frame, line);
            if (visible <= 0) return null;
            const text = line.text.slice(0, visible);
            const isLastVisible =
              frame < line.startFrame + line.text.length / (line.typeSpeed ?? 1.4) &&
              (i === LINES.length - 1 || charsVisible(frame, LINES[i + 1]) <= 0);

            const color =
              line.kind === "prompt" ? "#6366f1" : line.kind === "success" ? "#22c55e" : "#e5e5e5";

            return (
              <div key={i} style={{ whiteSpace: "pre-wrap", marginBottom: 14 }}>
                {line.kind === "prompt" && <span style={{ color: "#6366f1" }}>$ </span>}
                {line.kind === "success" && <span style={{ color: "#22c55e" }}>{"✓ "}</span>}
                {line.kind === "output" && !line.text.startsWith(">") && (
                  <span style={{ color: "#6366f1" }}>{"⏺ "}</span>
                )}
                <span style={{ color }}>{text}</span>
                {isLastVisible && showCursorBlink && (
                  <span style={{ color: "#6366f1" }}>{"█"}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
