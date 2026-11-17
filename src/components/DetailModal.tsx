import { useEffect } from 'react';
import { X, Check, MapPin, Minus, Plus } from 'lucide-react';
import { formatRupiah, type TourPackage, type Homestay } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

export type DetailTarget =
  | { kind: 'package'; item: TourPackage }
  | { kind: 'homestay'; item: Homestay };

interface DetailModalProps {
  target: DetailTarget | null;
  quantity: number;
  onChangeQuantity: (next: number) => void;
  onClose: () => void;
  onConfirmAdd: () => void;
}

export function DetailModal({
  target,
  quantity,
  onChangeQuantity,
  onClose,
  onConfirmAdd,
}: DetailModalProps) {
  useEffect(() => {
    if (!target) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [target, onClose]);

  if (!target) return null;

  const isPkg = target.kind === 'package';
  const unitPrice = isPkg ? target.item.price : target.item.pricePerNight;
  const unitLabel = isPkg ? 'orang' : 'malam';
  const total = unitPrice * quantity;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={isPkg ? target.item.title : target.item.name}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[90vh] bg-[#fff8f3] rounded-t-3xl sm:rounded-xl shadow-sand-3 border-sand-hairline flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Mobile Drag Bar + Header */}
        <div className="px-5 pt-3 pb-4 sm:px-7 sm:py-5 border-b border-[#766e65]/12 flex items-center justify-between gap-4 bg-[#fff8f3]">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#52796f]">
              {isPkg ? target.item.category : target.item.cluster}
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1b4332] truncate">
              {isPkg ? target.item.title : target.item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail"
            className="min-h-[48px] min-w-[48px] rounded-full bg-[#f7ece1] hover:bg-[#ece1d6] text-[#1b4332] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="aspect-[16/10] w-full rounded-lg overflow-hidden border-sand-hairline">
            <ResilientImage
              src={target.item.image}
              alt={isPkg ? target.item.title : target.item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {isPkg ? (
            <>
              <div className="space-y-2">
                <p className="text-base leading-relaxed text-[#3e3a36]">{target.item.summary}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#52796f]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {target.item.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{target.item.terrainNote}</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border-sand-hairline space-y-3">
                <h3 className="font-display text-lg font-semibold text-[#1b4332]">
                  Susunan Kegiatan
                </h3>
                <ol className="space-y-3">
                  {target.item.itinerary.map((step) => (
                    <li
                      key={step.time}
                      className="flex items-start gap-4 text-[15px] pb-3 last:pb-0 border-b last:border-b-0 border-[#766e65]/10"
                    >
                      <span className="font-semibold text-[#c26d38] tabular-nums shrink-0 w-12">
                        {step.time}
                      </span>
                      <div>
                        <div className="font-semibold text-[#1b4332]">{step.activity}</div>
                        <div className="text-sm text-[#3e3a36] mt-0.5">{step.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-[#fdf2e6] rounded-lg p-5 border-sand-hairline space-y-2.5">
                <h3 className="font-display text-base font-semibold text-[#1b4332]">
                  Sudah Termasuk dalam Paket ({target.item.hostName})
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#3e3a36]">
                  {target.item.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#1b4332] shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-base leading-relaxed text-[#3e3a36]">
                  {target.item.description}
                </p>
                <div className="text-sm font-medium text-[#52796f]">
                  Pengelola: {target.item.hostName} · Kapasitas maks. {target.item.capacity} tamu (
                  {target.item.bedrooms} kamar)
                </div>
              </div>

              <div className="bg-[#fdf2e6] rounded-lg p-5 border-sand-hairline">
                <div className="text-sm font-semibold text-[#1b4332]">Sarapan Termasuk</div>
                <p className="text-[15px] text-[#3e3a36] mt-1">{target.item.breakfastIncluded}</p>
              </div>

              <div className="bg-white rounded-lg p-5 border-sand-hairline space-y-2.5">
                <h3 className="font-display text-base font-semibold text-[#1b4332]">
                  Fasilitas & Aksesibilitas
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#3e3a36]">
                  {target.item.amenities.map((am) => (
                    <li key={am} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#1b4332] shrink-0" />
                      <span>{am}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Fixed Action Footer */}
        <div className="px-5 py-4 sm:px-7 bg-white border-t border-[#766e65]/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-[#3e3a36] capitalize">
              Jumlah {unitLabel}:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={`Kurangi ${unitLabel}`}
                onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
                className="w-11 h-11 rounded-lg border border-[#766e65]/25 flex items-center justify-center text-[#1b4332] hover:bg-[#fdf2e6] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-9 text-center font-display text-lg font-bold text-[#1b4332] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                aria-label={`Tambah ${unitLabel}`}
                onClick={() => onChangeQuantity(Math.min(20, quantity + 1))}
                className="w-11 h-11 rounded-lg border border-[#766e65]/25 flex items-center justify-center text-[#1b4332] hover:bg-[#fdf2e6] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirmAdd}
            className="flex-1 sm:flex-initial min-h-[52px] px-7 rounded-full bg-[#c26d38] hover:bg-[#a85928] active:scale-[0.98] text-white font-semibold text-base transition-all cursor-pointer tabular-nums"
          >
            Tambahkan · {formatRupiah(total)}
          </button>
        </div>
      </div>
    </div>
  );
}
