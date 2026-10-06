import { BookingProvider } from "@/components/booking-context";
import { BookingForm } from "@/components/booking-form";
import { BookingDrawer, CompareDialog } from "@/components/dialogs";
import { HeroCar } from "@/components/hero-car";
import { Fleet } from "@/components/fleet";
import { Needs } from "@/components/needs";
import { DocsTabs, OpenStatus } from "@/components/small-client";
import { SumBar } from "@/components/sum-bar";
import { getPhotos } from "@/lib/photos";
import { SITE, waLink } from "@/lib/site";

const FAQ = [
  ["Boleh dibawa ke luar kota atau luar pulau?", "Luar kota di Jawa boleh untuk lepas kunci dan dengan sopir. Luar pulau hanya dengan sopir dan perlu dikonfirmasi lebih dulu."],
  ["Bagaimana kalau mobil mogok di jalan?", "Hubungi nomor darurat 24 jam di kontrak sewa. Unit pengganti atau derek kami atur, tanpa biaya bila penyebabnya bukan kelalaian pemakai."],
  ["Kapan deposit dikembalikan?", "Deposit lepas kunci dikembalikan penuh saat mobil dikembalikan dan diperiksa, biasanya kurang dari 30 menit."],
  ["Bisa batal atau ganti tanggal?", "Gratis sampai 48 jam sebelum jam ambil. Setelahnya dikenakan biaya satu hari sewa."],
  ["Cara pembayaran apa saja?", "Transfer bank, QRIS, atau tunai saat serah terima. Uang muka 30% untuk mengunci unit."],
];

const COSTS = [
  ["Sudah termasuk", "Asuransi dasar", "Kerusakan kendaraan di luar kelalaian pemakai. Pengemudi dan penumpang tercakup."],
  ["Sudah termasuk", "12 jam per hari", "Dengan sopir: 12 jam pemakaian, dalam kota dan sekitarnya. Lepas kunci: 24 jam penuh."],
  ["Ditanggung penyewa", "BBM, tol, parkir", "Dengan sopir juga termasuk makan sopir bila lebih dari 6 jam di luar kota."],
  ["Bila terjadi", "Overtime Rp 40.000/jam", "Dengan sopir, lewat 12 jam. Lepas kunci, keterlambatan lebih dari 2 jam dihitung sehari."],
];

const REVIEWS = [
  ["Mobil bersih, AC dingin, dan harga akhir sama persis dengan yang dikirim di awal.", "Rina A. · Keluarga, 5 hari ke Bromo"],
  ["Sopirnya tahu rute dan tidak banyak bicara. Cocok untuk perjalanan dinas.", "Dedi P. · Dinas, 3 hari"],
  ["Serah terima jam 10 malam pun dilayani. Itu yang bikin saya balik lagi.", "Michael T. · Lepas kunci, 2 hari"],
];

export default function Home() {
  const hello = waLink("Halo Kalawan, saya mau tanya soal sewa mobil.");
  return (
    <BookingProvider photos={getPhotos()}>
      <SumBar />

      <header className="top">
        <div className="wrap">
          <a className="logo" href="#">Kalawan<span>.</span></a>
          <nav className="main" aria-label="Utama">
            <a href="#armada">Armada</a><a href="#biaya">Biaya</a><a href="#lokasi">Lokasi</a><a href="#syarat">Syarat</a><a href="#faq">Tanya jawab</a>
          </nav>
          <a className="btn sm" href={hello} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div>
              <p className="mono">Rental mobil · Yogyakarta · sejak 2014</p>
              <h1>Mobil siap, harga <em>tanpa</em> kejutan di akhir.</h1>
              <p className="lead">Pilih lepas kunci atau dengan sopir, tentukan tanggal, dan total biaya langsung terlihat. Tidak ada biaya tersembunyi yang baru muncul saat serah terima.</p>
              <HeroCar />
              <div className="facts">
                <div><b>38</b><span>unit armada, dirawat berkala</span></div>
                <div><b>07–21</b><span>jam layanan, antar sampai malam</span></div>
                <div><b>4,8</b><span>dari 612 ulasan tamu</span></div>
              </div>
            </div>
            <BookingForm />
          </div>
        </section>

        <section className="s" id="kebutuhan">
          <div className="wrap">
            <div className="sh"><h2>Tidak tahu harus pilih mobil apa?</h2><p>Mulai dari kebutuhannya. Daftar mobil di bawah akan menyesuaikan dan menandai yang paling cocok.</p></div>
            <Needs />
          </div>
        </section>

        <section className="s" id="armada" style={{ paddingTop: 0, borderTop: 0 }}>
          <div className="wrap"><Fleet /></div>
        </section>

        <section className="s" id="biaya">
          <div className="wrap">
            <div className="sh"><h2>Apa yang sudah dan belum termasuk</h2><p>Semua ditulis di sini sebelum Anda memesan.</p></div>
            <div className="costs">
              {COSTS.map(([tag, title, body]) => (
                <div className="cost" key={title}><span className="mono">{tag}</span><b>{title}</b><p>{body}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="s" id="lokasi">
          <div className="wrap pick">
            <div>
              <p className="mono" style={{ marginBottom: 12 }}>Titik ambil & kembali</p>
              <h2 style={{ fontSize: "clamp(30px,4vw,52px)", marginBottom: 18 }}>Garasi Kalawan</h2>
              <OpenStatus />
              <dl className="kv">
                <div><dt>Alamat</dt><dd>{SITE.address}</dd></div>
                <div><dt>Jam buka</dt><dd>Setiap hari 07.00 – 21.00 WIB</dd></div>
                <div><dt>Dari bandara YIA</dt><dd>± 55 menit. Antar-jemput tersedia.</dd></div>
                <div><dt>Dari Stasiun Tugu</dt><dd>± 25 menit. Antar-jemput tersedia.</dd></div>
                <div><dt>Di luar jam buka</dt><dd>Serah terima malam hari bisa diatur lewat WhatsApp.</dd></div>
              </dl>
            </div>
            <div className="map" role="img" aria-label="Peta sederhana lokasi garasi di Jalan Kaliurang">
              <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" fill="none">
                <g stroke="#2a2420" strokeWidth="1"><path d="M0 60H400M0 120H400M0 180H400M0 240H400M0 300H400M60 0V340M140 0V340M220 0V340M300 0V340M380 0V340" /></g>
                <path d="M-10 300 Q120 240 200 170 T410 40" stroke="#6b6155" strokeWidth="10" strokeLinecap="round" />
                <path d="M-10 300 Q120 240 200 170 T410 40" stroke="#14110f" strokeWidth="8" strokeLinecap="round" />
                <path d="M-10 300 Q120 240 200 170 T410 40" stroke="#a79d8e" strokeWidth="1" strokeDasharray="8 8" />
                <path d="M110 340 Q150 230 200 170" stroke="#3a332d" strokeWidth="5" />
                <path d="M200 170 Q260 200 410 230" stroke="#3a332d" strokeWidth="5" />
                <circle cx="200" cy="170" r="26" fill="rgba(208,138,91,.14)" /><circle cx="200" cy="170" r="7" fill="#d08a5b" />
                <text x="214" y="160" fill="#efe6d6" fontFamily="var(--sans)" fontSize="13" fontWeight="600">Garasi Kalawan</text>
                <text x="24" y="292" fill="#a79d8e" fontFamily="var(--mono)" fontSize="10">JL. KALIURANG</text>
                <text x="300" y="30" fill="#a79d8e" fontFamily="var(--mono)" fontSize="10">U ↑</text>
              </svg>
            </div>
          </div>
        </section>

        <section className="s" id="syarat">
          <div className="wrap two">
            <div>
              <div className="sh" style={{ marginBottom: 20 }}><h2 style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>Dokumen yang perlu disiapkan</h2></div>
              <DocsTabs />
            </div>
            <div id="faq">
              <div className="sh" style={{ marginBottom: 20 }}><h2 style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>Pertanyaan yang sering muncul</h2></div>
              {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="s">
          <div className="wrap">
            <div className="sh"><h2>Kata mereka yang sudah menyewa</h2></div>
            <div className="rev">
              {REVIEWS.map(([quote, who]) => <blockquote key={who}>“{quote}”<cite>{who}</cite></blockquote>)}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div><span className="logo" style={{ fontSize: 20 }}>Kalawan<span>.</span></span><p style={{ marginTop: 8 }}>Mockup demo. Nama, harga, dan kontak bersifat fiktif.</p></div>
          <div>Jl. Kaliurang Km 6,2 No. 48<br />Sleman, Yogyakarta</div>
          <div>0812-3456-7890<br />halo@kalawan.example</div>
        </div>
      </footer>

      <a className="btn solid wa" href={hello} target="_blank" rel="noopener noreferrer">Chat WhatsApp</a>
      <BookingDrawer />
      <CompareDialog />
    </BookingProvider>
  );
}
