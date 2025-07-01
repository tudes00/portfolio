import { useState } from "react";
import AsciiLayout from "../components/asciiLayout";
import Terminal from "../components/terminal";
import BootScreen from "../components/bootScreen";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
<<<<<<< HEAD
  const [bootFinished, setBootFinished] = useState(process.env.NODE_ENV === "development");
=======
  const [bootFinished, setBootFinished] = useState(true);
>>>>>>> d6d6e66262355a752c9dfa62f70ad20020a2bf03

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
