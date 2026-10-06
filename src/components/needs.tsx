"use client";

import { NEEDS, type NeedKey } from "@/lib/cars";
import { useBooking } from "./booking-context";

export function Needs() {
  const b = useBooking();
  return (
    <div className="needs">
      {(Object.keys(NEEDS) as NeedKey[]).map((k) => (
        <button key={k} className="need" aria-pressed={b.need === k} onClick={() => {
          const turningOn = b.need !== k;
          b.toggleNeed(k);
          if (turningOn) document.getElementById("armada")?.scrollIntoView();
        }}>
          <b>{NEEDS[k].title}</b><span>{NEEDS[k].hint}</span>
        </button>
      ))}
    </div>
  );
}
