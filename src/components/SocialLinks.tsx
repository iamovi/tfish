import { Github, Mail, Palette, Image as ImageIcon, LayoutGrid, LogOut } from 'lucide-react';
import { useState, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const links = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@developer.dev', label: 'Email' },
];

const themes = [
  { name: 'PowerShell', color: '#012456', id: 'powershell' },
  { name: 'Classic CMD', color: '#000000', id: 'cmd' },
  { name: 'Matrix', color: '#000500', id: 'matrix' },
  { name: 'Ubuntu', color: '#300a24', id: 'ubuntu' },
  { name: 'Dracula', color: '#282a36', id: 'dracula' },
];

export const SocialLinks = ({
  onThemeChange,
  onWallpaperChange,
  onReset,
  onLogout
}: {
  onThemeChange?: (themeId: string) => void;
  onWallpaperChange?: (wallpaper: string) => void;
  onReset?: () => void;
  onLogout?: () => void;
}) => {
  const [isStartOpen, setIsStartOpen] = useState(false);

  const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onWallpaperChange?.(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-full">
      {/* Left Side: Start Button & Start Menu */}
      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`flex items-center justify-center w-[48px] h-[40px] hover:bg-white/10 transition-colors ${isStartOpen ? 'bg-white/20' : ''}`}
          >
            <LayoutGrid className="w-5 h-5 text-blue-400 fill-blue-400" />
          </button>

          {/* Start Menu Popup */}
          {isStartOpen && (
            <div className="absolute bottom-[48px] left-0 w-[300px] bg-[#1c1c1c]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center gap-3 px-2 py-3 rounded-md hover:bg-white/5 transition-colors cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    O
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Ovi ren</div>
                    <div className="text-[11px] text-white/50">Writer • Script Author</div>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-1">
                <div className="px-3 py-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
                  Pinned
                </div>
                {links.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors text-white/80 hover:text-white group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-4 p-4 bg-black/20 flex items-center justify-between text-[11px] text-white/40">
                <div
                  onClick={() => {
                    onLogout?.();
                    setIsStartOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group"
                >
                  <LogOut className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span>Log out</span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span className="hover:text-red-400 cursor-pointer transition-colors font-semibold">
                      Reset
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#1c1c1c]/95 backdrop-blur-xl border border-white/10 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-white/60">
                        This action will reset your wallpaper, theme, and terminal settings to their default values. The page will reload.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onReset?.();
                          setIsStartOpen(false);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        Reset Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side: System Tray (Themes, Wallpaper) */}
      <div className="flex items-center gap-1 h-full px-2">
        <label className="cursor-pointer">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-9 w-9" asChild>
            <span>
              <ImageIcon className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleWallpaperUpload}
              />
            </span>
          </Button>
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-9 w-9">
              <Palette className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1c1c1c]/95 backdrop-blur-xl border border-white/10 text-white">
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => onThemeChange?.(theme.id)}
                className="flex items-center gap-2 cursor-pointer focus:bg-white/10 focus:text-white"
              >
                <div
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-xs">{theme.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
