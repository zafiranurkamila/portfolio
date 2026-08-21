import { motion } from 'framer-motion'
import Mascot from '../Mascot'
import CampusScene from '../CampusScene'

export default function Home() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Tulisan besar di belakang */}
      <div className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center pb-[26vh] font-display font-bold leading-[0.82] text-bg-2">
        <span className="text-[clamp(2.6rem,15vw,13rem)]">WEB &amp; AI</span>
        <span className="text-[clamp(2.6rem,15vw,13rem)]">DEVELOPER</span>
      </div>

      {/* Rumput */}
      <div className="absolute inset-x-0 bottom-0 h-[22vh] border-t-[6px] border-ink bg-[#8bd08b]" />

      {/* Kampus (berdiri di atas rumput) */}
      <CampusScene className="pointer-events-none absolute bottom-[19vh] left-0 h-[34vh] w-full" />

      {/* Maskot jalan-jalan di atas rumput */}
      <div className="absolute inset-x-0 bottom-[20vh] z-10 flex justify-center">
        <motion.div
          animate={{ x: ['0vw', '30vw', '0vw', '-30vw', '0vw'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-[30vh]"
        >
          {/* bayangan di tanah (biar napak, nggak melayang) */}
          <div className="absolute -bottom-2 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-black/25 blur-[3px]" />
          {/* badan naik-turun (langkah) */}
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full"
          >
            <Mascot walking className="h-full w-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
