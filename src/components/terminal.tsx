import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import React from "react";

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

  const queryParameters = new URLSearchParams(window.location.search);
  const cmdURL = queryParameters.get("cmd");

  const [isProcessing, setIsProcessing] = useState(false);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commandRegistry = useMemo(
    () => getCommandRegistry(setInputVal, scrollToBottom),
    [scrollToBottom, setInputVal],
  );

  const executeCommand = useCallback(
    (input: string): void => {
      setIsProcessing(true);
      const cmd = input.trim().toLowerCase();
      setInputValueHistoryNbr(0);
      console.log("execute: ", cmd);
      let output: React.JSX.Element | string;
      let done: boolean = false;

      if (cmd === "") {
        output = "";
        done = true;
      }

      if (cmd === "clear" && !done) {
        setHistory([]);
        output = "";
        done = true;
      }

      const [cmdName, ...args] = cmd.split(" ");
      const commandFn = commandRegistry[cmdName];
      if (commandFn && !done) {
        output = commandFn(args.join(" "));
        done = true;
      } else if (!done) {
        output = "Command not found. Type 'help' to see available commands.";
        done = true;
      }

      if (cmd !== "clear") {
        setHistory((prev) => [...prev, { command: cmd, output }]);
      }

      if (cmd !== "") {
        setInputHistory((prev) => [...prev, { command: cmd }]);
      }

      setInputVal("");
      setTimeout(() => setIsProcessing(false), 100);
    },
    [commandRegistry],
  );

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    executeCommand("intro");
    if (cmdURL) executeCommand(cmdURL);
  }, [executeCommand, cmdURL]);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isProcessing) executeCommand(inputVal);
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (
        inputHistory.length > 0 &&
        inputValueHistoryNbr < inputHistory.length
      ) {
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
