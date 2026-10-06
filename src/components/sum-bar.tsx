"use client";

import { useEffect, useState } from "react";
import { CARS } from "@/lib/cars";
import { fmtD, idr } from "@/lib/pricing";
import { useBooking } from "./booking-context";

export function SumBar() {
  const b = useBooking();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("pesan");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pool = CARS.filter((c) => c.seat >= b.pax);
  const min = pool.reduce((a, c) => (b.q(c).total < b.q(a).total ? c : a), pool[0]);
  const k = b.q(min);

  return (
    <div className={`sumbar${show ? " show" : ""}`} aria-hidden={!show}>
      <div className="wrap">
        <div className="txt"><b>{b.svc === "sopir" ? "Dengan sopir" : "Lepas kunci"}</b> · {fmtD(b.d1)} – {fmtD(b.d2)} ({k.days} hari) · mulai <b>{idr(k.total)}</b></div>
        <a className="btn sm solid" href="#pesan" tabIndex={show ? 0 : -1}>Ubah</a>
      </div>
    </div>
  );
}
