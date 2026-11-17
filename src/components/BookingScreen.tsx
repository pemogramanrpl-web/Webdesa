import { useState } from 'react';
import { Minus, Plus, Trash2, CheckCircle2, Copy, Check, ArrowLeft } from 'lucide-react';
import { formatRupiah, type ScreenId } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

export interface BookingItem {
  id: string;
  kind: 'package' | 'homestay';
  title: string;
  subtitle: string;
  unitPrice: number;
  unitLabel: 'orang' | 'malam';
  quantity: number;
  image: string;
}

interface BookingScreenProps {
  items: BookingItem[];
  onUpdateQuantity: (id: string, nextQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export function BookingScreen({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onNavigate,
}: BookingScreenProps) {
  const [guestName, setGuestName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [visitDate, setVisitDate] = useState('2026-11-21');
  const [needShuttle, setNeedShuttle] = useState(false);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setFormError('Silakan pilih minimal satu paket wisata atau homestay terlebih dahulu.');
      return;
    }
    if (guestName.trim().length < 2) {
      setFormError('Mohon isi nama lengkap pemesan.');
      return;
    }
    const cleanPhone = whatsapp.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 9) {
      setFormError('Mohon isi nomor WhatsApp aktif (minimal 9 digit) untuk konfirmasi pengelola.');
      return;
    }

    setFormError('');
    const code = `LA-${visitDate.replace(/-/g, '').slice(2)}-${String(
      Math.floor(100 + Math.random() * 900),
    )}`;
    setConfirmedCode(code);
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `Halo Pokdarwis Lereng Asri,`,
      `Kode Rencana: ${confirmedCode ?? 'Baru'}`,
      `Nama: ${guestName}`,
      `Tanggal Kunjungan: ${visitDate}`,
      `Antar-Jemput Lansia dari Parkir: ${needShuttle ? 'Ya, mohon disiapkan' : 'Tidak perlu'}`,
      `Rincian:`,
      ...items.map(
        (it) =>
          `- ${it.title} (${it.quantity} ${it.unitLabel}) = ${formatRupiah(it.unitPrice * it.quantity)}`,
      ),
      `Total Estimasi: ${formatRupiah(subtotal)}`,
      notes.trim() ? `Catatan: ${notes.trim()}` : '',
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsAppMessage());
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  if (confirmedCode) {
    return (
      <section className="max-w-2xl mx-auto bg-white rounded-xl p-6 sm:p-10 shadow-sand-2 border-sand-hairline space-y-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-10 h-10 text-[#1b4332] shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#52796f]">Pemesanan Tercatat</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1b4332] mt-1">
              Rencana Kunjungan Siap Dikonfirmasi
            </h1>
            <p className="mt-2 text-base text-[#3e3a36]">
              Terima kasih, <strong>{guestName}</strong>. Pengelola desa kami akan menghubungi nomor{' '}
              <strong className="tabular-nums">{whatsapp}</strong> dalam 15 menit pada jam layanan.
            </p>
          </div>
        </div>

        <div className="bg-[#fdf2e6] rounded-lg p-5 border-sand-hairline flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#766e65]">Kode Rencana Kunjungan</div>
            <div className="font-display text-2xl font-bold text-[#1b4332] tabular-nums mt-0.5">
              {confirmedCode}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-[#766e65]">Total Pembayaran di Pendopo</div>
            <div className="font-display text-2xl font-bold text-[#c26d38] tabular-nums mt-0.5">
              {formatRupiah(subtotal)}
            </div>
          </div>
        </div>

        <div className="bg-[#faf7f2] rounded-lg p-4 border-sand-hairline space-y-3">
          <div className="text-sm font-semibold text-[#1b4332]">Ringkasan Pesan untuk WhatsApp</div>
          <pre className="whitespace-pre-wrap font-sans text-sm text-[#3e3a36] leading-relaxed">
            {buildWhatsAppMessage()}
          </pre>
          <button
            type="button"
            onClick={handleCopySummary}
            className="min-h-[48px] px-5 rounded-lg bg-[#1b4332] hover:bg-[#012d1d] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            {copiedSummary ? (
              <>
                <Check className="w-4 h-4" />
                Ringkasan Tersalin
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Salin Ringkasan Rencana
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setConfirmedCode(null);
              onClearAll();
              onNavigate('explore');
            }}
            className="min-h-[52px] px-6 rounded-full bg-[#c26d38] hover:bg-[#a85928] text-white font-semibold cursor-pointer transition-colors"
          >
            Buat Rencana Baru
          </button>
          <button
            type="button"
            onClick={() => onNavigate('routes')}
            className="min-h-[52px] px-6 rounded-full border-2 border-[#1b4332] text-[#1b4332] font-semibold hover:bg-[#1b4332]/5 cursor-pointer transition-colors"
          >
            Lihat Peta & Rute Kedatangan
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#52796f]">
            Tanpa Uang Muka Rumit · Bayar Langsung di Pendopo Desa
          </p>
          <h1 className="font-display text-[30px] sm:text-[40px] font-bold text-[#1b4332] mt-1">
            Ringkasan Rencana Kunjungan
          </h1>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className="min-h-[48px] px-5 rounded-full border-2 border-[#1b4332] text-[#1b4332] text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#1b4332]/5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Tambah Paket Lain
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-sand-1 border-sand-hairline space-y-4">
          <h2 className="font-display text-2xl font-semibold text-[#1b4332]">
            Belum Ada Paket atau Homestay yang Dipilih
          </h2>
          <p className="text-base text-[#3e3a36] max-w-lg mx-auto">
            Pilih paket jelajah terasering, workshop kopi, atau omah bambu terlebih dahulu untuk
            menghitung perkiraan biaya kunjungan Anda.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="min-h-[52px] px-7 rounded-full bg-[#c26d38] hover:bg-[#a85928] text-white font-semibold cursor-pointer"
            >
              Jelajahi Paket Wisata
            </button>
            <button
              type="button"
              onClick={() => onNavigate('homestays')}
              className="min-h-[52px] px-7 rounded-full border-2 border-[#1b4332] text-[#1b4332] font-semibold cursor-pointer"
            >
              Lihat Homestay Desa
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selected Items List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-sand-1 border-sand-hairline flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border-sand-hairline">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#52796f]">{item.subtitle}</div>
                    <h2 className="font-display text-lg font-semibold text-[#1b4332] leading-snug">
                      {item.title}
                    </h2>
                    <div className="text-sm text-[#766e65] tabular-nums mt-1">
                      {formatRupiah(item.unitPrice)} / {item.unitLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#766e65]/12">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label={`Kurangi jumlah ${item.title}`}
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-11 h-11 rounded-lg border border-[#766e65]/25 flex items-center justify-center text-[#1b4332] hover:bg-[#fdf2e6] cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-[#1b4332] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Tambah jumlah ${item.title}`}
                      onClick={() => onUpdateQuantity(item.id, Math.min(20, item.quantity + 1))}
                      className="w-11 h-11 rounded-lg border border-[#766e65]/25 flex items-center justify-center text-[#1b4332] hover:bg-[#fdf2e6] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right min-w-[105px]">
                    <div className="font-display font-bold text-[#1b4332] tabular-nums">
                      {formatRupiah(item.unitPrice * item.quantity)}
                    </div>
                    <div className="text-xs text-[#766e65] tabular-nums">
                      {item.quantity} {item.unitLabel}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Hapus ${item.title}`}
                    className="w-11 h-11 rounded-lg text-[#766e65] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/50 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Visitor Details Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-5 bg-white rounded-xl p-6 sm:p-7 shadow-sand-1 border-sand-hairline space-y-5"
          >
            <h2 className="font-display text-xl font-semibold text-[#1b4332]">
              Data Pemesan & Kedatangan
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="nama-pemesan"
                  className="block text-sm font-semibold text-[#201b14] mb-1.5"
                >
                  Nama Lengkap Pemesan
                </label>
                <input
                  id="nama-pemesan"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full min-h-[52px] px-4 bg-white rounded-lg border-[1.5px] border-[#766e65]/25 text-base text-[#201b14] focus:border-[#1b4332] focus:outline-none focus:ring-[3px] focus:ring-[#1b4332]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="wa-pemesan"
                  className="block text-sm font-semibold text-[#201b14] mb-1.5"
                >
                  Nomor WhatsApp Aktif
                </label>
                <input
                  id="wa-pemesan"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full min-h-[52px] px-4 bg-white rounded-lg border-[1.5px] border-[#766e65]/25 text-base text-[#201b14] tabular-nums focus:border-[#1b4332] focus:outline-none focus:ring-[3px] focus:ring-[#1b4332]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="tanggal-kunjungan"
                  className="block text-sm font-semibold text-[#201b14] mb-1.5"
                >
                  Tanggal Kunjungan
                </label>
                <input
                  id="tanggal-kunjungan"
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full min-h-[52px] px-4 bg-white rounded-lg border-[1.5px] border-[#766e65]/25 text-base text-[#201b14] tabular-nums focus:border-[#1b4332] focus:outline-none focus:ring-[3px] focus:ring-[#1b4332]/15"
                />
              </div>

              <button
                type="button"
                role="checkbox"
                aria-checked={needShuttle}
                onClick={() => setNeedShuttle((prev) => !prev)}
                className="w-full min-h-[48px] p-3 rounded-lg bg-[#faf7f2] border border-[#766e65]/15 flex items-center gap-3 text-left cursor-pointer"
              >
                <span
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                    needShuttle
                      ? 'bg-[#1b4332] text-white'
                      : 'bg-white border-[1.5px] border-[#766e65]/45'
                  }`}
                >
                  {needShuttle && <Check className="w-4 h-4" strokeWidth={2.5} />}
                </span>
                <span className="text-sm font-medium text-[#201b14]">
                  Siapkan mobil jemputan gratis dari Parkir ke Pendopo (untuk lansia/anak)
                </span>
              </button>

              <div>
                <label
                  htmlFor="catatan-tamu"
                  className="block text-sm font-semibold text-[#201b14] mb-1.5"
                >
                  Catatan Tambahan (opsional)
                </label>
                <textarea
                  id="catatan-tamu"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: pantangan makanan, butuh kursi roda pinjaman..."
                  className="w-full p-3.5 bg-white rounded-lg border-[1.5px] border-[#766e65]/25 text-base text-[#201b14] focus:border-[#1b4332] focus:outline-none focus:ring-[3px] focus:ring-[#1b4332]/15"
                />
              </div>
            </div>

            {formError && (
              <div
                role="alert"
                className="rounded-lg bg-[#ffdad6] text-[#93000a] px-4 py-3 text-sm font-medium"
              >
                {formError}
              </div>
            )}

            <div className="pt-3 border-t border-[#766e65]/15 flex items-baseline justify-between">
              <span className="text-base font-medium text-[#3e3a36]">Total Estimasi</span>
              <span className="font-display text-2xl font-bold text-[#1b4332] tabular-nums">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full min-h-[52px] px-6 rounded-full bg-[#c26d38] hover:bg-[#a85928] active:scale-[0.98] text-white text-base font-semibold transition-all cursor-pointer shadow-sand-1"
            >
              Konfirmasi Rencana Kunjungan
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
