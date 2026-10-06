export const SITE = {
  name: "Kalawan",
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER ?? "6281234567890",
  address: "Jl. Kaliurang Km 6,2 No. 48, Sleman, Yogyakarta",
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
