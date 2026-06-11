// Data Pengguna untuk Login
var dataPengguna = [
  {
    id: 1,
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    password: "rina123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta",
  },
  {
    id: 2,
    nama: "Agus Pranoto",
    email: "agus@ut.ac.id",
    password: "agus123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Makassar",
  },
  {
    id: 3,
    nama: "Siti Marlina",
    email: "siti@ut.ac.id",
    password: "siti123",
    role: "Puslaba",
    lokasi: "Pusat",
  },
  {
    id: 4,
    nama: "Doni Setiawan",
    email: "doni@ut.ac.id",
    password: "doni123",
    role: "Fakultas",
    lokasi: "FISIP",
  },
  {
    id: 5,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat",
  },
];

// Data UPBJJ UT
var upbjjList = [
  "UPBJJ Jakarta",
  "UPBJJ Bandung",
  "UPBJJ Semarang",
  "UPBJJ Surabaya",
  "UPBJJ Makassar",
  "UPBJJ Medan",
  "UPBJJ Palembang",
  "UPBJJ Yogyakarta",
];

// Data Kategori Mata Kuliah
var kategoriBahanAjar = [
  "Matematika",
  "Sains",
  "Manajemen",
  "Komunikasi",
  "Pendidikan",
  "Hukum",
  "Teknik",
];

// Data Bahan Ajar - Enhanced dengan semua field yang diperlukan
var dataBahanAjar = [
  {
    id: 1,
    kode: "ASIP4301",
    judul: "Pengantar Ilmu Komunikasi",
    kategori: "Komunikasi",
    upbjj: "UPBJJ Jakarta",
    lokasiRak: "Rak A-01",
    qty: 548,
    safety: 100,
    status: "Aman",
    catatanHTML: "Stok mencukupi, edisi terbaru",
    cover: "assets/pengantar_komunikasi.jpg",
  },
  {
    id: 2,
    kode: "EKMA4216",
    judul: "Manajemen Keuangan",
    kategori: "Manajemen",
    upbjj: "UPBJJ Jakarta",
    lokasiRak: "Rak B-02",
    qty: 392,
    safety: 80,
    status: "Aman",
    catatanHTML: "Edisi ke-3, rekomendasi untuk pengajaran",
    cover: "assets/manajemen_keuangan.jpg",
  },
  {
    id: 3,
    kode: "EKMA4310",
    judul: "Kepemimpinan",
    kategori: "Manajemen",
    upbjj: "UPBJJ Bandung",
    lokasiRak: "Rak C-03",
    qty: 45,
    safety: 60,
    status: "Menipis",
    catatanHTML: "Perlu reorder segera",
    cover: "assets/kepemimpinan.jpg",
  },
  {
    id: 4,
    kode: "BIOL4211",
    judul: "Mikrobiologi Dasar",
    kategori: "Sains",
    upbjj: "UPBJJ Semarang",
    lokasiRak: "Rak D-01",
    qty: 0,
    safety: 50,
    status: "Kosong",
    catatanHTML: "Stok kosong, perlu pemesanan segera",
    cover: "assets/mikrobiologi.jpg",
  },
  {
    id: 5,
    kode: "PAUD4401",
    judul: "Perkembangan Anak Usia Dini",
    kategori: "Pendidikan",
    upbjj: "UPBJJ Surabaya",
    lokasiRak: "Rak E-04",
    qty: 204,
    safety: 70,
    status: "Aman",
    catatanHTML: "Koleksi favorit, permintaan tinggi",
    cover: "assets/paud_perkembangan.jpeg",
  },
  {
    id: 6,
    kode: "ISIP4215",
    judul: "Hukum Perdata",
    kategori: "Hukum",
    upbjj: "UPBJJ Makassar",
    lokasiRak: "Rak F-02",
    qty: 125,
    safety: 60,
    status: "Aman",
    catatanHTML: "Edisi baru tersedia",
    cover: "assets/hukum_perdata.jpg",
  },
  {
    id: 7,
    kode: "MATA4101",
    judul: "Kalkulus I",
    kategori: "Matematika",
    upbjj: "UPBJJ Bandung",
    lokasiRak: "Rak G-01",
    qty: 25,
    safety: 50,
    status: "Menipis",
    catatanHTML: "Demand tinggi dari mahasiswa teknik",
    cover: "assets/kalkulus1.jpg",
  },
  {
    id: 8,
    kode: "SOSI4101",
    judul: "Dasar-dasar Sosiologi",
    kategori: "Sains",
    upbjj: "UPBJJ Yogyakarta",
    lokasiRak: "Rak H-03",
    qty: 310,
    safety: 80,
    status: "Aman",
    catatanHTML: "Populer di antara mahasiswa baru",
    cover: "assets/sosiologi.jpg",
  },
];

// Data Pengiriman / Ekspedisi
var pengirimanList = [
  { kode: "JNE-REG", nama: "JNE Regular (3-5 hari)" },
  { kode: "JNE-EXP", nama: "JNE Express (1-2 hari)" },
  { kode: "POS", nama: "Pos Indonesia (5-7 hari)" },
  { kode: "TIKI", nama: "TIKI (3-5 hari)" },
];

// Data Paket Bahan Ajar
var paketBahanAjar = [
  {
    kode: "PAKET-001",
    nama: "PAKET Manajemen Dasar",
    isi: ["EKMA4216", "EKMA4310"],
    harga: 125000,
  },
  {
    kode: "PAKET-002",
    nama: "PAKET Sains Dasar",
    isi: ["BIOL4211", "SOSI4101"],
    harga: 155000,
  },
  {
    kode: "PAKET-003",
    nama: "PAKET Ilmu Sosial",
    isi: ["ASIP4301", "ISIP4215"],
    harga: 145000,
  },
  {
    kode: "PAKET-004",
    nama: "PAKET Pendidikan",
    isi: ["PAUD4401", "MATA4101"],
    harga: 165000,
  },
];

// Data Tracking Pengiriman
var dataTracking = {
  "DO2025-001": {
    nomorDO: "DO2025-001",
    nim: "123456789",
    nama: "Rina Wulandari",
    status: "Dalam Perjalanan",
    ekspedisi: "JNE-REG",
    tanggalKirim: "2025-05-20",
    paketKode: "PAKET-001",
    total: 125000,
    perjalanan: [
      {
        waktu: "2025-05-20 10:12:20",
        keterangan:
          "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka",
      },
      {
        waktu: "2025-05-20 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN",
      },
      {
        waktu: "2025-05-20 16:30:10",
        keterangan: "Diteruskan ke Kantor Jakarta Selatan",
      },
    ],
  },
  "DO2025-002": {
    nomorDO: "DO2025-002",
    nim: "987654321",
    nama: "Agus Pranoto",
    status: "Selesai",
    ekspedisi: "JNE-EXP",
    tanggalKirim: "2025-05-19",
    paketKode: "PAKET-002",
    total: 155000,
    perjalanan: [
      {
        waktu: "2025-05-19 09:00:00",
        keterangan:
          "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka",
      },
      {
        waktu: "2025-05-19 12:30:00",
        keterangan: "Tiba di Hub: TANGERANG SELATAN",
      },
      {
        waktu: "2025-05-19 18:00:00",
        keterangan: "Tiba di Hub: BANDUNG",
      },
      {
        waktu: "2025-05-20 08:00:00",
        keterangan: "Dalam pengiriman",
      },
      {
        waktu: "2025-05-20 16:45:00",
        keterangan: "Selesai Antar. Penerima: Agus Pranoto",
      },
    ],
  },
};
