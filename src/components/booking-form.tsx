"use client";

import { CARS } from "@/lib/cars";
import { idr, iso } from "@/lib/pricing";
import { useBooking } from "./booking-context";

const HOURS = Array.from({ length: 15 }, (_, i) => `${String(i + 7).padStart(2, "0")}.00`);

export function BookingForm() {
  const b = useBooking();
  const pool = CARS.filter((c) => c.seat >= b.pax);
  const cheapest = pool.reduce((a, c) => (b.q(c).total < b.q(a).total ? c : a), pool[0]);
  const est = b.q(cheapest);
  const today = iso(new Date());

  return (
    <form className="book" id="pesan" onSubmit={(e) => e.preventDefault()} aria-label="Pemesanan">
      <h2>Cek harga dan ketersediaan</h2>
      <p className="sub">Total diperbarui otomatis di daftar mobil.</p>

      <div className="seg" role="group" aria-label="Jenis layanan">
        <button type="button" aria-pressed={b.svc === "lepas"} onClick={() => b.setSvc("lepas")}>Lepas kunci<small>Anda yang menyetir</small></button>
        <button type="button" aria-pressed={b.svc === "sopir"} onClick={() => b.setSvc("sopir")}>Dengan sopir<small>Sopir berpengalaman</small></button>
      </div>

      <div className="row2">
        <label className="fld"><span>Tanggal ambil</span><input type="date" suppressHydrationWarning value={b.d1} min={today} onChange={(e) => e.target.value && b.setD1(e.target.value)} /></label>
        <label className="fld"><span>Jam</span>
          <select value={b.time} onChange={(e) => b.setTime(e.target.value)}>{HOURS.map((h) => <option key={h}>{h}</option>)}</select></label>
      </div>
      <label className="fld"><span>Tanggal kembali</span><input type="date" suppressHydrationWarning value={b.d2} min={b.d1 || today} onChange={(e) => e.target.value && b.setD2(e.target.value)} /></label>

      <label className="fld"><span>Jumlah penumpang</span>
        <select value={b.pax} onChange={(e) => b.setPax(+e.target.value)}>
          <option value={1}>1–4 orang</option><option value={5}>5–7 orang</option><option value={8}>8–12 orang</option><option value={13}>13–15 orang</option>
        </select></label>

      <label className="check"><input type="checkbox" checked={b.deliver} onChange={(e) => b.setDeliver(e.target.checked)} /><span>Antar ke bandara / stasiun / hotel<br /><small style={{ color: "#6b6155" }}>Tambah Rp 100.000 sekali antar</small></span></label>

      <div className="estimate"><span className="lbl">Mulai dari · {est.days} hari</span><b>{idr(est.total)}</b></div>
      <button className="btn" type="button" onClick={() => document.getElementById("armada")?.scrollIntoView()}>Lihat mobil yang tersedia</button>
      <p className="note">Sewa 7 hari atau lebih dapat potongan 10%.</p>
    </form>
  );
}
