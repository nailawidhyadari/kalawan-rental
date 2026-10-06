import type { CarType } from "@/lib/cars";

const SHAPES: Record<CarType, { body: string; win: string }> = {
  hatch: { body: "M26 118 L26 98 Q28 90 46 88 L100 82 Q125 54 170 52 L255 52 Q292 58 336 88 L366 94 Q378 98 378 118 Z", win: "M108 82 Q130 58 168 58 L205 58 L205 82 Z M214 58 L254 58 Q282 62 316 82 L214 82 Z" },
  sedan: { body: "M20 118 L20 100 Q22 92 40 90 L112 84 Q140 54 185 52 L250 52 Q286 56 306 84 L372 92 Q384 96 384 112 L384 118 Z", win: "M120 84 Q146 58 184 58 L208 58 L208 84 Z M216 58 L248 58 Q276 62 294 84 L216 84 Z" },
  mpv: { body: "M22 118 L22 96 Q24 88 42 86 L100 78 Q125 46 170 44 L280 44 Q320 48 345 84 L372 92 Q384 98 384 118 Z", win: "M108 78 Q130 52 168 50 L200 50 L200 78 Z M208 50 L278 50 Q310 54 330 78 L208 78 Z" },
  suv: { body: "M20 118 L20 92 Q22 84 40 82 L95 76 L125 46 L300 46 Q325 50 345 78 L374 86 Q386 92 386 118 Z", win: "M104 78 L130 52 L205 52 L205 78 Z M214 52 L296 52 Q316 56 332 78 L214 78 Z" },
  van: { body: "M16 118 L16 60 Q16 48 30 46 L330 46 Q352 50 362 72 L384 90 Q388 96 388 118 Z", win: "M30 56 L96 56 L96 84 L30 84 Z M106 56 L176 56 L176 84 L106 84 Z M186 56 L250 56 L250 84 L186 84 Z M262 56 L326 56 Q342 60 352 80 L262 80 Z" },
};

export function CarArt({ type }: { type: CarType }) {
  const s = SHAPES[type];
  return (
    <svg viewBox="0 0 400 150" fill="none" stroke="#efe6d6" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <g transform="matrix(.82 0 0 1.3 36 -35.4)">
        <path vectorEffect="non-scaling-stroke" d={s.body} />
        <path vectorEffect="non-scaling-stroke" d={s.win} stroke="#d08a5b" strokeWidth="1.2" />
      </g>
      <circle cx="114" cy="118" r="29" fill="#1c1815" stroke="none" />
      <circle cx="286" cy="118" r="29" fill="#1c1815" stroke="none" />
      <circle cx="114" cy="118" r="22" /><circle cx="114" cy="118" r="9" stroke="#d08a5b" />
      <circle cx="286" cy="118" r="22" /><circle cx="286" cy="118" r="9" stroke="#d08a5b" />
      <line x1="0" y1="142" x2="400" y2="142" stroke="#3a332d" />
    </svg>
  );
}

export function HeroDrawing() {
  return (
    <div className="drawing" aria-hidden="true">
      <svg viewBox="0 0 640 262" fill="none" stroke="#efe6d6" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <g stroke="#6b6155" strokeWidth="1">
          <line x1="113" y1="30" x2="533" y2="30" /><line x1="113" y1="24" x2="113" y2="36" /><line x1="533" y1="24" x2="533" y2="36" />
          <line x1="570" y1="67" x2="570" y2="205" /><line x1="564" y1="67" x2="576" y2="67" /><line x1="564" y1="205" x2="576" y2="205" />
          <line x1="40" y1="244" x2="600" y2="244" strokeDasharray="3 5" />
        </g>
        <text x="323" y="22" fill="#a79d8e" stroke="none" fontFamily="var(--mono)" fontSize="11" textAnchor="middle">4.435 mm</text>
        <text x="570" y="58" fill="#a79d8e" stroke="none" fontFamily="var(--mono)" fontSize="11" textAnchor="middle">1.795 mm</text>
        <g transform="translate(40,40) scale(1.4)">
          <g transform="matrix(.82 0 0 1.3 36 -35.4)">
            <path vectorEffect="non-scaling-stroke" d="M20 118 L20 92 Q22 84 40 82 L95 76 L125 46 L300 46 Q325 50 345 78 L374 86 Q386 92 386 118 Z" />
            <path vectorEffect="non-scaling-stroke" d="M104 78 L130 52 L205 52 L205 78 Z M214 52 L296 52 Q316 56 332 78 L214 78 Z" stroke="#d08a5b" />
            <line vectorEffect="non-scaling-stroke" x1="209" y1="52" x2="209" y2="118" strokeWidth="1" />
          </g>
          <circle cx="114" cy="118" r="30" fill="#14110f" stroke="none" /><circle cx="286" cy="118" r="30" fill="#14110f" stroke="none" />
          <circle cx="114" cy="118" r="22" /><circle cx="114" cy="118" r="9" stroke="#d08a5b" />
          <circle cx="286" cy="118" r="22" /><circle cx="286" cy="118" r="9" stroke="#d08a5b" />
          <line x1="0" y1="140" x2="400" y2="140" stroke="#3a332d" />
        </g>
        <text x="40" y="258" fill="#a79d8e" stroke="none" fontFamily="var(--mono)" fontSize="11">Toyota Fortuner 2.4 VRZ · 7 kursi</text>
      </svg>
    </div>
  );
}
