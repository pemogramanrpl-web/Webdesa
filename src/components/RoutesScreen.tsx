import { useState } from 'react';
import { MapPin, Phone, Copy, Check, Navigation, Clock } from 'lucide-react';
import {
  VILLAGE_LANDMARKS,
  VILLAGE_ROUTES,
  type VillageLandmark,
  type VillageRoute,
} from '../data/villageData';

export function RoutesScreen() {
  const [selectedRoute, setSelectedRoute] = useState<VillageRoute>(VILLAGE_ROUTES[0]);
  const [selectedLandmark, setSelectedLandmark] = useState<VillageLandmark>(VILLAGE_LANDMARKS[1]);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = async () => {
    const phone = '+62 812-3456-7890';
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-[#fdf2e6] rounded-xl p-6 sm:p-10 border-sand-hairline">
        <p className="text-sm font-semibold text-[#52796f] mb-2">
          Penunjuk Arah Lapangan · Peta Interaktif Desa
        </p>
        <h1 className="font-display text-[30px] sm:text-[40px] font-bold leading-tight text-[#1b4332] [text-wrap:balance]">
          Rute Jalan & Peta Desa Lereng Asri
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#3e3a36] max-w-2xl leading-relaxed">
          Pilih jalur jalan kaki di bawah untuk melihat kontur ketinggian, titik bangku istirahat,
          dan akses kendaraan keluarga tanpa khawatir tersesat.
        </p>
      </section>

      {/* Interactive Trail Selector Buttons */}
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Pilih rute desa">
        {VILLAGE_ROUTES.map((route) => {
          const active = selectedRoute.id === route.id;
          return (
            <button
              key={route.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedRoute(route)}
              className={`min-h-[48px] px-5 py-2.5 rounded-full text-sm sm:text-[15px] font-semibold transition-colors cursor-pointer ${
                active
                  ? 'bg-[#1b4332] text-white'
                  : 'bg-white text-[#3e3a36] border border-[#766e65]/25 hover:border-[#1b4332]'
              }`}
            >
              {route.name}
            </button>
          );
        })}
      </div>

      {/* Main Map + Route Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Interactive Topographic SVG Village Map */}
        <div className="lg:col-span-7 bg-white rounded-xl p-4 sm:p-6 shadow-sand-1 border-sand-hairline space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold text-[#1b4332]">
              Peta Titik Kumpul & Jalur Pejalan Kaki
            </h2>
            <span className="text-sm text-[#766e65]">Ketuk titik lokasi untuk detail fasilitas</span>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-[#f7ece1] border border-[#766e65]/15">
            <svg
              viewBox="0 0 600 360"
              className="w-full h-auto block"
              role="img"
              aria-label="Peta topografi Desa Wisata Lereng Asri"
            >
              {/* Soft contour elevation rings */}
              <path
                d="M 20 340 Q 190 290 360 315 T 590 265"
                fill="none"
                stroke="#e3d8cd"
                strokeWidth="2"
              />
              <path
                d="M 10 250 Q 170 205 330 230 T 585 180"
                fill="none"
                stroke="#e3d8cd"
                strokeWidth="2"
              />
              <path
                d="M 40 160 Q 210 110 380 140 T 580 95"
                fill="none"
                stroke="#e3d8cd"
                strokeWidth="2"
              />
              <path
                d="M 90 80 Q 260 40 440 75 T 585 45"
                fill="none"
                stroke="#e3d8cd"
                strokeWidth="2"
              />

              {/* Subtle stream line near eastern forest */}
              <path
                d="M 530 35 Q 495 120 480 190 T 455 340"
                fill="none"
                stroke="#a6cfc3"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Inactive routes backdrop */}
              {VILLAGE_ROUTES.map((r) => (
                <path
                  key={r.id}
                  d={r.pathCoords}
                  fill="none"
                  stroke="#766e65"
                  strokeOpacity="0.22"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              ))}

              {/* Active highlighted route */}
              <path
                d={selectedRoute.pathCoords}
                fill="none"
                stroke="#c26d38"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Interactive Landmark Pins */}
              {VILLAGE_LANDMARKS.map((lm) => {
                const isSelected = selectedLandmark.id === lm.id;
                const isOnRoute = selectedRoute.waypointIds.includes(lm.id);
                return (
                  <g
                    key={lm.id}
                    onClick={() => setSelectedLandmark(lm)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={lm.name}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedLandmark(lm);
                      }
                    }}
                  >
                    <circle
                      cx={lm.x}
                      cy={lm.y}
                      r={isSelected ? 18 : 13}
                      fill={isSelected ? '#c26d38' : isOnRoute ? '#1b4332' : '#52796f'}
                      stroke="#fff8f3"
                      strokeWidth="3"
                    />
                    <text
                      x={lm.x}
                      y={lm.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {VILLAGE_LANDMARKS.indexOf(lm) + 1}
                    </text>
                    <rect
                      x={lm.x - 62}
                      y={lm.y + 20}
                      width="124"
                      height="22"
                      rx="6"
                      fill="#fff8f3"
                      fillOpacity="0.94"
                    />
                    <text
                      x={lm.x}
                      y={lm.y + 35}
                      textAnchor="middle"
                      fill="#1b4332"
                      fontSize="10.5"
                      fontWeight="600"
                    >
                      {lm.name.length > 21 ? `${lm.name.slice(0, 19)}…` : lm.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Landmark Info Box */}
          <div className="bg-[#faf7f2] rounded-lg p-4 border-sand-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-[#c26d38]">
                Titik Lokasi #{VILLAGE_LANDMARKS.indexOf(selectedLandmark) + 1} ·{' '}
                {selectedLandmark.elevation}
              </div>
              <h3 className="font-display text-lg font-semibold text-[#1b4332] mt-0.5">
                {selectedLandmark.name}
              </h3>
              <p className="text-sm text-[#3e3a36] mt-1">{selectedLandmark.facilities}</p>
            </div>
          </div>
        </div>

        {/* Route Step-by-Step Guide & Emergency Contact */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sand-1 border-sand-hairline space-y-5">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[#52796f]">
                {selectedRoute.difficulty}
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#1b4332]">
                {selectedRoute.name}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-[#fdf2e6] rounded-lg p-3.5 text-center">
              <div>
                <div className="text-xs text-[#766e65]">Jarak</div>
                <div className="text-sm font-bold text-[#1b4332] tabular-nums mt-0.5">
                  {selectedRoute.distance}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#766e65]">Waktu</div>
                <div className="text-sm font-bold text-[#1b4332] tabular-nums mt-0.5">
                  {selectedRoute.duration}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#766e65]">Tanjakan</div>
                <div className="text-sm font-bold text-[#1b4332] tabular-nums mt-0.5">
                  {selectedRoute.elevationGain}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-[#3e3a36]">
              <div className="flex items-start gap-2">
                <Navigation className="w-4 h-4 text-[#52796f] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[#1b4332]">Titik Mulai:</strong> {selectedRoute.startPoint}{' '}
                  → {selectedRoute.endPoint}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#52796f] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-[#1b4332]">Tempat Istirahat:</strong>{' '}
                  {selectedRoute.restStops}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#766e65]/12">
              <h3 className="font-display text-base font-semibold text-[#1b4332]">
                Panduan Langkah di Lapangan
              </h3>
              <ol className="space-y-3">
                {selectedRoute.steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3 text-[15px] text-[#3e3a36]">
                    <span className="w-7 h-7 rounded-full bg-[#1b4332] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Village Host / Emergency Contact Card */}
          <div className="bg-[#1b4332] text-white rounded-xl p-6 shadow-sand-1 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#ffdbc9] shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Posko Pengelola & Bantuan Jalan
                </h3>
                <p className="mt-1 text-sm text-[#faefe4]/90 leading-relaxed">
                  Jika membutuhkan jemputan mobil desa di tengah perjalanan atau bantuan arah,
                  hubungi Koordinator Pokdarwis kami (aktif 06.00 – 18.00 WIB).
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-[#c1ecd4]">Pak Hendra · Koordinator Posko</div>
                <div className="font-display text-lg font-bold tabular-nums mt-0.5">
                  +62 812-3456-7890
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="min-h-[48px] px-4 rounded-lg bg-[#c26d38] hover:bg-[#a85928] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-4 h-4" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Nomor
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#c1ecd4]">
              <Phone className="w-3.5 h-3.5" />
              <span>Tersedia pula radio panggil (HT) di setiap gazebo terasering.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
