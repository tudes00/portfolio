import { useState } from "react";
import AsciiLayout from "../components/asciiLayout";
import Terminal from "../components/terminal";
import BootScreen from "../components/bootScreen";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const [bootFinished, setBootFinished] = useState(process.env.NODE_ENV === "development");

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
