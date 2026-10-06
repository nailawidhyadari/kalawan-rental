// Mengubah foto asli di folder `photos/` (nama file = id mobil, mis. avanza.jpg / avanza.png)
// menjadi JPG 1600px yang ringan di `public/cars/`. Jalankan: npm run photos
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const IDS = ["agya", "avanza", "xpander", "innova", "fortuner", "camry", "alphard", "hiace"];
const SRC = "photos", OUT = "public/cars";
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const done = new Set();
for (const f of files) {
  const id = path.parse(f).name.toLowerCase();
  if (!IDS.includes(id)) { console.log(`lewati ${f}: nama harus salah satu dari ${IDS.join(", ")}`); continue; }
  const info = await sharp(path.join(SRC, f)).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${id}.jpg`));
  console.log(`ok ${id}.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  done.add(id);
}
const missing = IDS.filter((id) => !done.has(id));
if (missing.length) console.log(`\nBelum ada foto: ${missing.join(", ")} (memakai gambar garis sebagai cadangan)`);
