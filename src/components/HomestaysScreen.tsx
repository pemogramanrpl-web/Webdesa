import { useState } from 'react';
import { Check, Users, BedDouble } from 'lucide-react';
import { HOMESTAYS, formatRupiah, type Homestay } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

interface HomestaysScreenProps {
  onSelectHomestay: (hs: Homestay) => void;
  onQuickAddHomestay: (hs: Homestay) => void;
  selectedIds: Set<string>;
}

export function HomestaysScreen({
  onSelectHomestay,
  onQuickAddHomestay,
  selectedIds,
}: HomestaysScreenProps) {
  const [groundFloorOnly, setGroundFloorOnly] = useState(false);
  const [minCapacity, setMinCapacity] = useState<number>(0);

  const visibleHomestays = HOMESTAYS.filter((hs) => {
    if (groundFloorOnly && !hs.groundFloorAccess) return false;
    if (hs.capacity < minCapacity) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <section className="bg-[#fdf2e6] rounded-xl p-6 sm:p-10 border-sand-hairline">
        <p className="text-sm font-semibold text-[#52796f] mb-2">
          Akomodasi Warga · Klaster Bambu & Kayu Jati
        </p>
        <h1 className="font-display text-[30px] sm:text-[40px] font-bold leading-tight text-[#1b4332] [text-wrap:balance]">
          Homestay Desa Lereng Asri
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#3e3a36] max-w-2xl leading-relaxed">
          Setiap penginapan dikelola langsung oleh keluarga warga setempat. Harga per malam sudah
          termasuk sarapan hangat tradisional dan air minum kendi isi ulang.
        </p>

        {/* Accessible Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kapasitas tamu">
            {[
              { label: 'Semua Kapasitas', value: 0 },
              { label: '4+ Tamu (Keluarga)', value: 4 },
              { label: '6 Tamu (Rombongan)', value: 6 },
            ].map((opt) => {
              const active = minCapacity === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setMinCapacity(opt.value)}
                  className={`min-h-[44px] px-5 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#1b4332] text-white'
                      : 'bg-white text-[#766e65] border border-[#766e65]/25 hover:text-[#1b4332]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            role="checkbox"
            aria-checked={groundFloorOnly}
            onClick={() => setGroundFloorOnly((prev) => !prev)}
            className="min-h-[48px] px-4 py-2 bg-white rounded-lg border border-[#766e65]/20 flex items-center gap-3 cursor-pointer hover:bg-[#fff8f3]"
          >
            <span
              className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                groundFloorOnly
                  ? 'bg-[#1b4332] text-white'
                  : 'bg-white border-[1.5px] border-[#766e65]/45'
              }`}
            >
              {groundFloorOnly && <Check className="w-4 h-4" strokeWidth={2.5} />}
            </span>
            <span className="text-sm font-semibold text-[#201b14] whitespace-nowrap">
              Wajib kamar lantai dasar (tanpa tangga)
            </span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {visibleHomestays.map((hs) => {
          const isSelected = selectedIds.has(hs.id);
          return (
            <article
              key={hs.id}
              className="bg-white rounded-lg overflow-hidden shadow-sand-1 hover:shadow-sand-2 border-sand-hairline flex flex-col transition-shadow"
            >
              <button
                type="button"
                onClick={() => onSelectHomestay(hs)}
                className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden cursor-pointer block"
              >
                <ResilientImage
                  src={hs.image}
                  alt={hs.name}
                  className="w-full h-full object-cover"
                />
              </button>

              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#52796f]">
                    <span>{hs.cluster}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tuan Rumah: {hs.hostName}</span>
                  </div>

                  <h2 className="font-display text-2xl font-semibold text-[#1b4332]">{hs.name}</h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#3e3a36] tabular-nums">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#766e65]" />
                      Maks. {hs.capacity} tamu
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-[#766e65]" />
                      {hs.bedrooms} kamar tidur
                    </span>
                    <span className="font-medium text-[#1b4332]">
                      {hs.groundFloorAccess ? 'Akses Lantai Dasar' : 'Beranda Atas'}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-[#3e3a36]">{hs.description}</p>

                  <div className="bg-[#faf7f2] rounded-lg p-3.5 text-sm text-[#3e3a36]">
                    <span className="font-semibold text-[#1b4332]">Termasuk Sarapan: </span>
                    {hs.breakfastIncluded}
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm text-[#3e3a36]">
                    {hs.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#52796f] shrink-0" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#766e65]/12 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-display text-2xl font-bold text-[#1b4332] tabular-nums">
                      {formatRupiah(hs.pricePerNight)}
                    </span>
                    <span className="text-sm text-[#766e65]"> / malam</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectHomestay(hs)}
                      className="min-h-[48px] px-5 rounded-lg border-2 border-[#1b4332] text-[#1b4332] text-sm font-semibold hover:bg-[#1b4332]/5 transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAddHomestay(hs)}
                      className={`min-h-[48px] px-5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#52796f]/15 text-[#1b4332]'
                          : 'bg-[#c26d38] hover:bg-[#a85928] text-white'
                      }`}
                    >
                      {isSelected ? 'Dalam Rencana' : 'Pilih Menginap'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
