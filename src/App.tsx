import { useMemo, useState } from 'react';
import { Sun } from 'lucide-react';
import {
  formatRupiah,
  type Homestay,
  type ScreenId,
  type TourPackage,
} from './data/villageData';
import { TopNav } from './components/TopNav';
import { ExploreScreen } from './components/ExploreScreen';
import { HomestaysScreen } from './components/HomestaysScreen';
import { RoutesScreen } from './components/RoutesScreen';
import { BookingScreen, type BookingItem } from './components/BookingScreen';
import { DetailModal, type DetailTarget } from './components/DetailModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('explore');
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [detailTarget, setDetailTarget] = useState<DetailTarget | null>(null);
  const [modalQty, setModalQty] = useState<number>(2);

  const selectedIds = useMemo(
    () => new Set(bookingItems.map((item) => item.id)),
    [bookingItems],
  );

  const totalEstimate = useMemo(
    () => bookingItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [bookingItems],
  );

  const navigateTo = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPackageDetail = (pkg: TourPackage) => {
    const existing = bookingItems.find((i) => i.id === pkg.id);
    setModalQty(existing ? existing.quantity : 2);
    setDetailTarget({ kind: 'package', item: pkg });
  };

  const openHomestayDetail = (hs: Homestay) => {
    const existing = bookingItems.find((i) => i.id === hs.id);
    setModalQty(existing ? existing.quantity : 1);
    setDetailTarget({ kind: 'homestay', item: hs });
  };

  const upsertBookingItem = (nextItem: BookingItem) => {
    setBookingItems((prev) => {
      const idx = prev.findIndex((i) => i.id === nextItem.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = nextItem;
        return copy;
      }
      return [...prev, nextItem];
    });
  };

  const handleQuickAddPackage = (pkg: TourPackage) => {
    if (selectedIds.has(pkg.id)) {
      navigateTo('booking');
      return;
    }
    upsertBookingItem({
      id: pkg.id,
      kind: 'package',
      title: pkg.title,
      subtitle: `${pkg.category} · ${pkg.duration}`,
      unitPrice: pkg.price,
      unitLabel: 'orang',
      quantity: 2,
      image: pkg.image,
    });
  };

  const handleQuickAddHomestay = (hs: Homestay) => {
    if (selectedIds.has(hs.id)) {
      navigateTo('booking');
      return;
    }
    upsertBookingItem({
      id: hs.id,
      kind: 'homestay',
      title: hs.name,
      subtitle: `${hs.cluster} · Maks. ${hs.capacity} tamu`,
      unitPrice: hs.pricePerNight,
      unitLabel: 'malam',
      quantity: 1,
      image: hs.image,
    });
  };

  const handleConfirmModal = () => {
    if (!detailTarget) return;
    if (detailTarget.kind === 'package') {
      const pkg = detailTarget.item;
      upsertBookingItem({
        id: pkg.id,
        kind: 'package',
        title: pkg.title,
        subtitle: `${pkg.category} · ${pkg.duration}`,
        unitPrice: pkg.price,
        unitLabel: 'orang',
        quantity: modalQty,
        image: pkg.image,
      });
    } else {
      const hs = detailTarget.item;
      upsertBookingItem({
        id: hs.id,
        kind: 'homestay',
        title: hs.name,
        subtitle: `${hs.cluster} · Maks. ${hs.capacity} tamu`,
        unitPrice: hs.pricePerNight,
        unitLabel: 'malam',
        quantity: modalQty,
        image: hs.image,
      });
    }
    setDetailTarget(null);
  };

  const handleUpdateQuantity = (id: string, nextQty: number) => {
    setBookingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item)),
    );
  };

  const handleRemoveItem = (id: string) => {
    setBookingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#201b14] flex flex-col">
      <TopNav
        activeScreen={activeScreen}
        onNavigate={navigateTo}
        bookingCount={bookingItems.length}
        onOpenBooking={() => navigateTo('booking')}
      />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 pb-24 md:pb-24">
        {activeScreen === 'explore' && (
          <ExploreScreen
            onSelectPackage={openPackageDetail}
            onSelectHomestay={openHomestayDetail}
            onQuickAddPackage={handleQuickAddPackage}
            onNavigate={navigateTo}
            selectedIds={selectedIds}
          />
        )}

        {activeScreen === 'homestays' && (
          <HomestaysScreen
            onSelectHomestay={openHomestayDetail}
            onQuickAddHomestay={handleQuickAddHomestay}
            selectedIds={selectedIds}
          />
        )}

        {activeScreen === 'routes' && <RoutesScreen />}

        {activeScreen === 'booking' && (
          <BookingScreen
            items={bookingItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearAll={() => setBookingItems([])}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Desktop & Tablet Floating Bottom Booking Bar (hidden on mobile to preserve <=15% sticky height cap) */}
      {bookingItems.length > 0 && activeScreen !== 'booking' && (
        <div className="hidden md:block fixed bottom-4 left-0 right-0 z-30 pointer-events-none px-8">
          <div className="max-w-[1136px] mx-auto bg-[#fff8f3]/95 backdrop-blur-md rounded-xl px-6 py-3.5 shadow-sand-3 border-sand-hairline flex items-center justify-between gap-6 pointer-events-auto">
            <div className="flex items-center gap-5 text-sm">
              <div className="inline-flex items-center gap-2 text-[#52796f] font-medium">
                <Sun className="w-4 h-4" />
                <span>19°C · Cerah Berawan</span>
              </div>
              <span aria-hidden="true" className="text-[#766e65]/40">
                |
              </span>
              <div className="text-[#3e3a36]">
                <strong className="text-[#1b4332] tabular-nums">{bookingItems.length}</strong>{' '}
                pilihan dalam rencana kunjungan
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="text-xs text-[#766e65]">Perkiraan Total</div>
                <div className="font-display text-xl font-bold text-[#1b4332] tabular-nums">
                  {formatRupiah(totalEstimate)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('booking')}
                className="min-h-[52px] px-7 rounded-full bg-[#c26d38] hover:bg-[#a85928] active:scale-[0.98] text-white font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#766e65]/15 bg-[#fff8f3] mb-[60px] md:mb-0">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#766e65]">
          <div>
            <span className="font-display font-bold text-[#1b4332] text-base">
              Desa Wisata Lereng Asri
            </span>
            <p className="mt-1">
              Dikelola bersama Pokdarwis Lereng Asri · Jam Pendopo 06.00 – 18.00 WIB
            </p>
          </div>
          <div className="flex flex-wrap gap-5 font-medium text-[#3e3a36]">
            <button
              type="button"
              onClick={() => navigateTo('explore')}
              className="hover:text-[#1b4332] cursor-pointer"
            >
              Paket Wisata
            </button>
            <button
              type="button"
              onClick={() => navigateTo('homestays')}
              className="hover:text-[#1b4332] cursor-pointer"
            >
              Homestay
            </button>
            <button
              type="button"
              onClick={() => navigateTo('routes')}
              className="hover:text-[#1b4332] cursor-pointer"
            >
              Rute & Peta
            </button>
            <button
              type="button"
              onClick={() => navigateTo('booking')}
              className="hover:text-[#1b4332] cursor-pointer"
            >
              Pemesanan
            </button>
          </div>
        </div>
      </footer>

      <DetailModal
        target={detailTarget}
        quantity={modalQty}
        onChangeQuantity={setModalQty}
        onClose={() => setDetailTarget(null)}
        onConfirmAdd={handleConfirmModal}
      />
    </div>
  );
}
