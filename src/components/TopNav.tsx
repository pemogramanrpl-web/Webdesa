import { Compass, Home, Map, CalendarCheck } from 'lucide-react';
import type { ScreenId } from '../data/villageData';

interface TopNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  bookingCount: number;
  onOpenBooking: () => void;
}

export function TopNav({ activeScreen, onNavigate, bookingCount, onOpenBooking }: TopNavProps) {
  const navItems: { id: ScreenId; label: string; mobileLabel: string }[] = [
    { id: 'explore', label: 'Paket Wisata', mobileLabel: 'Jelajah' },
    { id: 'homestays', label: 'Homestay', mobileLabel: 'Homestay' },
    { id: 'routes', label: 'Rute & Peta', mobileLabel: 'Rute' },
    { id: 'booking', label: 'Pemesanan', mobileLabel: 'Pesan' },
  ];

  const getMobileIcon = (id: ScreenId) => {
    switch (id) {
      case 'explore':
        return Compass;
      case 'homestays':
        return Home;
      case 'routes':
        return Map;
      case 'booking':
        return CalendarCheck;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#766e65]/15">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 h-[64px] md:h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] flex items-center"
          >
            Lereng Asri
          </button>

          {/* Zone 2: 4 Single-line Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#3e3a36]"
          >
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-2 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'text-[#1b4332] font-semibold'
                      : 'text-[#3e3a36] hover:text-[#1b4332]'
                  }`}
                >
                  {item.label}
                  {item.id === 'booking' && bookingCount > 0 ? ` (${bookingCount})` : ''}
                  <span
                    className={`absolute left-0 right-0 bottom-0.5 h-[2px] rounded-full transition-opacity duration-150 ${
                      isActive ? 'bg-[#c26d38] opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="min-h-[44px] md:min-h-[48px] px-5 bg-[#c26d38] hover:bg-[#a85928] active:scale-[0.98] text-white text-sm sm:text-[15px] font-semibold rounded-full whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer shadow-sand-1"
            >
              {bookingCount > 0 ? `Pesan (${bookingCount})` : 'Pesan Sekarang'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Thumb-Zone Navigation (compact height <= 60px to stay well under 15% cap) */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f3]/95 backdrop-blur-md border-t border-[#766e65]/15 shadow-sand-3"
      >
        <div className="grid grid-cols-4 h-[60px]">
          {navItems.map((item) => {
            const Icon = getMobileIcon(item.id);
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center min-h-[48px] px-1 cursor-pointer transition-colors ${
                  isActive ? 'text-[#1b4332] font-semibold' : 'text-[#766e65]'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.25 : 1.75} />
                <span className="text-[11px] leading-tight mt-0.5 whitespace-nowrap">
                  {item.mobileLabel}
                  {item.id === 'booking' && bookingCount > 0 ? ` (${bookingCount})` : ''}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
