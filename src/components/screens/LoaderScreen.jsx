"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

export default function LoaderScreen({ onDone }) {

    useEffect(() => {   
        const timer = setTimeout(() => {
            onDone?.()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onDone])

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center will-change-transform"
        >
      
            <motion.div
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="text-7xl md:text-8xl will-change-transform drop-shadow-xl"
            >
                🎂
            </motion.div>

      
            <div className="flex flex-col items-center gap-2">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-6 text-xl md:text-2xl font-bold text-pink-600 text-center tracking-tight"
                >
                    Preparing something special...
                </motion.p>
                
              
                <div className="w-48 h-1.5 bg-pink-100 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="h-full bg-pink-500"
                    />
                </div>
            </div>

        </motion.div>
    )
}