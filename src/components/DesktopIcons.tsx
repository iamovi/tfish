import { useState, useRef, useEffect } from 'react';
import { User, Folder, Trash2, Ghost, Smile } from 'lucide-react';

interface DesktopIconProps {
    icon: any;
    label: string;
    command: string;
    onDoubleClick: (command: string) => void;
    initialPos: { x: number; y: number };
}

const DesktopIcon = ({ icon: Icon, label, command, onDoubleClick, initialPos }: DesktopIconProps) => {
    const [pos, setPos] = useState(initialPos);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPos({
                    x: e.clientX - dragStart.current.x,
                    y: e.clientY - dragStart.current.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                position: 'absolute',
                zIndex: isDragging ? 20 : 10,
            }}
            className={`flex flex-col items-center w-16 p-1.5 cursor-pointer select-none group rounded-md hover:bg-white/10 transition-colors ${isDragging ? 'opacity-70' : ''}`}
            onMouseDown={handleMouseDown}
            onDoubleClick={() => onDoubleClick(command)}
        >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500/20 rounded-lg border border-blue-400/30 group-hover:bg-blue-500/30 group-hover:border-blue-400/50 backdrop-blur-sm transition-all shadow-lg">
                <Icon className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>
            <span className="mt-1 text-[10px] font-medium text-white text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1 py-0.5 rounded leading-tight">
                {label}
            </span>
        </div>
    );
};

export const DesktopIcons = ({ onIconClick }: { onIconClick: (command: string) => void }) => {
    const icons = [
        { icon: User, label: 'About Me', command: 'about', pos: { x: 20, y: 20 } },
        { icon: Folder, label: 'Projects', command: 'projects', pos: { x: 20, y: 120 } },
        { icon: Ghost, label: 'Waifu', command: 'waifu', pos: { x: 20, y: 220 } },
        { icon: Smile, label: 'Joke', command: 'joke', pos: { x: 20, y: 320 } },
        { icon: Trash2, label: 'Recycle Bin', command: 'clear', pos: { x: 20, y: 420 } },
    ];

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
                {icons.map((icon, idx) => (
                    <DesktopIcon
                        key={idx}
                        icon={icon.icon}
                        label={icon.label}
                        command={icon.command}
                        onDoubleClick={onIconClick}
                        initialPos={icon.pos}
                    />
                ))}
            </div>
        </div>
    );
};
