"use client";

import { useState } from "react";
import { CARS, type CarType } from "@/lib/cars";
import { idr } from "@/lib/pricing";
import { useBooking } from "./booking-context";
import { SHAPES } from "./car-art";

type Spec = { type: CarType; label: string; cat: string; model: string; len: number; hgt: number; seats: string; bags: string; top: number; use: string };

const SPECS: Spec[] = [
  { type: "hatch", label: "Hatchback", cat: "Hatchback", model: "Toyota Agya", len: 3760, hgt: 1520, seats: "4–5", bags: "1 koper", top: 52, use: "Dalam kota, parkir sempit" },
  { type: "sedan", label: "Sedan", cat: "Sedan", model: "Toyota Camry", len: 4885, hgt: 1445, seats: "5", bags: "3 koper", top: 52, use: "Tamu penting, agenda formal" },
  { type: "mpv", label: "MPV", cat: "MPV", model: "Toyota Avanza", len: 4395, hgt: 1700, seats: "7", bags: "2–4 koper", top: 44, use: "Keluarga dan wisata" },
  { type: "suv", label: "SUV", cat: "SUV", model: "Toyota Fortuner", len: 4795, hgt: 1835, seats: "7", bags: "3 koper", top: 46, use: "Tanjakan dan jarak jauh" },
  { type: "van", label: "Van", cat: "Van", model: "Toyota Hiace Commuter", len: 5380, hgt: 2285, seats: "15", bags: "8 koper", top: 46, use: "Rombongan besar" },
];

// Skala gambar: 1 px = 13,3 mm. Semua mobil digambar dengan perbandingan ukuran aslinya.
const K = 0.075;
const GROUND = 226;
const WHEEL = 24;
const CX = 290;
const BODY: Record<CarType, [number, number]> = { hatch: [26, 378], sedan: [20, 384], mpv: [22, 384], suv: [20, 386], van: [16, 388] };
const mm = (n: number) => n.toLocaleString("id-ID") + " mm";

function geom(s: Spec) {
  const L = s.len * K, H = s.hgt * K;
  const ox = CX - L / 2, cy = GROUND - WHEEL;
  const [x0, x1] = BODY[s.type];
  const sx = L / (x1 - x0), sy = (H - WHEEL) / (118 - s.top);
  return { L, H, ox, cy, sx, sy, tx: ox - x0 * sx, ty: cy - 118 * sy, w1: ox + L * 0.2, w2: ox + L * 0.78 };
}

export function HeroCar() {
  const b = useBooking();
  const [i, setI] = useState(3);
  const s = SPECS[i];
  const g = geom(s);
  const from = Math.min(...CARS.filter((c) => c.type === s.type).map((c) => c.price));
  const next = () => setI((v) => (v + 1) % SPECS.length);

  const dimY = GROUND - g.H - 24;
  const hx = g.ox + g.L + 26;

  return (
    <div className="drawing hero-car">
      <div className="hc-top">
        <span className="mono">Ukuran asli, skala sama</span>
        <span className="mono hc-hint">Ketuk mobil untuk ganti jenis</span>
      </div>

      <div className="hc-stage" role="button" tabIndex={0} aria-label={`Jenis mobil: ${s.label}. Tekan untuk ganti jenis.`}
        onClick={next} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } }}>
        <svg viewBox="0 0 580 262" fill="none" stroke="#efe6d6" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          {/* garis ukuran */}
          <g fill="#6b6155" stroke="none">
            <rect className="dim" width="1" height="1" style={{ transform: `translate(${g.ox}px, ${dimY}px) scale(${g.L}, 1)` }} />
            <rect className="dim" width="1" height="1" style={{ transform: `translate(${g.ox}px, ${dimY - 5}px) scale(1, 11)` }} />
            <rect className="dim" width="1" height="1" style={{ transform: `translate(${g.ox + g.L}px, ${dimY - 5}px) scale(1, 11)` }} />
            <rect className="dim" width="1" height="1" style={{ transform: `translate(${hx}px, ${GROUND - g.H}px) scale(1, ${g.H})` }} />
            <rect className="dim" width="1" height="1" style={{ transform: `translate(${hx - 5}px, ${GROUND - g.H}px) scale(11, 1)` }} />
            <rect className="dim" width="1" height="1" style={{ transform: `translate(${hx - 5}px, ${GROUND}px) scale(11, 1)` }} />
          </g>
          <text className="dim" x="0" y="0" fill="#a79d8e" stroke="none" fontFamily="var(--mono)" fontSize="11" textAnchor="middle" style={{ transform: `translate(${CX}px, ${dimY - 9}px)` }}>{mm(s.len)}</text>
          <text className="dim" x="0" y="0" fill="#a79d8e" stroke="none" fontFamily="var(--mono)" fontSize="11" textAnchor="middle" style={{ transform: `translate(${hx}px, ${GROUND - g.H - 10}px)` }}>{mm(s.hgt)}</text>
          <line x1="20" y1={GROUND} x2="560" y2={GROUND} stroke="#3a332d" />

          {/* semua jenis digambar, hanya yang aktif terlihat */}
          {SPECS.map((sp, k) => {
            const m = geom(sp), sh = SHAPES[sp.type];
            return (
              <g key={sp.type} className="layer" style={{ opacity: k === i ? 1 : 0 }}>
                <g transform={`matrix(${m.sx} 0 0 ${m.sy} ${m.tx} ${m.ty})`}>
                  <path vectorEffect="non-scaling-stroke" d={sh.body} />
                  <path vectorEffect="non-scaling-stroke" d={sh.win} stroke="#d08a5b" strokeWidth="1.2" />
                </g>
                {[m.w1, m.w2].map((x) => (
                  <g key={x}>
                    <circle cx={x} cy={m.cy} r={WHEEL + 5} fill="#14110f" stroke="none" />
                    <circle cx={x} cy={m.cy} r={WHEEL} /><circle cx={x} cy={m.cy} r="10" stroke="#d08a5b" />
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="chips hc-chips" role="group" aria-label="Jenis mobil">
        {SPECS.map((sp, k) => <button key={sp.type} className="chip" aria-pressed={k === i} onClick={() => setI(k)}>{sp.label}</button>)}
      </div>

      <div className="hc-info" key={s.type}>
        <div><span>Contoh</span><b>{s.model}</b></div>
        <div><span>Kursi</span><b>{s.seats} orang</b></div>
        <div><span>Bagasi</span><b>{s.bags}</b></div>
        <div><span>Mulai dari</span><b>{idr(from)}<small>/hari</small></b></div>
      </div>
      <div className="hc-foot">
        <p>{s.use}.</p>
        <button className="btn sm" onClick={() => { b.setCat(s.cat); document.getElementById("armada")?.scrollIntoView(); }}>Lihat {s.label} tersedia</button>
      </div>
    </div>
  );
}
