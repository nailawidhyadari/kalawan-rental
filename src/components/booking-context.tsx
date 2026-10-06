"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { NEEDS, type Car, type NeedKey, type Service } from "@/lib/cars";
import { iso, quote, type Quote } from "@/lib/pricing";

type Ctx = {
  svc: Service; setSvc: (s: Service) => void;
  d1: string; d2: string; setD1: (v: string) => void; setD2: (v: string) => void;
  time: string; setTime: (v: string) => void;
  pax: number; setPax: (n: number) => void;
  deliver: boolean; setDeliver: (b: boolean) => void;
  need: NeedKey | null; toggleNeed: (k: NeedKey) => void;
  cat: string; setCat: (c: string) => void;
  trans: string; setTrans: (t: string) => void;
  sort: "price" | "seat"; setSort: (s: "price" | "seat") => void;
  cmp: string[]; toggleCmp: (id: string) => void; clearCmp: () => void;
  cur: Car | null; setCur: (c: Car | null) => void;
  showCmp: boolean; setShowCmp: (b: boolean) => void;
  q: (car: Car) => Quote;
  toast: (m: string) => void;
};

// Tanggal awal hanya ada di browser; server mengirim string kosong agar tidak terjadi hydration mismatch.
const noop = () => () => {};
const dayFromNow = (n: number) => iso(new Date(Date.now() + n * 864e5));

const BookingCtx = createContext<Ctx | null>(null);
export const useBooking = () => {
  const c = useContext(BookingCtx);
  if (!c) throw new Error("useBooking must be used inside BookingProvider");
  return c;
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [svc, setSvc] = useState<Service>("lepas");
  const defD1 = useSyncExternalStore(noop, () => dayFromNow(1), () => "");
  const defD2 = useSyncExternalStore(noop, () => dayFromNow(3), () => "");
  const [d1o, setD1o] = useState<string | null>(null);
  const [d2o, setD2o] = useState<string | null>(null);
  const d1 = d1o ?? defD1;
  const d2 = d2o ?? defD2;
  const [time, setTime] = useState("09.00");
  const [pax, setPaxRaw] = useState(1);
  const [deliver, setDeliver] = useState(false);
  const [need, setNeed] = useState<NeedKey | null>(null);
  const [cat, setCat] = useState("Semua");
  const [trans, setTrans] = useState("");
  const [sort, setSort] = useState<"price" | "seat">("price");
  const [cmp, setCmp] = useState<string[]>([]);
  const [cur, setCur] = useState<Car | null>(null);
  const [showCmp, setShowCmp] = useState(false);
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const setD1 = useCallback((v: string) => {
    setD1o(v);
    if (d2 <= v) {
      const d = new Date(v + "T00:00");
      d.setDate(d.getDate() + 1);
      setD2o(iso(d));
    }
  }, [d2]);

  const toast = useCallback((m: string) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 1800);
  }, []);

  const setPax = useCallback((n: number) => { setPaxRaw(n); setNeed(null); }, []);

  const toggleNeed = useCallback((k: NeedKey) => {
    setNeed((cur) => {
      if (cur === k) return null;
      setPaxRaw(NEEDS[k].pax);
      setCat("Semua");
      return k;
    });
  }, []);

  const toggleCmp = useCallback((id: string) => {
    setCmp((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 3) { toast("Maksimal 3 mobil"); return cur; }
      return [...cur, id];
    });
  }, [toast]);

  const q = useCallback((car: Car) => quote(car, { svc, d1, d2, deliver }), [svc, d1, d2, deliver]);

  const value = useMemo<Ctx>(() => ({
    svc, setSvc, d1, d2, setD1, setD2: setD2o, time, setTime, pax, setPax, deliver, setDeliver,
    need, toggleNeed, cat, setCat, trans, setTrans, sort, setSort,
    cmp, toggleCmp, clearCmp: () => setCmp([]), cur, setCur, showCmp, setShowCmp, q, toast,
  }), [svc, d1, d2, setD1, time, pax, setPax, deliver, need, toggleNeed, cat, trans, sort, cmp, toggleCmp, cur, showCmp, q, toast]);

  return (
    <BookingCtx.Provider value={value}>
      {children}
      <div className={`toast${msg ? " show" : ""}`} role="status">{msg}</div>
    </BookingCtx.Provider>
  );
}

