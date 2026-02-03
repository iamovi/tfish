import { useState, useEffect } from 'react';

const bootText = [
    'Ren BIOS v1.0.4 (C) 2024-2026',
    'CPU: Intel(R) Coffee Powered @ 4.20GHz',
    'Memory Test: 32768MB OK',
    '',
    'Checking Storage... DONE',
    'Checking Network... CONNECTED',
    'Loading Kernel... OK',
    'Initializing Global Modules... DONE',
    'Searching for User Profiles... FOUND',
    '',
    'Starting RenOS v2.1.0...',
];

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < bootText.length) {
                setLines(prev => [...prev, bootText[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black text-white font-mono p-4 sm:p-8 z-[100] flex flex-col items-start overflow-hidden">
            <div className="text-white mb-4 sm:mb-8 w-full overflow-hidden">
                <pre className="text-[8px] leading-[8px] sm:text-xs">
                    {`
   ____                 ___  ____  
  |  _ \\ ___ _ __      / _ \\/ ___| 
  | |_) / _ \\ '_ \\    | | | \\___ \\ 
  |  _ <  __/ | | |   | |_| |___) |
  |_| \\_\\___|_| |_|    \\___/|____/ 
`}
                </pre>
            </div>
            <div className="space-y-0.5 sm:space-y-1 w-full overflow-hidden">
                {lines.map((line, i) => (
                    <div key={i} className="text-[10px] sm:text-sm animate-in fade-in slide-in-from-left-1 duration-200 truncate">
                        {line}
                    </div>
                ))}
            </div>
            <div className="mt-4 sm:mt-8">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white animate-pulse" />
                </div>
            </div>
        </div>
    );
};
