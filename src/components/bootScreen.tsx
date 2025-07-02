import { useEffect, useState } from "react";

type BootScreenProps = {
  onBootEnd: () => void;
};

export default function BootScreen({ onBootEnd }: BootScreenProps) {
  const [ascii, setAscii] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const totalLength = 40;
  const [isLoadingStarted, setIsLoadingStarted] = useState(false);

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
    const startDelay = 1500;
    const timeoutId = setTimeout(() => {
      console.log("starting");
      setIsLoadingStarted(true);
    }, startDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isLoadingStarted && progress < 100) {
      const tickDelay = 100;
      const timeout = setTimeout(() => {
        setProgress((prev) => {
          const next = Math.min(prev + getRandomInt(1, 5), 100);
          return next;
        });
      }, tickDelay);

      return () => clearTimeout(timeout);
    } else if (progress >= 100) {
      setTimeout(onBootEnd, 20);
      console.log("finish");
    }
  }, [progress, isLoadingStarted, onBootEnd]);

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
