import React, { useEffect, useState } from 'react';

type AsciiLayoutProps = {
    children: React.ReactNode;
};

export default function AsciiLayout({ children }: AsciiLayoutProps) {
    const [ascii, setAscii] = useState<string>('');
    const [fontSize, setFontSize] = useState<number>(16);

    useEffect(() => {
        async function loadAscii() {
            const response = await fetch("/ascii/monitor.txt");
            const text = await response.text();
            setAscii(text);

            const lines = text.split('\n').length;
            const screenHeight = window.innerHeight;

            const computedFontSize = Math.floor(screenHeight / lines);
            setFontSize(computedFontSize);
        }

        loadAscii();

        const onResize = () => {
            if (ascii) {
                const lines = ascii.split('\n').length;
                const screenHeight = window.innerHeight;
                const computedFontSize = Math.floor(screenHeight / lines);
                setFontSize(computedFontSize);
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [ascii]);

    return (
        <div
            className="ascii-wrapper"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <pre
                className="ascii-monitor select-none text-center"
                style={{
                    margin: 0,
                    fontFamily: 'monospace',
                    fontSize: fontSize,
                    color: '#0B9343',
                    whiteSpace: 'pre',
                    lineHeight: 1,
                    textAlign: 'center',
                }}
            >
                {ascii}
            </pre>
            <div>
                {children}
            </div>
        </div>
    );
}
