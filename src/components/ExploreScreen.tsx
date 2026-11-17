import { useMemo, useState } from 'react';
import { MapPin, Search, Check, ArrowRight, Phone } from 'lucide-react';
import {
  HERO_IMAGE,
  VILLAGE_CONDITIONS,
  TOUR_PACKAGES,
  HOMESTAYS,
  GUEST_STORIES,
  formatRupiah,
  type PackageCategory,
  type TourPackage,
  type Homestay,
  type ScreenId,
} from '../data/villageData';
import { ResilientImage } from './ResilientImage';

interface ExploreScreenProps {
  onSelectPackage: (pkg: TourPackage) => void;
  onSelectHomestay: (hs: Homestay) => void;
  onQuickAddPackage: (pkg: TourPackage) => void;
  onNavigate: (screen: ScreenId) => void;
  selectedIds: Set<string>;
}

const CATEGORIES: PackageCategory[] = [
  'Semua',
  'Alam & Trekking',
  'Kopi & Kuliner',
  'Budaya & Kriya',
  'Keluarga & Lansia',
];

export function ExploreScreen({
  onSelectPackage,
  onSelectHomestay,
  onQuickAddPackage,
  onNavigate,
  selectedIds,
}: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('Semua');
  const [elderOnly, setElderOnly] = useState(false);

  const filteredPackages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TOUR_PACKAGES.filter((pkg) => {
      const matchesCat = activeCategory === 'Semua' || pkg.category === activeCategory;
      const matchesElder = !elderOnly || pkg.elderFriendly;
      const matchesQuery =
        q.length === 0 ||
        pkg.title.toLowerCase().includes(q) ||
        pkg.location.toLowerCase().includes(q) ||
        pkg.summary.toLowerCase().includes(q);
      return matchesCat && matchesElder && matchesQuery;
    });
  }, [searchQuery, activeCategory, elderOnly]);

  const scrollToPackages = () => {
    const el = document.getElementById('daftar-paket');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Hero Section */}
      <section aria-label="Pengantar Desa Wisata Lereng Asri">
        <div className="relative overflow-hidden rounded-xl shadow-sand-2 border-sand-hairline bg-[#1b4332]">
          <div className="aspect-[4/3] sm:aspect-[16/9] max-h-[540px] w-full">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Pendopo bambu dan terasering hijau Desa Wisata Lereng Asri saat matahari terbit"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/90 via-[#012d1d]/45 to-black/15"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="text-sm sm:text-base font-medium text-[#ffdbc9] mb-2">
                Desa Wisata Pegunungan · 1.240 mdpl · Ramah Lintas Generasi
              </p>
              <h1 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.16] tracking-[-0.02em] text-white [text-wrap:balance]">
                Pulang ke Ketenangan Terasering & Kehangatan Desa
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#faefe4]/95 leading-relaxed max-w-xl">
                Susuri jalan batu landai, sangrai kopi arabika di kuali tanah liat, dan menginap di
                omah bambu yang disiapkan tulus untuk keluarga dan orang tua.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToPackages}
                  className="min-h-[52px] px-7 bg-[#c26d38] hover:bg-[#a85928] active:scale-[0.98] text-white text-base font-semibold rounded-full whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer shadow-sand-2"
                >
                  Jelajahi Paket
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('routes')}
                  className="min-h-[52px] px-6 bg-[#fff8f3]/95 hover:bg-white text-[#1b4332] text-base font-semibold rounded-full whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer"
                >
                  Lihat Rute
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Field Conditions Strip */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {VILLAGE_CONDITIONS.map((item) => (
            <div
              key={item.label}
              className="bg-[#fdf2e6] rounded-lg px-4 py-3.5 sm:px-5 sm:py-4 border-sand-hairline"
            >
              <div className="text-xs sm:text-sm font-medium text-[#766e65]">{item.label}</div>
              <div className="mt-1 font-display text-base sm:text-lg font-semibold text-[#1b4332] tabular-nums">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section id="daftar-paket" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] sm:text-[34px] font-semibold leading-tight tracking-[-0.01em] text-[#1b4332] [text-wrap:balance]">
              Paket Wisata Desa Pilihan
            </h2>
            <p className="mt-1.5 text-base text-[#3e3a36]">
              Setiap kegiatan dilengkapi informasi jalur berjalan, tempat duduk istirahat, dan harga
              transparan.
            </p>
          </div>
          <span className="text-sm font-medium text-[#766e65] tabular-nums shrink-0">
            Menampilkan {filteredPackages.length} dari {TOUR_PACKAGES.length} paket
          </span>
        </div>

        {/* Search Input + Elder-Friendly Checkbox */}
        <div className="bg-[#ffffff] rounded-lg p-4 sm:p-5 shadow-sand-1 border-sand-hairline space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="relative flex-1">
              <label htmlFor="cari-paket" className="sr-only">
                Cari paket wisata atau aktivitas
              </label>
              <Search
                className="w-5 h-5 text-[#766e65] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="cari-paket"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari paket wisata, kopi, anyaman, atau jalur datar..."
                className="w-full min-h-[52px] pl-12 pr-4 bg-white text-base text-[#201b14] placeholder:text-[#766e65] rounded-lg border-[1.5px] border-[#766e65]/25 focus:border-[#1b4332] focus:outline-none focus:ring-[3px] focus:ring-[#1b4332]/15 transition-shadow"
              />
            </div>

            {/* Elder-friendly accessible checkbox (48x48 touch hitbox) */}
            <button
              type="button"
              role="checkbox"
              aria-checked={elderOnly}
              onClick={() => setElderOnly((prev) => !prev)}
              className="min-h-[48px] px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-[#fdf2e6] transition-colors cursor-pointer text-left shrink-0"
            >
              <span
                className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors ${
                  elderOnly
                    ? 'bg-[#1b4332] text-white'
                    : 'bg-white border-[1.5px] border-[#766e65]/45'
                }`}
              >
                {elderOnly && <Check className="w-4 h-4" strokeWidth={2.5} />}
              </span>
              <span className="text-[15px] font-medium text-[#201b14] whitespace-nowrap">
                Hanya jalur datar & ramah lansia
              </span>
            </button>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter kategori wisata">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[40px] px-5 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1b4332] text-white'
                      : 'bg-white text-[#766e65] border border-[#766e65]/25 hover:border-[#1b4332]/50 hover:text-[#1b4332]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tour Package Cards Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-[#fff8f3] rounded-lg p-10 text-center border-sand-hairline">
            <p className="font-display text-xl font-semibold text-[#1b4332]">
              Belum ada paket yang sesuai pencarian Anda
            </p>
            <p className="mt-2 text-base text-[#3e3a36]">
              Coba hapus kata kunci pencarian atau pilih kategori “Semua”.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('Semua');
                setElderOnly(false);
              }}
              className="mt-5 min-h-[48px] px-6 rounded-full border-2 border-[#1b4332] text-[#1b4332] text-sm font-semibold hover:bg-[#1b4332] hover:text-white transition-colors cursor-pointer"
            >
              Atur Ulang Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPackages.map((pkg) => {
              const isAdded = selectedIds.has(pkg.id);
              return (
                <article
                  key={pkg.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sand-1 hover:shadow-sand-2 border-sand-hairline flex flex-col transition-shadow duration-200"
                >
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden block cursor-pointer text-left group"
                  >
                    <ResilientImage
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    />
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      {/* Unboxed clean metadata line */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-[#766e65]">
                        <span className="text-[#52796f] font-semibold">{pkg.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{pkg.duration}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{pkg.groupSize}</span>
                      </div>

                      <h3 className="font-display text-xl font-semibold leading-snug text-[#1b4332]">
                        <button
                          type="button"
                          onClick={() => onSelectPackage(pkg)}
                          className="text-left hover:underline cursor-pointer"
                        >
                          {pkg.title}
                        </button>
                      </h3>

                      <p className="text-[15px] leading-relaxed text-[#3e3a36] line-clamp-3">
                        {pkg.summary}
                      </p>

                      <div className="pt-1 flex items-start gap-2 text-sm text-[#52796f] font-medium">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                        <span>
                          {pkg.location} — {pkg.terrainNote}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#766e65]/12 space-y-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <span className="font-display text-xl font-bold text-[#1b4332] tabular-nums">
                            {formatRupiah(pkg.price)}
                          </span>
                          <span className="text-sm text-[#766e65]"> / orang</span>
                        </div>
                        {pkg.elderFriendly && (
                          <span className="text-xs font-semibold text-[#1b4332]">
                            Ramah Lansia
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => onSelectPackage(pkg)}
                          className="min-h-[48px] px-4 rounded-lg border-2 border-[#1b4332] text-[#1b4332] text-sm font-semibold hover:bg-[#1b4332]/5 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Lihat Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuickAddPackage(pkg)}
                          className={`min-h-[48px] px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            isAdded
                              ? 'bg-[#52796f]/15 text-[#1b4332]'
                              : 'bg-[#c26d38] hover:bg-[#a85928] text-white'
                          }`}
                        >
                          {isAdded ? 'Sudah Dipilih' : 'Pilih Paket'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Homestay Spotlight Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] sm:text-[34px] font-semibold leading-tight tracking-[-0.01em] text-[#1b4332]">
              Menginap di Omah Bambu Warga
            </h2>
            <p className="mt-1.5 text-base text-[#3e3a36]">
              Beranda teduh menghadap lembah dengan sarapan rumahan dan akses kamar lantai dasar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('homestays')}
            className="min-h-[48px] px-5 rounded-full border-2 border-[#1b4332] text-[#1b4332] text-sm font-semibold hover:bg-[#1b4332] hover:text-white transition-colors inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer whitespace-nowrap"
          >
            Semua Homestay
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HOMESTAYS.slice(0, 2).map((hs) => (
            <article
              key={hs.id}
              className="bg-white rounded-lg overflow-hidden shadow-sand-1 hover:shadow-sand-2 border-sand-hairline flex flex-col sm:flex-row transition-shadow"
            >
              <button
                type="button"
                onClick={() => onSelectHomestay(hs)}
                className="sm:w-[44%] aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden cursor-pointer block"
              >
                <ResilientImage
                  src={hs.image}
                  alt={hs.name}
                  className="w-full h-full object-cover"
                />
              </button>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-[13px] font-medium text-[#52796f]">
                    {hs.cluster} · Maks. {hs.capacity} tamu
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#1b4332]">{hs.name}</h3>
                  <p className="text-[15px] text-[#3e3a36] leading-relaxed">{hs.description}</p>
                  <p className="text-sm font-medium text-[#766e65]">
                    {hs.groundFloorAccess
                      ? 'Akses kamar lantai dasar tanpa tangga curam'
                      : 'Kabin kebun bertingkat rendah'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#766e65]/12 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-display text-lg font-bold text-[#1b4332] tabular-nums">
                      {formatRupiah(hs.pricePerNight)}
                    </span>
                    <span className="text-sm text-[#766e65]"> / malam</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectHomestay(hs)}
                    className="min-h-[44px] px-4 rounded-lg bg-[#52796f]/12 hover:bg-[#52796f]/20 text-[#1b4332] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cek Kamar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Attributable Guest Stories & Direct Pokdarwis Help */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-8 bg-[#fdf2e6] rounded-xl p-6 sm:p-8 border-sand-hairline space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1b4332]">
              Cerita Keluarga yang Pernah Berkunjung
            </h2>
            <p className="mt-1 text-base text-[#3e3a36]">
              Catatan langsung dari tamu lintas generasi yang menjelajahi Lereng Asri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUEST_STORIES.map((story) => (
              <blockquote
                key={story.id}
                className="bg-white rounded-lg p-5 border-sand-hairline flex flex-col justify-between gap-4"
              >
                <p className="text-[15px] leading-relaxed text-[#3e3a36]">“{story.quote}”</p>
                <footer className="pt-3 border-t border-[#766e65]/12">
                  <div className="font-semibold text-[#1b4332] text-[15px]">{story.name}</div>
                  <div className="text-xs text-[#766e65] mt-0.5">{story.origin}</div>
                  <div className="text-xs font-medium text-[#52796f] mt-1">{story.packageUsed}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 bg-[#1b4332] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sand-1">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-white">
              Butuh Penyesuaian Khusus untuk Orang Tua?
            </h2>
            <p className="text-[15px] leading-relaxed text-[#faefe4]/90">
              Pengelola Pokdarwis kami siap menyiapkan mobil antar-titik, kursi roda gratis, atau
              menu rendah garam tanpa biaya tambahan.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-[#c1ecd4]">
              Posko Pendopo Utama · Pak Hendra (Koordinator Lapangan)
            </div>
            <button
              type="button"
              onClick={() => onNavigate('routes')}
              className="w-full min-h-[52px] px-5 bg-[#c26d38] hover:bg-[#a85928] text-white font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Panduan Rute & Kontak Desa
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
