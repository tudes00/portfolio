import { useState } from 'react';
import AsciiLayout from '../components/asciiLayout';
import Terminal from '../components/terminal';
import BootScreen from '../components/bootScreen';

export default function Home() {
  const [bootFinished, setBootFinished] = useState(true);

  return (
    <AsciiLayout>
      {bootFinished ? (
        <Terminal />
      ) : (
        <BootScreen onBootEnd={() => setBootFinished(true)} />
      )}
    </AsciiLayout>
  );
}
