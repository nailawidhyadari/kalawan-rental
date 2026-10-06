"use client";

import Image from "next/image";
import { useMemo } from "react";
import { CARS, CATS, NEEDS } from "@/lib/cars";
import { DRIVER, idr } from "@/lib/pricing";
import { useBooking } from "./booking-context";
import { CarArt } from "./car-art";

export function Fleet() {
  const b = useBooking();
  const picks = useMemo(() => (b.need ? NEEDS[b.need].pick : []), [b.need]);

  const items = useMemo(() => {
    const list = CARS.filter((c) => (b.cat === "Semua" || c.cat === b.cat) && (!b.trans || c.trans === b.trans) && c.seat >= b.pax);
    list.sort((x, y) => (b.sort === "price" ? x.price - y.price : y.seat - x.seat || x.price - y.price));
    if (b.need) list.sort((x, y) => Number(picks.includes(y.id)) - Number(picks.includes(x.id)));
    return list;
  }, [b.cat, b.trans, b.sort, b.pax, b.need, picks]);

  return (
    <>
      <div className="sh" style={{ marginBottom: 12 }}>
        <h2>Armada</h2>
        <p>{b.need ? NEEDS[b.need].msg : "Harga per hari, sudah termasuk asuransi dasar. Total di kanan dihitung dari tanggal yang Anda pilih."}</p>
      </div>

      <div className="filters">
        <div className="chips" role="group" aria-label="Kategori">
          {CATS.map((c) => <button key={c} className="chip" aria-pressed={b.cat === c} onClick={() => b.setCat(c)}>{c}</button>)}
        </div>
        <label className="mono" htmlFor="trans">Transmisi</label>
        <select id="trans" value={b.trans} onChange={(e) => b.setTrans(e.target.value)}>
          <option value="">Semua</option><option>Matic</option><option>Manual</option>
        </select>
        <label className="mono" htmlFor="sort">Urutkan</label>
        <select id="sort" value={b.sort} onChange={(e) => b.setSort(e.target.value as "price" | "seat")}>
          <option value="price">Harga terendah</option><option value="seat">Kursi terbanyak</option>
        </select>
        <span className="mono count">{items.length} dari {CARS.length} mobil</span>
      </div>

      <div>
        {items.map((c, i) => {
          const k = b.q(c);
          const rec = picks.includes(c.id);
          return (
            <article className="car" key={c.id}>
              <div className={`pic${b.photos[c.id] ? " has-photo" : ""}`}>
                <span className="mono idx">{String(i + 1).padStart(2, "0")}</span>
                {rec ? <span className="badge rec">Cocok untuk Anda</span> : c.stock === "low" ? <span className="badge warn">Tersisa 1 unit</span> : <span className="badge ok">Tersedia</span>}
                {b.photos[c.id]
                  ? <Image src={`/cars/${c.id}.jpg`} alt={c.name} fill sizes="(max-width: 680px) 100vw, (max-width: 1020px) 50vw, 40vw" />
                  : <CarArt type={c.type} />}
              </div>
              <div>
                <p className="mono">{c.cat} · {c.year}</p>
                <h3>{c.name}</h3>
                <div className="specs"><span><b>{c.seat}</b> kursi</span><span><b>{c.trans}</b></span><span><b>{c.bags}</b></span><span><b>{c.fuel}</b></span></div>
                <p className="desc">{c.desc}</p>
              </div>
              <div className="buy">
                <div>
                  <p className="per"><b>{idr(c.price)}</b>per hari{b.svc === "sopir" ? ` + sopir ${idr(DRIVER)}` : ""}</p>
                  <p className="tot">Total {k.days} hari{k.disc ? " (sudah diskon)" : ""}<b>{idr(k.total)}</b></p>
                </div>
                <div className="acts">
                  <button className="btn solid sm" onClick={() => b.setCur(c)}>Pilih mobil</button>
                  <label className="cmp"><input type="checkbox" checked={b.cmp.includes(c.id)} onChange={() => b.toggleCmp(c.id)} /> Bandingkan</label>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {items.length === 0 && <p className="empty" style={{ display: "block" }}>Tidak ada mobil yang cocok dengan filter ini. Coba ubah kategori atau jumlah penumpang.</p>}

      <CompareBar />
    </>
  );
}

function CompareBar() {
  const b = useBooking();
  const n = b.cmp.length;
  return (
    <div className={`cmpbar${n > 0 ? " show" : ""}`}>
      <span>{n} mobil dipilih{n < 2 ? " · pilih satu lagi" : ""}</span>
      <button className="btn sm" disabled={n < 2} style={{ opacity: n < 2 ? 0.45 : 1 }} onClick={() => b.setShowCmp(true)}>Bandingkan</button>
      <button className="btn sm ghost" onClick={b.clearCmp}>Reset</button>
    </div>
  );
}
