export type CarType = "hatch" | "sedan" | "mpv" | "suv" | "van";
export type Service = "lepas" | "sopir";

export type Car = {
  id: string;
  name: string;
  cat: string;
  type: CarType;
  seat: number;
  bags: string;
  trans: "Matic" | "Manual";
  fuel: string;
  year: number;
  price: number;
  stock: "ok" | "low";
  desc: string;
};

export const CARS: Car[] = [
  { id: "agya", name: "Toyota Agya", cat: "Hatchback", type: "hatch", seat: 5, bags: "1 koper", trans: "Matic", fuel: "Bensin", year: 2023, price: 300000, stock: "ok", desc: "Lincah untuk dalam kota dan parkir sempit." },
  { id: "avanza", name: "Toyota Avanza", cat: "MPV", type: "mpv", seat: 7, bags: "2 koper", trans: "Manual", fuel: "Bensin", year: 2022, price: 450000, stock: "ok", desc: "Pilihan paling umum untuk keluarga dan wisata." },
  { id: "xpander", name: "Mitsubishi Xpander", cat: "MPV", type: "mpv", seat: 7, bags: "3 koper", trans: "Matic", fuel: "Bensin", year: 2023, price: 550000, stock: "low", desc: "Kabin lega dan suspensi empuk untuk jarak jauh." },
  { id: "innova", name: "Toyota Innova Zenix", cat: "MPV", type: "mpv", seat: 7, bags: "4 koper", trans: "Matic", fuel: "Hybrid", year: 2024, price: 850000, stock: "ok", desc: "Baris kedua captain seat, senyap, irit." },
  { id: "fortuner", name: "Toyota Fortuner VRZ", cat: "SUV", type: "suv", seat: 7, bags: "3 koper", trans: "Matic", fuel: "Diesel", year: 2023, price: 1100000, stock: "low", desc: "Bertenaga di tanjakan, nyaman di jalan rusak." },
  { id: "camry", name: "Toyota Camry", cat: "Sedan", type: "sedan", seat: 5, bags: "3 koper", trans: "Matic", fuel: "Bensin", year: 2022, price: 1250000, stock: "ok", desc: "Untuk tamu penting dan agenda formal." },
  { id: "alphard", name: "Toyota Alphard", cat: "Premium", type: "mpv", seat: 7, bags: "4 koper", trans: "Matic", fuel: "Bensin", year: 2023, price: 2400000, stock: "ok", desc: "Kelas tertinggi. Pintu geser elektrik, kursi kapten." },
  { id: "hiace", name: "Toyota Hiace Commuter", cat: "Van", type: "van", seat: 15, bags: "8 koper", trans: "Manual", fuel: "Diesel", year: 2022, price: 1300000, stock: "ok", desc: "Satu kendaraan untuk rombongan sampai 15 orang." },
];

export const CATS = ["Semua", "Hatchback", "MPV", "SUV", "Sedan", "Van", "Premium"] as const;

export type NeedKey = "keluarga" | "dinas" | "wisata" | "rombongan" | "acara";

export const NEEDS: Record<NeedKey, { title: string; hint: string; pax: number; pick: string[]; msg: string }> = {
  keluarga: { title: "Keluarga, 6 orang", hint: "Nyaman, bagasi cukup", pax: 5, pick: ["avanza", "xpander", "innova"], msg: "Untuk 6 orang dengan bagasi, MPV 7 kursi paling pas." },
  dinas: { title: "Perjalanan dinas", hint: "Rapi, tenang, tepat waktu", pax: 1, pick: ["camry", "innova"], msg: "Untuk perjalanan dinas, kami tandai yang paling rapi dan senyap." },
  wisata: { title: "Wisata luar kota", hint: "Kuat di tanjakan dan jarak jauh", pax: 5, pick: ["fortuner", "innova", "xpander"], msg: "Untuk jarak jauh dan jalur menanjak, SUV dan MPV bertenaga lebih aman." },
  rombongan: { title: "Rombongan 12+", hint: "Satu kendaraan untuk semua", pax: 13, pick: ["hiace"], msg: "Untuk 12 orang ke atas, satu Hiace lebih hemat dari dua mobil." },
  acara: { title: "Pernikahan & acara", hint: "Tampil terhormat", pax: 1, pick: ["alphard", "camry"], msg: "Untuk pernikahan dan acara, tampilan menjadi prioritas." },
};
