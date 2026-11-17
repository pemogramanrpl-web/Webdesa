export type ScreenId = 'explore' | 'homestays' | 'routes' | 'booking';

export type PackageCategory =
  | 'Semua'
  | 'Alam & Trekking'
  | 'Kopi & Kuliner'
  | 'Budaya & Kriya'
  | 'Keluarga & Lansia';

export interface ItineraryStep {
  time: string;
  activity: string;
  detail: string;
}

export interface TourPackage {
  id: string;
  title: string;
  category: Exclude<PackageCategory, 'Semua'>;
  price: number;
  duration: string;
  groupSize: string;
  location: string;
  terrainNote: string;
  elderFriendly: boolean;
  hostName: string;
  hostRole: string;
  image: string;
  summary: string;
  itinerary: ItineraryStep[];
  includes: string[];
}

export interface Homestay {
  id: string;
  name: string;
  cluster: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  groundFloorAccess: boolean;
  image: string;
  hostName: string;
  breakfastIncluded: string;
  amenities: string[];
  description: string;
}

export interface VillageLandmark {
  id: string;
  name: string;
  subtitle: string;
  elevation: string;
  x: number;
  y: number;
  facilities: string;
}

export interface VillageRoute {
  id: string;
  name: string;
  distance: string;
  duration: string;
  elevationGain: string;
  difficulty: 'Datar · Ramah Lansia' | 'Landai · Santai' | 'Menanjak Ringan';
  elderAccessible: boolean;
  startPoint: string;
  endPoint: string;
  restStops: string;
  pathCoords: string;
  waypointIds: string[];
  steps: string[];
}

export interface GuestStory {
  id: string;
  name: string;
  origin: string;
  packageUsed: string;
  quote: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_lereng_asri_1794888609374.jpg';

export const VILLAGE_CONDITIONS = [
  { label: 'Ketinggian Desa', value: '1.240 mdpl' },
  { label: 'Cuaca Saat Ini', value: '19°C · Cerah Berawan' },
  { label: 'Jalur Ramah Lansia', value: '4 Rute Landai' },
  { label: 'Jam Layanan Pokdarwis', value: '06.00 – 18.00 WIB' },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-terasering',
    title: 'Jelajah Terasering Pagi & Embun Pegunungan',
    category: 'Alam & Trekking',
    price: 165000,
    duration: '3,5 jam',
    groupSize: '2–10 orang',
    location: 'Dusun Krajan · Jalur Batu Landai',
    terrainNote: 'Jalur paving batu rapi dengan 3 gazebo istirahat',
    elderFriendly: true,
    hostName: 'Kang Dimas & Pak Suyono',
    hostRole: 'Pemandu Konservasi Desa',
    image: '/src/assets/images/pkg_terrace_walk_1794888610493.jpg',
    summary:
      'Menyusuri pematang sawah terasering saat matahari terbit dengan tempo santai, ditemani teh serai hangat di gubuk bambu tengah lembah.',
    itinerary: [
      {
        time: '06.00',
        activity: 'Berkumpul di Pendopo Utama',
        detail: 'Pemanasan ringan, pembagian tongkat jalan bambu, dan segelas jahe hangat.',
      },
      {
        time: '06.30',
        activity: 'Jalan Pagi Menyusuri Terasering Krajan',
        detail: 'Berhenti di dua gardu pandang utama yang memiliki bangku kayu teduh.',
      },
      {
        time: '08.00',
        activity: 'Sarapan Nasi Jagung & Sayur Lodeh di Gubuk Sawah',
        detail: 'Hidangan hangat langsung dari dapur warga setempat.',
      },
      {
        time: '09.15',
        activity: 'Kembali ke Pendopo via Jalur Datar',
        detail: 'Dapat dijemput mobil desa bila peserta ingin kembali lebih cepat.',
      },
    ],
    includes: ['Pemandu lokal bersertifikat', 'Sarapan tradisional desa', 'Teh jahe & air mineral', 'Tongkat bambu pinjaman'],
  },
  {
    id: 'pkg-kopi-kuali',
    title: 'Sangrai Kopi Kuali Tanah & Seduh Tradisional',
    category: 'Kopi & Kuliner',
    price: 145000,
    duration: '2,5 jam',
    groupSize: '2–8 orang',
    location: 'Rumah Sangrai Mbah Karto',
    terrainNote: 'Area duduk teduh tanpa tangga, 40m dari parkir utama',
    elderFriendly: true,
    hostName: 'Mbah Karto & Mbak Rina',
    hostRole: 'Petani Kopi Arabika Lereng',
    image: '/src/assets/images/pkg_coffee_roast_1794888610716.jpg',
    summary:
      'Belajar menyangrai biji kopi arabika ketinggian 1.200 mdpl menggunakan kuali gerabah dan tungku kayu bakar, lalu membawa pulang 200g kopi hasil sangrai sendiri.',
    itinerary: [
      {
        time: '09.00',
        activity: 'Pengenalan Biji Kopi Petik Merah',
        detail: 'Memilah biji hijau dan mengenal proses jemur madu khas Lereng Asri.',
      },
      {
        time: '09.45',
        activity: 'Praktik Sangrai di Kuali Tanah Liat',
        detail: 'Mengaduk biji kopi di atas bara kayu kopi dengan suhu terjaga.',
      },
      {
        time: '10.45',
        activity: 'Seduh Kopi Tubruk & Kue Gula Aren',
        detail: 'Menikmati hasil sangraian bersama pisang goreng wijen dan singkong rebus.',
      },
    ],
    includes: ['200g kopi sangrai bawa pulang', 'Camilan tradisional hangat', 'Celemek kain tenun', 'Resep seduh rumahan'],
  },
  {
    id: 'pkg-anyaman-bambu',
    title: 'Workshop Anyaman Bambu & Pendopo Kriya',
    category: 'Budaya & Kriya',
    price: 180000,
    duration: '3 jam',
    groupSize: '2–12 orang',
    location: 'Sanggar Kriya Ibu Wati',
    terrainNote: 'Pendopo datar berpagar, kursi sandaran nyaman tersedia',
    elderFriendly: true,
    hostName: 'Ibu Wati & Pengrajin Sanggar',
    hostRole: 'Maestro Anyaman Bambu Desa',
    image: '/src/assets/images/pkg_bamboo_craft_1794888611288.jpg',
    summary:
      'Menganyam besek hantaran atau tatakan cangkir dari bilah bambu apus yang telah dihaluskan, cocok untuk anak-anak hingga orang tua.',
    itinerary: [
      {
        time: '13.30',
        activity: 'Mengenal Jenis Bambu Apus & Petung',
        detail: 'Penjelasan teknik perendaman alami agar anyaman awet dan tidak berjamur.',
      },
      {
        time: '14.00',
        activity: 'Praktik Menganyam Pola Kepang Dasar',
        detail: 'Didampingi satu pengrajin untuk setiap dua peserta agar mudah diikuti.',
      },
      {
        time: '15.45',
        activity: 'Finishing & Wedang Uwuh Sore',
        detail: 'Membawa pulang hasil karya anyaman lengkap dengan tas kain blacu.',
      },
    ],
    includes: ['Bahan bambu halus siap anyam', 'Hasil karya dibawa pulang', 'Wedang uwuh & kudapan sore', 'Pendampingan intensif'],
  },
  {
    id: 'pkg-curug-kabut',
    title: 'Trekking Ringan Curug Kabut & Hutan Pakis',
    category: 'Alam & Trekking',
    price: 195000,
    duration: '4 jam',
    groupSize: '2–8 orang',
    location: 'Kawasan Konservasi Lereng Timur',
    terrainNote: 'Sebagian jalur bertangga batu pegangan kayu (kemiringan sedang)',
    elderFriendly: false,
    hostName: 'Mas Teguh',
    hostRole: 'Tim Jagawana Desa',
    image: '/src/assets/images/trail_waterfall_mist_1794888612160.jpg',
    summary:
      'Menyusuri rimbunnya hutan pakis raksasa menuju air terjun alami berair jernih dan sejuk, lengkap dengan pengamatan burung endemik.',
    itinerary: [
      {
        time: '07.30',
        activity: 'Registrasi di Pos Jagawana',
        detail: 'Pengecekan alas kaki, jas hujan darurat, dan penjelasan etika hutan.',
      },
      {
        time: '08.15',
        activity: 'Lintas Hutan Pakis & Jembatan Bambu',
        detail: 'Menjelajahi jalur teduh berkanopi rapat dengan udara bersih.',
      },
      {
        time: '09.30',
        activity: 'Istirahat di Kolam Alami Curug Kabut',
        detail: 'Menikmati bekal buah segar dan merendam kaki di aliran mata air.',
      },
      {
        time: '11.00',
        activity: 'Perjalanan Kembali & Makan Siang',
        detail: 'Santap siang ikan bakar bumbu kuning di warung tepi sungai.',
      },
    ],
    includes: ['Tiket masuk konservasi', 'Pemandu jagawana & P3K', 'Makan siang warung desa', 'Jas hujan lipat'],
  },
  {
    id: 'pkg-guyub-seharian',
    title: 'Paket Seharian Guyub Desa (Kopi, Sawah & Makan Siang)',
    category: 'Keluarga & Lansia',
    price: 320000,
    duration: '7 jam',
    groupSize: '4–15 orang',
    location: 'Pendopo Utama hingga Klaster Kebun',
    terrainNote: 'Akses kendaraan antar-titik tersedia bila dibutuhkan lansia',
    elderFriendly: true,
    hostName: 'Pokdarwis Lereng Asri',
    hostRole: 'Tim Pendamping Terpadu',
    image: '/src/assets/images/hero_lereng_asri_1794888609374.jpg',
    summary:
      'Pengalaman lengkap seharian untuk keluarga multi-generasi: jalan pagi ringan di sawah, sangrai kopi santai, dan makan siang bersama di pendopo.',
    itinerary: [
      {
        time: '07.00',
        activity: 'Sambutan Hangat & Jalan Santai Terasering',
        detail: 'Rute pendek 900 meter yang ramah lutut dengan pemandangan lembah.',
      },
      {
        time: '09.30',
        activity: 'Sesi Sangrai Kopi & Minum Jamu Kunyit Asam',
        detail: 'Aktivitas duduk santai di rumah produksi warga.',
      },
      {
        time: '12.00',
        activity: 'Makan Siang Tampah Daun Pisang',
        detail: 'Nasi liwet hangat, ayam kampung panggang, urap sayur organik, dan sambal terasi.',
      },
      {
        time: '13.30',
        activity: 'Istirahat Pendopo & Belanja Hasil Kebun',
        detail: 'Waktu bebas memetik sayuran segar atau bersantai sebelum pulang.',
      },
    ],
    includes: ['Mobil antar-jemput titik desa', 'Makan siang tampah lengkap', 'Sesi kopi kuali & oleh-oleh', 'Dokumentasi foto keluarga'],
  },
  {
    id: 'pkg-kebun-organik',
    title: 'Menyusuri Mata Air & Kebun Sayur Organik',
    category: 'Keluarga & Lansia',
    price: 135000,
    duration: '2 jam',
    groupSize: '2–12 orang',
    location: 'Kebun Edukasi Sumber Bening',
    terrainNote: 'Jalur datar 100% tanpa anak tangga, ramah kursi roda',
    elderFriendly: true,
    hostName: 'Ibu Sulastri',
    hostRole: 'Ketua Kelompok Tani Wanita',
    image: '/src/assets/images/homestay_bamboo_villa_1794888611675.jpg',
    summary:
      'Wisata edukasi memetik selada, wortel, dan daun mint langsung dari bedengan organik di samping sumber mata air desa.',
    itinerary: [
      {
        time: '08.30',
        activity: 'Tur Mata Air Sumber Bening',
        detail: 'Melihat sistem pengairan bambu tradisional yang mengalir ke seluruh desa.',
      },
      {
        time: '09.15',
        activity: 'Panen Sayur Organik dalam Keranjang',
        detail: 'Setiap tamu membawa pulang 1 kg sayuran segar pilihan sendiri.',
      },
      {
        time: '10.00',
        activity: 'Minum Teh Bunga Telang di Gazebo Kebun',
        detail: 'Bersantai sambil berdiskusi tentang kompos dan pertanian lestari.',
      },
    ],
    includes: ['1 kg sayur organik segar', 'Teh bunga telang & lemper hangat', 'Keranjang petik pinjaman', 'Akses jalur datar penuh'],
  },
];

export const HOMESTAYS: Homestay[] = [
  {
    id: 'hs-omah-bambu',
    name: 'Omah Bambu Kencana',
    cluster: 'Klaster Terasering Selatan',
    pricePerNight: 485000,
    capacity: 4,
    bedrooms: 2,
    groundFloorAccess: true,
    image: '/src/assets/images/homestay_bamboo_villa_1794888611675.jpg',
    hostName: 'Keluarga Pak Darmo',
    breakfastIncluded: 'Sarapan nasi liwet hangat, tempe mendoan & kopi/teh poci',
    amenities: ['Kamar lantai dasar tanpa tangga', 'Air hangat tenaga surya', 'Teras menghadap lembah', 'Selimut katun tebal'],
    description:
      'Beranda kayu jati lapang dengan dinding anyaman bambu berventilasi alami. Sangat tenang untuk keluarga bersama orang tua yang menginginkan akses rata tanpa anak tangga curam.',
  },
  {
    id: 'hs-paviliun-jati',
    name: 'Paviliun Jati Suroboyo',
    cluster: 'Dekat Pendopo Utama (80m)',
    pricePerNight: 620000,
    capacity: 6,
    bedrooms: 3,
    groundFloorAccess: true,
    image: '/src/assets/images/hero_lereng_asri_1794888609374.jpg',
    hostName: 'Ibu Hartini',
    breakfastIncluded: 'Sarapan prasmanan keluarga (soto desa & jajanan pasar)',
    amenities: ['Akses jalan setapak ramah kursi roda', 'Kamar mandi berpegangan aman', 'Ruang keluarga luas', 'Parkir mobil tepat di halaman'],
    description:
      'Rumah kayu jati joglo modern yang lapang untuk rombongan tiga generasi. Dilengkapi pegangan pengaman di kamar mandi dan parkir pribadi di samping teras.',
  },
  {
    id: 'hs-pondok-kopi',
    name: 'Pondok Kopi Lereng',
    cluster: 'Klaster Kebun Kopi Barat',
    pricePerNight: 390000,
    capacity: 2,
    bedrooms: 1,
    groundFloorAccess: false,
    image: '/src/assets/images/pkg_coffee_roast_1794888610716.jpg',
    hostName: 'Mas Bagus & Mbak Ani',
    breakfastIncluded: 'Kopi tubruk arabika segar & roti bakar madu hutan',
    amenities: ['Pemandangan kebun arabika', 'Perapian tungku teras sore', 'Peralatan seduh manual di kamar', 'Wi-Fi desa stabil'],
    description:
      'Kabin intim beraroma kayu manis dan kopi sangrai di tepi kebun arabika. Cocok bagi pasangan atau pelancong solo yang mencari ketenangan malam pegunungan.',
  },
  {
    id: 'hs-griya-tani',
    name: 'Griya Tani Asri',
    cluster: 'Klaster Kebun Sayur Organik',
    pricePerNight: 440000,
    capacity: 4,
    bedrooms: 2,
    groundFloorAccess: true,
    image: '/src/assets/images/pkg_terrace_walk_1794888610493.jpg',
    hostName: 'Ibu Sulastri',
    breakfastIncluded: 'Nasi jagung hangat, urap kebun & jamu beras kencur',
    amenities: ['Halaman rumput datar', 'Dapur kecil seduh teh', 'Air minum isi ulang kendi', 'Dekat kebun petik sayur'],
    description:
      'Hunian ramah keluarga yang langsung menghadap bedengan sayur organik dan aliran parit jernih. Anak-anak dapat bermain aman di halaman rumput datar.',
  },
];

export const VILLAGE_LANDMARKS: VillageLandmark[] = [
  {
    id: 'lm-parkir',
    name: 'Area Parkir & Posko',
    subtitle: 'Akses Mobil & Bus Kecil',
    elevation: '1.210 mdpl',
    x: 110,
    y: 295,
    facilities: 'Toilet ramah lansia, kursi roda pinjaman, loket informasi Pokdarwis',
  },
  {
    id: 'lm-pendopo',
    name: 'Pendopo Utama Lereng Asri',
    subtitle: 'Titik Kumpul & Makan Siang',
    elevation: '1.240 mdpl',
    x: 245,
    y: 235,
    facilities: 'Mushola bersih, klinik P3K ringan, meja informasi & minuman hangat',
  },
  {
    id: 'lm-kopi',
    name: 'Rumah Sangrai Mbah Karto',
    subtitle: 'Dapur Kopi & Kriya Bambu',
    elevation: '1.255 mdpl',
    x: 375,
    y: 270,
    facilities: 'Bangku kayu teduh, akses rata dari jalan utama desa',
  },
  {
    id: 'lm-terasering',
    name: 'Gardu Pandang Terasering',
    subtitle: 'Pemandangan Lembah Pagi',
    elevation: '1.275 mdpl',
    x: 330,
    y: 135,
    facilities: '3 gazebo istirahat dengan jarak tiap 250m, pagar pengaman bambu',
  },
  {
    id: 'lm-homestay',
    name: 'Klaster Omah Bambu',
    subtitle: 'Penginapan & Kebun Organik',
    elevation: '1.245 mdpl',
    x: 195,
    y: 120,
    facilities: 'Akses kendaraan antar-tamu langsung sampai gerbang halaman',
  },
  {
    id: 'lm-curug',
    name: 'Curug Kabut & Hutan Pakis',
    subtitle: 'Konservasi Mata Air Timur',
    elevation: '1.340 mdpl',
    x: 505,
    y: 115,
    facilities: 'Pos jagawana, jembatan bambu berpegangan ganda, bangku istirahat',
  },
];

export const VILLAGE_ROUTES: VillageRoute[] = [
  {
    id: 'route-landai',
    name: 'Rute Sapa Desa & Kopi (Tanpa Tangga)',
    distance: '1,1 km pulang-pergi',
    duration: '35 menit santai',
    elevationGain: '+35 m',
    difficulty: 'Datar · Ramah Lansia',
    elderAccessible: true,
    startPoint: 'Area Parkir & Posko',
    endPoint: 'Rumah Sangrai Mbah Karto',
    restStops: '2 gazebo teduh + bangku setiap 200 meter',
    pathCoords: 'M 110 295 Q 175 265 245 235 T 375 270',
    waypointIds: ['lm-parkir', 'lm-pendopo', 'lm-kopi'],
    steps: [
      'Mulai dari Posko Parkir melalui jalan batu andesit rata berlebar 2,5 meter menuju Pendopo Utama (180m).',
      'Beristirahat sejenak di teras Pendopo sambil menikmati pemandangan lembah selatan.',
      'Lanjutkan ke timur menyusuri jalur datar berkanopi pohon alpukat menuju Rumah Sangrai Mbah Karto (370m).',
    ],
  },
  {
    id: 'route-terasering',
    name: 'Lingkar Terasering Pagi & Klaster Homestay',
    distance: '1,8 km melingkar',
    duration: '55 menit santai',
    elevationGain: '+65 m',
    difficulty: 'Landai · Santai',
    elderAccessible: true,
    startPoint: 'Pendopo Utama Lereng Asri',
    endPoint: 'Klaster Omah Bambu',
    restStops: '3 gazebo pandang & 1 warung jamu',
    pathCoords: 'M 245 235 Q 295 180 330 135 Q 260 110 195 120 Q 210 185 245 235',
    waypointIds: ['lm-pendopo', 'lm-terasering', 'lm-homestay'],
    steps: [
      'Dari sisi utara Pendopo Utama, ikuti papan penunjuk kayu bertuliskan "Gardu Terasering".',
      'Jalur berupa paving batu bertekstur anti-selip dengan kemiringan landai menuju Gardu Pandang.',
      'Pulang memutar melewati Kebun Organik dan Klaster Omah Bambu dengan kontur menurun perlahan.',
    ],
  },
  {
    id: 'route-curug',
    name: 'Jalur Konservasi Hutan Pakis ke Curug Kabut',
    distance: '2,6 km pulang-pergi',
    duration: '1 jam 45 menit',
    elevationGain: '+130 m',
    difficulty: 'Menanjak Ringan',
    elderAccessible: false,
    startPoint: 'Rumah Sangrai Mbah Karto',
    endPoint: 'Curug Kabut & Hutan Pakis',
    restStops: 'Pos Jagawana & jembatan kayu sungai',
    pathCoords: 'M 375 270 Q 430 215 445 170 T 505 115',
    waypointIds: ['lm-kopi', 'lm-curug'],
    steps: [
      'Dari Rumah Sangrai, ikuti jalan setapak menuju gerbang Hutan Konservasi di sisi timur.',
      'Terdapat 42 anak tangga batu berpegangan bambu ganda; disarankan memakai sepatu bergerigi.',
      'Tiba di kolam jernih Curug Kabut; tersedia pos istirahat kayu sebelum kembali lewat jalur yang sama.',
    ],
  },
];

export const GUEST_STORIES: GuestStory[] = [
  {
    id: 'rev-1',
    name: 'Hendra Wijaya & Keluarga',
    origin: 'Surabaya · 3 Generasi (Usia 6–71 tahun)',
    packageUsed: 'Paket Seharian Guyub Desa + Paviliun Jati',
    quote:
      'Awalnya kami ragu membawa Ibu yang memakai tongkat ke desa pegunungan. Ternyata jalur dari parkir ke pendopo hingga kamar lantai dasar rata dan berpagar aman, bahkan mobil desa siap mengantar saat Ibu lelah.',
  },
  {
    id: 'rev-2',
    name: 'Ratna Kusumawati',
    origin: 'Yogyakarta · Rombongan Komunitas Kebun',
    packageUsed: 'Sangrai Kopi Kuali Tanah & Workshop Bambu',
    quote:
      'Semua keterangan harga dan susunan acara jelas sejak awal, tanpa biaya tambahan mendadak. Mbah Karto dan Ibu Wati mengajar dengan sabar dan hangat seperti keluarga sendiri.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
