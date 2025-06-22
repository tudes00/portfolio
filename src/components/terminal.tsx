import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import TermInfo from "./termInfo";
import { commandRegistry as getCommandRegistry } from './commandRegistry';

type TerminalLine = {
  command: string;
  output: string | React.JSX.Element | null;
};





export default function Terminal() {
    const [inputVal, setInputVal] = useState('');
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const terminalBottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const commandRegistry = useMemo(() => getCommandRegistry(scrollToBottom), [scrollToBottom]);

    useEffect(() => {
        const cmd = 'cat intro.txt';
        const [cmdName, ...args] = cmd.split(' ');
        const output = commandRegistry[cmdName]?.(args.join(' '));

        setHistory([{ command: cmd, output }]);
    }, [commandRegistry]);

    useEffect(() => {
  if (!terminalBottomRef.current) return;

  const raf = requestAnimationFrame(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return () => cancelAnimationFrame(raf);
}, [history]);


    function executeCommand(input: string): React.JSX.Element | string {
        const cmd = input.trim();

        if (cmd === 'clear') {
            setHistory([]);
            return '';
        }

        if (cmd === 'shutdown') {
            console.log(history);
            return 'Shutting down...';
        }

        const [cmdName, ...args] = cmd.split(' ');
        const commandFn = commandRegistry[cmdName];
        if (commandFn) return commandFn(args.join(' '));

        return "Command not found. Type 'help' to see available commands.";
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isProcessing) {
        setIsProcessing(true);

        const output = executeCommand(inputVal);

        if (inputVal.trim() !== 'clear') {
            setHistory((prev) => [
                ...prev,
                { command: inputVal, output },
            ]);
        }

        setInputVal('');
        setTimeout(() => setIsProcessing(false), 100); 
    }
};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(event.target.value);
    };
  return (
     <div className="terminal-overlay">
        <div className="terminal-history">
            {history.map((line, index) => (
                <div key={index} className="terminal-line">
                    <div className="flex mt-2">
                    <TermInfo />
                    <span className="blue-input">{line.command}</span>
                    </div>
                    {line.output && (
                    <div className="red-output whitespace-pre-wrap">
                        {line.output}
                    </div>
                    )}
                </div>
            ))}
        </div>
        <div className="terminal-commands flex  mt-2">
            <TermInfo />
            <input
                id="command-input"
                type="text"
                className="flex-grow border-none outline-none caret-transparent blue-input"
                value={inputVal}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
        </div>
        <div ref={terminalBottomRef}/>
     </div>
  );
}