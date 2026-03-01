"use client"

import { useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight, Wind } from "lucide-react"
import Button from "../Button"

const confettiColors = ["#ff8fab", "#ffb3c6", "#fca5a5", "#e9a8ff", "#ffd166"];

export default function CakeScreen({ onNext }) {
  const [status, setStatus] = useState("idle")

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLight = () => {
    setStatus("lit")
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 }, colors: confettiColors });
  }

  const handleBlow = () => {
    setStatus("blown")
    const end = Date.now() + 3 * 1000;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: confettiColors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: confettiColors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-[650px] flex items-center justify-center p-4 overflow-hidden">
      
      <AnimatePresence>
        {status === "lit" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-radial from-orange-100/30 to-transparent blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        
        className="bg-[#fff8fc] p-8 rounded-[60px] drop-shadow-2xl w-full max-w-110 aspect-square relative flex flex-col items-center justify-between border border-white/50"
      >
        
        
        <div className="h-20 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {status === "lit" ? (
              <motion.h2 key="wish" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-rose-400 italic">
                Make a wish... ✨
              </motion.h2>
            ) : status === "blown" ? (
              <motion.h1 key="hbd" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="text-3xl md:text-4xl font-black text-rose-500 text-center drop-shadow-sm">
                Happy Birthday, Maal! 🎂
              </motion.h1>
            ) : (
             
              <div className="h-20" />
            )}
          </AnimatePresence>
        </div>

     
        <div className="relative flex-1 w-full flex items-center justify-center overflow-visible">
          <div className="transform scale-100 mt-8">
            <Cake lit={status === "lit"} blown={status === "blown"} />
          </div>
        </div>

       
        <div className="relative z-20 h-24 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div key="btn-light" exit={{ opacity: 0, scale: 0.8 }}>
                <Button onClick={handleLight} className="bg-rose-400 text-white px-10 shadow-lg hover:bg-rose-500">
                  <Flame size={20} className="mr-2 animate-pulse" /> Light Candle
                </Button>
              </motion.div>
            )}

            {status === "lit" && (
              <motion.div key="btn-blow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={handleBlow} className="bg-sky-400 text-white px-10 shadow-lg hover:bg-sky-500 border-2 border-white/20">
                  <Wind size={20} className="mr-2 animate-bounce" /> Now Blow It!
                </Button>
              </motion.div>
            )}

            {status === "blown" && (
              <motion.div key="btn-next" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
                <Button onClick={onNext} className="bg-rose-500 text-white px-10 shadow-xl hover:scale-105 transition-transform">
                  Next Surprise <MoveRight size={20} className="ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function Cake({ lit, blown }) {
  return (
    <div className="flex flex-col items-center" style={{ transform: "translateZ(40px)" }}>
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="candle">
          {lit && (
            <motion.div
              animate={{ opacity: [0.8, 1, 0.9], scale: [1, 1.1, 1], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="flame shadow-[0_0_20px_rgba(255,165,0,0.6)]"
            />
          )}
          {blown && (
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              transition={{ duration: 1 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-gray-300"
            >
              💨
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}