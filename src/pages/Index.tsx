import { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal } from '@/components/Terminal';
import { SocialLinks } from '@/components/SocialLinks';
import { BootSequence } from '@/components/BootSequence';
import { LoginScreen } from '@/components/LoginScreen';
import { DesktopIcons } from '@/components/DesktopIcons';

const Index = () => {
  // Resolve the correct path for the default wallpaper based on the base URL
  const DEFAULT_WALLPAPER = `${import.meta.env.BASE_URL}frieren.jpg`;

  const [currentTheme, setCurrentTheme] = useState('powershell');
  const [wallpaper, setWallpaper] = useState<string | null>(DEFAULT_WALLPAPER);
  const [time, setTime] = useState(new Date());
  const [appState, setAppState] = useState<'booting' | 'login' | 'desktop'>('booting');
  const terminalRef = useRef<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('terminal-wallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  const handleWallpaperChange = useCallback((newWallpaper: string) => {
    setWallpaper(newWallpaper);
    localStorage.setItem('terminal-wallpaper', newWallpaper);
  }, []);

  const handleReset = useCallback(() => {
    localStorage.clear();
    setWallpaper(DEFAULT_WALLPAPER);
    setCurrentTheme('powershell');
    window.location.reload();
  }, [DEFAULT_WALLPAPER]);

  const handleBootComplete = useCallback(() => {
    setAppState('login');
  }, []);

  const handleLogin = useCallback(() => {
    setAppState('desktop');
  }, []);

  const handleLogout = useCallback(() => {
    setAppState('login');
  }, []);

  const handleIconClick = useCallback((command: string) => {
    if (terminalRef.current) {
      terminalRef.current.executeExternalCommand(command);
    }
  }, []);

  if (appState === 'booting') {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  if (appState === 'login') {
    return (
      <LoginScreen
        wallpaper={wallpaper}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div
      className="h-screen bg-background text-foreground relative overflow-hidden animate-in fade-in duration-1000"
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      {wallpaper && (
        <div className="absolute inset-0 bg-black/40 z-0" />
      )}

      {/* Desktop Icons Layer */}
      <DesktopIcons onIconClick={handleIconClick} />

      {/* Main Content (Terminal) */}
      <main className="h-[calc(100vh-40px)] relative flex items-center justify-center p-4 overflow-hidden z-10 pointer-events-none">
        <div className="w-full max-w-4xl h-full flex items-center justify-center pointer-events-auto">
          <Terminal ref={terminalRef} themeId={currentTheme} />
        </div>
      </main>

      {/* Windows Taskbar */}
      <footer className="fixed bottom-0 left-0 right-0 h-[40px] bg-[#00122e]/80 backdrop-blur-md border-t border-white/10 z-50 flex items-center justify-between px-2">
        <SocialLinks
          onThemeChange={setCurrentTheme}
          onWallpaperChange={handleWallpaperChange}
          onReset={handleReset}
          onLogout={handleLogout}
        />

        <div className="text-[11px] font-mono text-white/70 px-4 select-none text-right font-medium">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <br />
          {time.toLocaleDateString()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
