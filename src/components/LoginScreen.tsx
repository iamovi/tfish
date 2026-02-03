import { useState, useEffect } from 'react';
import { User, LogIn } from 'lucide-react';

export const LoginScreen = ({ onLogin, wallpaper }: { onLogin: () => void, wallpaper: string | null }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = () => {
        setIsLoggingIn(true);
        setTimeout(onLogin, 1500);
    };

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black overflow-hidden"
            style={{
                backgroundImage: wallpaper ? `url(${wallpaper})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

            {/* Clock Area */}
            <div className="absolute bottom-12 left-12 text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-7xl font-light mb-2">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-xl font-medium opacity-80">
                    {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-500">
                <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/50 to-purple-500/50">
                        <span className="text-7xl font-bold text-white tracking-tighter shadow-xl">R</span>
                    </div>
                </div>

                <h1 className="text-3xl font-semibold text-white mb-2 drop-shadow-lg">Ren</h1>

                {isLoggingIn ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-white/80 text-sm font-medium animate-pulse">Logging in...</span>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="group mt-4 flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="text-white font-medium">Login</span>
                        <LogIn className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>

            {/* Shutdown/Power buttons (Visual only) */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4 opacity-70">
                <div className="w-6 h-6 border border-white/20 rounded flex items-center justify-center text-white text-[10px]">Wi-Fi</div>
                <div className="w-6 h-6 border border-white/20 rounded flex items-center justify-center text-white text-[10px]">EN</div>
            </div>
        </div>
    );
};
