"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Gift, Sparkles } from "lucide-react"
import Button from "../Button"

export default function IntroScreen({ onNext }) {

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

 
    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="glass-card p-8 rounded-[60px] shadow-2xl w-full max-w-md relative flex flex-col items-center gap-8 border-4 border-white/50"
        >
            <div className="relative h-52 bg-gradient-to-br from-white to-pink-100 w-full rounded-[40px] flex items-center justify-center shadow-inner">
                <img src="/gifs/intro.gif" alt="Cute" className="w-32 drop-shadow-md" />
            </div>

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-primary leading-tight">
                    A Cutiepie was born today, 20 years ago!
                </h1>
                <p className="text-foreground/80 font-medium">Yes, it’s YOU! A little surprise awaits...</p>
            </div>

            <Button
                onClick={() => onNext?.()}
                className="bg-primary text-white hover:bg-primary/90 shadow-pink-500/30 scale-110"
            >
                <Gift size={20} />
                Start the surprise
            </Button>
        </motion.div>
    )
    
}