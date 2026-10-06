import type { Car, Service } from "./cars";

export const DRIVER = 275000;
export const DELIVER = 100000;
export const WEEK_DISC = 0.1;
export const DEPOSIT = 500000;
export const DEFAULT_DAYS = 2;

export const idr = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");
export const iso = (d: Date) => d.toISOString().slice(0, 10);
export const fmtD = (s: string) =>
  s ? new Date(s + "T00:00").toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "—";

export function spanDays(d1: string, d2: string) {
  if (!d1 || !d2) return DEFAULT_DAYS;
  const d = Math.round((+new Date(d2 + "T00:00") - +new Date(d1 + "T00:00")) / 864e5);
  return d >= 1 ? d : 1;
}

export type Quote = { days: number; base: number; disc: number; drv: number; del: number; total: number };

export function quote(car: Car, o: { svc: Service; d1: string; d2: string; deliver: boolean }): Quote {
  const days = spanDays(o.d1, o.d2);
  const base = car.price * days;
  const disc = days >= 7 ? base * WEEK_DISC : 0;
  const drv = o.svc === "sopir" ? DRIVER * days : 0;
  const del = o.deliver ? DELIVER : 0;
  return { days, base, disc, drv, del, total: base - disc + drv + del };
}
