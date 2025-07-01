import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import TermInfo from "./termInfo";
import { commandRegistry as getCommandRegistry } from "./commandRegistry";

type TerminalLine = {
  command: string;
  output: string | React.JSX.Element | null;
};
type TerminalInputHistory = {
  command: string;
};

export default function Terminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputHistory, setInputHistory] = useState<TerminalInputHistory[]>([]);
  const [inputValueHistoryNbr, setInputValueHistoryNbr] = useState(0);
  const [cursorPos, setCursorPos] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commandRegistry = useMemo(
    () => getCommandRegistry(scrollToBottom),
    [scrollToBottom],
  );

  useEffect(() => {
    const cmd = "intro";
    const [cmdName, ...args] = cmd.split(" ");
    const output = commandRegistry[cmdName]?.(args.join(" "));

    setHistory([{ command: cmd, output }]);
  }, [commandRegistry]);

  useEffect(() => {
    if (!terminalBottomRef.current) return;
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [inputVal, cursorPos, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, []);

  function executeCommand(input: string): React.JSX.Element | string {
    const cmd = input.trim();
    setInputValueHistoryNbr(0);

    if (cmd === "") return "";

    if (cmd === "clear") {
      setHistory([]);
      return "";
    }

    if (cmd === "shutdown") {
      console.log(history);
      return "Shutting down...";
    }

    const [cmdName, ...args] = cmd.split(" ");
    const commandFn = commandRegistry[cmdName];
    if (commandFn) return commandFn(args.join(" "));

    return "Command not found. Type 'help' to see available commands.";
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isProcessing) {
      setIsProcessing(true);

      const output = executeCommand(inputVal);

      if (inputVal.trim() !== "clear") {
        setHistory((prev) => [...prev, { command: inputVal, output }]);
      }

      if (inputVal.trim() !== "") {
        setInputHistory((prev) => [...prev, { command: inputVal }]);
      }

      setInputVal("");
      setTimeout(() => setIsProcessing(false), 100);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (
        inputHistory.length > 0 &&
        inputValueHistoryNbr < inputHistory.length
      ) {
        console.log("UP");
        const newNbr = inputValueHistoryNbr + 1;
        const lastCommand = inputHistory[inputHistory.length - newNbr];
        if (lastCommand) {
          setInputVal(lastCommand.command);
        }
        setInputValueHistoryNbr(newNbr);
      }
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (inputValueHistoryNbr > 1) {
        console.log("DOWN");
        const newNbr = inputValueHistoryNbr - 1;
        const lastCommand = inputHistory[inputHistory.length - newNbr];
        if (lastCommand) {
          setInputVal(lastCommand.command);
        }
        setInputValueHistoryNbr(newNbr);
      } else if (inputValueHistoryNbr === 1) {
        setInputVal("");
        setInputValueHistoryNbr(0);
      }
    }
    setTimeout(() => {
      if (inputRef.current) {
        setCursorPos(inputRef.current.selectionStart ?? 0);
      }
    }, 0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
    setTimeout(() => {
      if (inputRef.current) {
        setCursorPos(inputRef.current.selectionStart ?? 0);
      }
    }, 0);
  };

  const renderInputWithCursor = () => {
    const beforeCursor = inputVal.slice(0, cursorPos);
    const atCursor = inputVal[cursorPos] ?? " ";
    const afterCursor = inputVal.slice(cursorPos + 1);

    return (
      <span className="cursor-text">
        <span>{beforeCursor}</span>
        <span className="terminal-cursor">{atCursor}</span>
        <span>{afterCursor}</span>
      </span>
    );
  };

  return (
    <div
      className="terminal-overlay"
      onClick={() => {
        document
          .getElementById("command-input")
          ?.focus({ preventScroll: true });
        setTimeout(() => {
          if (inputRef.current) {
            setCursorPos(inputRef.current.selectionStart ?? 0);
          }
        }, 0);
      }}
    >
      <div className="terminal-history">
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            <div className="flex my-2">
              <TermInfo />
              <span className="blue-input">{line.command}</span>
            </div>
            {line.output && (
              <div className="red-output whitespace-pre-wrap ml-2">
                {line.output}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="terminal-commands flex my-2">
        <TermInfo />
        <span className="blue-input font-mono">{renderInputWithCursor()}</span>
      </div>

      <input
        id="command-input"
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        autoFocus
        value={inputVal}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />

      <div ref={terminalBottomRef} />
    </div>
  );
}
