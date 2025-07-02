import React, { useEffect, useState } from "react";

type AsciiLayoutProps = {
  children: React.ReactNode;
};

export default function AsciiLayout({ children }: AsciiLayoutProps) {
  const [ascii, setAscii] = useState<string>("");
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAscii() {
      const response = await fetch("/ascii/monitor.txt");
      const text = await response.text();
      setAscii(text);
    }

    loadAscii();
  }, []);

  useEffect(() => {
    if (!ascii) return;

    const computeFontSize = () => {
      const lines = ascii.split("\n").length;
      const maxLineLength = Math.max(
        ...ascii.split("\n").map((line) => line.length),
      );

      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      const heightBased = Math.floor(screenHeight / lines);
      const CHAR_WIDTH_RATIO = 0.55;
      const widthBased = Math.floor(
        screenWidth / (maxLineLength * CHAR_WIDTH_RATIO),
      );
      const computedFontSize = Math.min(heightBased, widthBased);
      setFontSize(computedFontSize);
      setIsReady(true);
    };

    computeFontSize();
    window.addEventListener("resize", computeFontSize);
    return () => window.removeEventListener("resize", computeFontSize);
  }, [ascii]);

  if (!isReady || fontSize === null) return null;

  return (
    <div
      className="ascii-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <pre
        className="ascii-monitor select-none text-center"
        style={{
          margin: 0,
          fontFamily: "monospace",
          fontSize: fontSize,
          color: "#0B9343",
          whiteSpace: "pre",
          lineHeight: 1,
          textAlign: "center",
          position: "relative",
        }}
      >
        {ascii}

        <div
          className="ascii-content absolute font-mono text-green-700"
          style={{
            top: "13%",
            left: "5%",
            width: "89%",
            height: "73%",
            fontSize: fontSize / 1.5,
            lineHeight: 1.2,
            overflowY: "auto",
            padding: "1rem",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {children}
        </div>
      </pre>
    </div>
  );
}
