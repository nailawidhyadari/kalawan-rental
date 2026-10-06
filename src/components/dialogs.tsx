"use client";

import { useEffect, useRef, useState } from "react";
import { CARS } from "@/lib/cars";
import { DEPOSIT, DRIVER, fmtD, idr } from "@/lib/pricing";
import { waLink } from "@/lib/site";
import { useBooking } from "./booking-context";

function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const props = {
    ref,
    onClose,
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => { if (e.target === ref.current) ref.current?.close(); },
  };
  return props;
}

export function BookingDrawer() {
  const b = useBooking();
  const [name, setName] = useState("");
  const dlg = useDialog(!!b.cur, () => b.setCur(null));
  // simpan mobil terakhir agar isi panel tidak hilang saat animasi tutup
  const car = b.cur;
  const k = car ? b.q(car) : null;
  const svcLabel = b.svc === "sopir" ? "dengan sopir" : "lepas kunci";

  const text = car && k
    ? `Halo Kalawan, saya ${name.trim() || "(nama)"} mau sewa ${car.name} (${svcLabel}).\nAmbil: ${fmtD(b.d1)} jam ${b.time}\nKembali: ${fmtD(b.d2)} (${k.days} hari)\n${b.deliver ? "Minta diantar ke lokasi.\n" : ""}Estimasi total: ${idr(k.total)}\nMohon konfirmasi ketersediaan.`
    : "";

  async function copy() {
    try { await navigator.clipboard.writeText(text); b.toast("Ringkasan disalin"); } catch { b.toast("Tidak bisa menyalin"); }
  }

  return (
    <dialog className="drawer" aria-labelledby="dTitle" {...dlg}>
      {car && k && (
        <>
          <div className="dhead">
            <div><p className="mono">{car.cat} · {b.svc === "sopir" ? "Dengan sopir" : "Lepas kunci"}</p><h3 id="dTitle">{car.name}</h3></div>
            <button className="x" onClick={() => b.setCur(null)} aria-label="Tutup">×</button>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>{fmtD(b.d1)} {b.time} → {fmtD(b.d2)}, {k.days} hari</p>
          <div className="lines">
            <div><span>Sewa {idr(car.price)} × {k.days} hari</span><span>{idr(k.base)}</span></div>
            {k.disc > 0 && <div className="disc"><span>Diskon sewa 7 hari+ (10%)</span><span>− {idr(k.disc)}</span></div>}
            {k.drv > 0 && <div><span>Sopir {idr(DRIVER)} × {k.days} hari</span><span>{idr(k.drv)}</span></div>}
            {k.del > 0 && <div><span>Antar ke lokasi Anda</span><span>{idr(k.del)}</span></div>}
            {b.svc === "lepas" && <div><span>Deposit (dikembalikan)</span><span>{idr(DEPOSIT)}</span></div>}
            <div className="total"><span>Total sewa</span><span>{idr(k.total)}</span></div>
          </div>
          <label className="fld"><span>Nama Anda</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" autoComplete="name" /></label>
          <a className="btn solid" href={waLink(text)} target="_blank" rel="noopener noreferrer">Pesan lewat WhatsApp</a>
          <button className="btn copy" type="button" onClick={copy}>Salin ringkasan</button>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12 }}>Belum ada pembayaran. Pesan Anda dikirim ke admin untuk dikonfirmasi ketersediaannya.</p>
        </>
      )}
    </dialog>
  );
}

export function CompareDialog() {
  const b = useBooking();
  const dlg = useDialog(b.showCmp, () => b.setShowCmp(false));
  const cs = b.cmp.map((id) => CARS.find((c) => c.id === id)!).filter(Boolean);
  const ks = cs.map((c) => b.q(c));
  const minP = Math.min(...ks.map((k) => k.total));
  const maxS = Math.max(...cs.map((c) => c.seat));

  return (
    <dialog className="modal" aria-labelledby="cmpTitle" {...dlg}>
      <div className="dhead"><h3 id="cmpTitle">Perbandingan</h3><button className="x" onClick={() => b.setShowCmp(false)} aria-label="Tutup">×</button></div>
      {b.showCmp && cs.length > 0 && (
        <div className="cmpwrap">
          <table className="cmpt">
            <thead><tr><th />{cs.map((c) => <th key={c.id}>{c.name}</th>)}</tr></thead>
            <tbody>
              <tr><th>Kategori</th>{cs.map((c) => <td key={c.id}>{c.cat}</td>)}</tr>
              <tr><th>Kursi</th>{cs.map((c) => <td key={c.id} className={c.seat === maxS ? "best" : ""}>{c.seat}</td>)}</tr>
              <tr><th>Bagasi</th>{cs.map((c) => <td key={c.id}>{c.bags}</td>)}</tr>
              <tr><th>Transmisi</th>{cs.map((c) => <td key={c.id}>{c.trans}</td>)}</tr>
              <tr><th>Bahan bakar</th>{cs.map((c) => <td key={c.id}>{c.fuel}</td>)}</tr>
              <tr><th>Tahun</th>{cs.map((c) => <td key={c.id}>{c.year}</td>)}</tr>
              <tr><th>Harga per hari</th>{cs.map((c) => <td key={c.id}>{idr(c.price)}</td>)}</tr>
              <tr><th>Total {ks[0].days} hari</th>{cs.map((c, i) => <td key={c.id} className={ks[i].total === minP ? "best" : ""}>{idr(ks[i].total)}</td>)}</tr>
              <tr><th />{cs.map((c) => <td key={c.id}><button className="btn solid sm" onClick={() => { b.setShowCmp(false); b.setCur(c); }}>Pilih</button></td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
    </dialog>
  );
}
