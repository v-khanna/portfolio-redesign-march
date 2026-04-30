import {
  // Serifs
  Cormorant_Garamond,
  Instrument_Serif,
  Fraunces,
  Playfair_Display,
  DM_Serif_Display,
  EB_Garamond,
  Crimson_Pro,
  Bodoni_Moda,
  Marcellus,
  Italiana,
  // Sans
  Inter,
  Space_Grotesk,
  Bricolage_Grotesque,
  Syne,
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
  Albert_Sans,
  Onest,
  DM_Sans,
  // Mono
  JetBrains_Mono,
  Space_Mono,
  IBM_Plex_Mono,
  Fira_Code,
  // Display / distinctive
  Bebas_Neue,
  Anton,
  Archivo_Black,
  Big_Shoulders_Display,
  Major_Mono_Display,
  Orbitron,
} from 'next/font/google'

// Serifs
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['600', '700'] })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: ['400'] })
const fraunces = Fraunces({ subsets: ['latin'], weight: ['600', '700'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'] })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] })
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['600', '700'] })
const crimsonPro = Crimson_Pro({ subsets: ['latin'], weight: ['600', '700'] })
const bodoni = Bodoni_Moda({ subsets: ['latin'], weight: ['700', '900'] })
const marcellus = Marcellus({ subsets: ['latin'], weight: ['400'] })
const italiana = Italiana({ subsets: ['latin'], weight: ['400'] })

// Sans
const inter = Inter({ subsets: ['latin'], weight: ['700', '900'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['600', '700'] })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600', '700', '800'] })
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'] })
const manrope = Manrope({ subsets: ['latin'], weight: ['700', '800'] })
const outfit = Outfit({ subsets: ['latin'], weight: ['700', '900'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['700', '800'] })
const albertSans = Albert_Sans({ subsets: ['latin'], weight: ['700', '900'] })
const onest = Onest({ subsets: ['latin'], weight: ['700', '900'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['700', '900'] })

// Mono
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['600', '700'] })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['700'] })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['600', '700'] })
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['600', '700'] })

// Display / distinctive
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'] })
const anton = Anton({ subsets: ['latin'], weight: ['400'] })
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] })
const bigShoulders = Big_Shoulders_Display({ subsets: ['latin'], weight: ['700', '900'] })
const majorMono = Major_Mono_Display({ subsets: ['latin'], weight: ['400'] })
const orbitron = Orbitron({ subsets: ['latin'], weight: ['700', '900'] })

const fonts = [
  // Serifs
  { n: '01', name: 'Cormorant Garamond', cls: cormorant.className, vibe: 'Classic editorial — current font', cat: 'serif' },
  { n: '02', name: 'Instrument Serif', cls: instrument.className, vibe: 'Modern editorial, magazine feel — very on-trend', cat: 'serif' },
  { n: '03', name: 'Fraunces', cls: fraunces.className, vibe: 'Variable serif with quirks, distinctive personality', cat: 'serif' },
  { n: '04', name: 'Playfair Display', cls: playfair.className, vibe: 'High-contrast classic, dramatic', cat: 'serif' },
  { n: '05', name: 'DM Serif Display', cls: dmSerif.className, vibe: 'Bold serif with contrast, editorial weight', cat: 'serif' },
  { n: '06', name: 'EB Garamond', cls: ebGaramond.className, vibe: 'Refined book serif, scholarly', cat: 'serif' },
  { n: '07', name: 'Crimson Pro', cls: crimsonPro.className, vibe: 'Modern transitional serif, readable elegance', cat: 'serif' },
  { n: '08', name: 'Bodoni Moda', cls: bodoni.className, vibe: 'Fashion-mag, ultra-thin/thick contrast', cat: 'serif' },
  { n: '09', name: 'Marcellus', cls: marcellus.className, vibe: 'Roman-inscription style, architectural', cat: 'serif' },
  { n: '10', name: 'Italiana', cls: italiana.className, vibe: 'Light, airy, fashion-editorial', cat: 'serif' },

  // Sans
  { n: '11', name: 'Inter (Heavy)', cls: inter.className, vibe: 'Clean modern sans, neutral, technical', cat: 'sans' },
  { n: '12', name: 'Space Grotesk', cls: spaceGrotesk.className, vibe: 'Geometric sans, slightly futuristic, dev-portfolio classic', cat: 'sans' },
  { n: '13', name: 'Bricolage Grotesque', cls: bricolage.className, vibe: 'Modern sans with character, hot right now', cat: 'sans' },
  { n: '14', name: 'Syne', cls: syne.className, vibe: 'Bold display sans, distinctive curves', cat: 'sans' },
  { n: '15', name: 'Manrope', cls: manrope.className, vibe: 'Geometric, friendly, soft corners', cat: 'sans' },
  { n: '16', name: 'Outfit', cls: outfit.className, vibe: 'Modern geometric, clean, brand-friendly', cat: 'sans' },
  { n: '17', name: 'Plus Jakarta Sans', cls: plusJakarta.className, vibe: 'Humanist sans, readable, professional', cat: 'sans' },
  { n: '18', name: 'Albert Sans', cls: albertSans.className, vibe: 'Modern grotesque, slightly rounded', cat: 'sans' },
  { n: '19', name: 'Onest', cls: onest.className, vibe: 'Modern open-source sans, optical sizing', cat: 'sans' },
  { n: '20', name: 'DM Sans', cls: dmSans.className, vibe: 'Versatile geometric sans, slightly compressed', cat: 'sans' },

  // Mono
  { n: '21', name: 'JetBrains Mono', cls: jetbrains.className, vibe: 'Mono, technical, code-aesthetic', cat: 'mono' },
  { n: '22', name: 'Space Mono', cls: spaceMono.className, vibe: 'Retro-futurist mono, distinctive', cat: 'mono' },
  { n: '23', name: 'IBM Plex Mono', cls: plexMono.className, vibe: 'Modern mono, clean technical', cat: 'mono' },
  { n: '24', name: 'Fira Code', cls: firaCode.className, vibe: 'Mono with ligatures, dev-friendly', cat: 'mono' },

  // Display / distinctive
  { n: '25', name: 'Bebas Neue', cls: bebas.className, vibe: 'All-caps condensed, magazine cover energy', cat: 'display' },
  { n: '26', name: 'Anton', cls: anton.className, vibe: 'Heavy condensed sans, poster-style', cat: 'display' },
  { n: '27', name: 'Archivo Black', cls: archivoBlack.className, vibe: 'Ultra-bold sans, brutalist energy', cat: 'display' },
  { n: '28', name: 'Big Shoulders Display', cls: bigShoulders.className, vibe: 'Tall condensed sans, industrial', cat: 'display' },
  { n: '29', name: 'Major Mono Display', cls: majorMono.className, vibe: 'All-caps mono, sci-fi terminal vibes', cat: 'display' },
  { n: '30', name: 'Orbitron', cls: orbitron.className, vibe: 'Geometric futurist, sci-fi/tech', cat: 'display' },
]

const catColors: Record<string, string> = {
  serif: 'text-teal',
  sans: 'text-light-slate',
  mono: 'text-amber-300',
  display: 'text-rose-300',
}

export default function FontTestPage() {
  return (
    <main className="min-h-screen bg-navy text-white px-6 py-16 lg:px-16 lg:py-20">
      <header className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-teal mb-3">Font Preview · 30 options</p>
        <h2 className="text-2xl font-bold text-lightest-slate mb-2">Hero Name Font Options</h2>
        <p className="text-slate text-sm leading-relaxed">
          30 candidates — serifs, sans, mono, and display. Each shows the name large + smaller paired with your tagline.
          Tell me the numbers you like and we&apos;ll narrow down.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-xs">
          <span className="text-teal">● Serif (1–10)</span>
          <span className="text-light-slate">● Sans (11–20)</span>
          <span className="text-amber-300">● Mono (21–24)</span>
          <span className="text-rose-300">● Display (25–30)</span>
        </div>
      </header>

      <div className="space-y-16">
        {fonts.map((font) => (
          <section key={font.n} className="border-t border-navy-lighter pt-8">
            <div className="flex items-baseline justify-between gap-6 mb-5">
              <p className={`text-xs font-mono uppercase tracking-[0.15em] ${catColors[font.cat]}`}>
                {font.n} — {font.name}
              </p>
              <p className="text-xs text-slate italic max-w-md text-right">{font.vibe}</p>
            </div>

            <h1
              className={`${font.cls} text-6xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-5`}
              style={{ fontWeight: 700 }}
            >
              Vir Khanna
            </h1>

            <div className="border-l-2 border-teal/40 pl-6">
              <h2 className={`${font.cls} text-3xl text-white mb-1.5`} style={{ fontWeight: 700 }}>
                Vir Khanna
              </h2>
              <p className="text-slate text-sm font-sans">
                I build systems that think, automate, and scale.
              </p>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-20 pt-10 border-t border-navy-lighter">
        <p className="text-xs text-slate">
          Tell me your top 3-5 numbers. We can also swap weights, try italics, or pair two fonts (e.g. serif name + mono tagline).
        </p>
      </footer>
    </main>
  )
}
