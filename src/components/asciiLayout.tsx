import React, { useEffect, useState } from "react";

type AsciiLayoutProps = {
  children: React.ReactNode;
};

export default function AsciiLayout({ children }: AsciiLayoutProps) {
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [device, setDevice] = useState<string | null>("phone");

  const [ascii, setAscii] = useState<string>("");
  const [asciiCache, setAsciiCache] = useState<{ [key: string]: string }>({});


  useEffect(() => {
    if (window.matchMedia("(max-width: 650px)").matches) {
      setDevice("phone");
    } else if (window.matchMedia("(max-width: 1150px)").matches) {
      setDevice("tablet");
    } else {
      setDevice("computer");
    }
  }, []);

  useEffect(() => {
  async function loadAscii() {
    if (!device) return;
    if (asciiCache[device]) {
      setAscii(asciiCache[device]);
      setIsReady(true);
      return;
    }
    const response = await fetch(`/ascii/${device}.txt`);
    const text = await response.text();

    setAsciiCache((prev) => ({ ...prev, [device]: text }));
    setAscii(text);
    setIsReady(true);
  }

  setIsReady(false);
  loadAscii();
}, [device, asciiCache]);

  useEffect(() => {
    if (!ascii) return;
    const computeFontSize = () => {
      if (window.matchMedia("(max-width: 650px)").matches) {
        setDevice("phone");
      } else if (window.matchMedia("(max-width: 1230px)").matches) {
        setDevice("tablet");
      } else {
        setDevice("computer");
      }
      const lines = ascii.split("\n").length;
      const maxLineLength = Math.max(
        ...ascii.split("\n").map((line) => line.length),
      );

      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      const heightBased = Math.floor(screenHeight / lines);
      const CHAR_WIDTH_RATIO = 0.58;
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
    width: "100dvw",
    height: "100dvh",
    padding: "0.5rem",
    overflow: "hidden",
    position: "relative",
    touchAction: "manipulation",
  }}
>
      <pre
        className="ascii-monitor text-center relative"
        style={{
          margin: 0,
          fontFamily: "monospace",
          fontSize: fontSize,
          color: "#0B9343",
          whiteSpace: "pre",
          lineHeight: 1,
        }}
      >
        <pre className=" select-none">{ascii}</pre>

        <div
          className="ascii-content absolute font-mono text-green-700" //absolute
          style={{
            top:
              device === "computer"
                ? "13%"
                : device === "tablet"
                  ? "7.5%"
                  : "8%",
            left:
              device === "computer"
                ? "5%"
                : device === "tablet"
                  ? "5.5%"
                  : "5%",
            width:
              device === "computer"
                ? "89%"
                : device === "tablet"
                  ? "90%"
                  : "91%",
            height:
              device === "computer"
                ? "73%"
                : device === "tablet"
                  ? "87%"
                  : "87%",
            fontSize:
              fontSize /
              (device === "computer" ? 1.7 : device === "tablet" ? 0.95 : 1.5),
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
