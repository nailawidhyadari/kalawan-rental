# Kalawan — situs rental mobil (demo)

Next.js (App Router, TypeScript). Data demo ada di `src/lib/cars.ts`, aturan harga di `src/lib/pricing.ts`.

```bash
npm install
cp .env.example .env.local   # isi nomor WhatsApp admin
npm run dev                  # http://localhost:3000
npm run build
```

Deploy: hubungkan repo ini ke Vercel, lalu isi environment variable `NEXT_PUBLIC_WA_NUMBER`.
