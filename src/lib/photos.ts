import "server-only";
import fs from "node:fs";
import path from "node:path";
import { CARS } from "./cars";

// Membaca public/cars saat build: mobil yang punya foto memakai foto, sisanya memakai gambar garis.
export function getPhotos(): Record<string, boolean> {
  const dir = path.join(process.cwd(), "public", "cars");
  return Object.fromEntries(CARS.map((c) => [c.id, fs.existsSync(path.join(dir, `${c.id}.jpg`))]));
}
