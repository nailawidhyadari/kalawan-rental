"use client";

import { useState, useSyncExternalStore } from "react";

function subscribeMinute(cb: () => void) {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
}
function isOpenNow() {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => +(p.find((x) => x.type === t)?.value ?? 0);
  const mins = (get("hour") % 24) * 60 + get("minute");
  return mins >= 420 && mins < 1260;
}

export function OpenStatus() {
  const open = useSyncExternalStore<boolean | null>(subscribeMinute, isOpenNow, () => null);
  const cls = open === null ? "" : open ? " open" : " closed";
  return (
    <p className={`state${cls}`}>
      <i />
      <span>{open === null ? "Buka setiap hari 07.00 – 21.00 WIB" : open ? "Buka sekarang · tutup pukul 21.00 WIB" : "Tutup sekarang · buka pukul 07.00 WIB. Pesan tetap bisa lewat WhatsApp."}</span>
    </p>
  );
}

const DOCS = {
  lepas: ["KTP asli pemakai (sesuai SIM)", "SIM A yang masih berlaku", "Kartu keluarga atau identitas kedua", "Deposit Rp 500.000, dikembalikan saat mobil kembali", "Nomor kerabat yang bisa dihubungi", "Usia minimal 21 tahun"],
  sopir: ["Tidak perlu jaminan dokumen", "Nama dan nomor WhatsApp pemesan", "Titik jemput dan rencana rute", "Uang muka 30% untuk mengunci unit", "Beri tahu bila lewat 12 jam atau menginap"],
};

export function DocsTabs() {
  const [k, setK] = useState<"lepas" | "sopir">("lepas");
  return (
    <>
      <div className="docs" role="group" aria-label="Pilih layanan">
        <button type="button" aria-pressed={k === "lepas"} onClick={() => setK("lepas")}>Lepas kunci</button>
        <button type="button" aria-pressed={k === "sopir"} onClick={() => setK("sopir")}>Dengan sopir</button>
      </div>
      <ul className="doclist">{DOCS[k].map((t) => <li key={t}>{t}</li>)}</ul>
    </>
  );
}
