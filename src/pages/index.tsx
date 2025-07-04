import { useEffect, useState } from "react";
import AsciiLayout from "../components/asciiLayout";
import Terminal from "../components/terminal";
import BootScreen from "../components/bootScreen";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const [bootFinished, setBootFinished] = useState(
    process.env.NODE_ENV === "development",
  );
  useEffect(() => {
    console.log(
      "%cHave you checked the HTML of the page?",
      "color: #ff2d00; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;",
    );
    console.log(
      "%cIf you get stuck, just drink water!",
      "color: #555555; -webkit-text-stroke: 1px black; font-size: 20px; font-weight: bold;",
    );

    if (window.sessionStorage.getItem("alreadyBoot")) {
      setBootFinished(true);
    } else {
      window.sessionStorage.setItem("alreadyBoot", "true");
    }
  }, []);
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const ctrlShiftKey = (e: KeyboardEvent, key: string) => {
      return e.ctrlKey && e.shiftKey && e.key.toUpperCase() === key;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        ctrlShiftKey(e, "I") ||
        ctrlShiftKey(e, "J") ||
        ctrlShiftKey(e, "C") ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AsciiLayout>

      <Analytics />
      {bootFinished ? (
        <Terminal />
      ) : (
        <BootScreen onBootEnd={() => setBootFinished(true)} />
      )}
    </AsciiLayout>
  );
}
