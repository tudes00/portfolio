import { useEffect, useState } from "react";

type BootScreenProps = {
  onBootEnd: () => void;
};

export default function BootScreen({ onBootEnd }: BootScreenProps) {
  const [ascii, setAscii] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const totalLength = 40;

  function getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  useEffect(() => {
    async function loadAscii() {
      const response = await fetch("/ascii/logo.txt");
      const text = await response.text();
      setAscii(text);
    }
    loadAscii();
  }, []);

  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";
    const startDelay = isProd ? 500 : getRandomInt(2500, 3500);
    const tickDelay = isProd ? 100 : getRandomInt(200, 1500);

    const startLoading = () => {
      function tick() {
        setProgress((prev) => {
          if (prev >= 100) {
            setTimeout(onBootEnd, 20);
            return 100;
          }

          const next = Math.min(prev + getRandomInt(1, 3), 100);

          setTimeout(tick, tickDelay);

          return next;
        });
      }

      tick();
    };

    const timeout = setTimeout(startLoading, startDelay);

    return () => clearTimeout(timeout);
  }, [onBootEnd]);

  const filledLength = Math.round((progress / 100) * totalLength);
  const bar = "█".repeat(filledLength) + "░".repeat(totalLength - filledLength);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        <pre className="boot-logo select-none">{ascii}</pre>
        <div className="boot-text">
          <p>
            {bar} {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
