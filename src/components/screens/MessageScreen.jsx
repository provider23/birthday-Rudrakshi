"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function MessageScreen() {
    const [opened, setOpened] = useState(false)
    const [displayedText, setDisplayedText] = useState("")
    const [typingComplete, setTypingComplete] = useState(false)
    const messageRef = useRef(null)

    const fullMessage = `You’re honestly one of the most unintentionally funny people I know. The random thoughts, the weird logic, the unexpected voice notes — somehow all of it just works.\n\nYou’re not calm. You’re not soft. And that’s exactly what makes talking to you interesting. Conversations with you are never boring, and that’s rare.\n\nNot trying to make this emotional or dramatic — just saying this genuinely: talking to you feels nice, and it makes days better.\n\nHope this year brings you good moments, good laughs, and things that keep you excited in your own weird way.`

    useEffect(() => {
        if (opened && !typingComplete) {
            let currentIndex = 0
            const typingInterval = setInterval(() => {
                if (currentIndex < fullMessage.length) {
                    setDisplayedText(fullMessage.slice(0, currentIndex + 1))
                    currentIndex++
                    if (messageRef.current) {
                        messageRef.current.scrollTop = messageRef.current.scrollHeight
                    }
                } else {
                    setTypingComplete(true)
                    clearInterval(typingInterval)
                }
            }, 30) 
            return () => clearInterval(typingInterval)
        }
    }, [opened, typingComplete])

    return (
        <div className="flex items-center justify-center w-full min-h-[80vh] px-4">
          
            <div className="bg-[#fff8fc] p-5 md:p-8 rounded-[45px] md:rounded-[60px] drop-shadow-2xl w-full max-w-[400px] aspect-[3/4.5] md:aspect-square relative flex flex-col items-center border-4 border-white/50 shadow-pink-100/50 overflow-hidden">
                
      
                <div className="text-center h-12 md:h-16 flex flex-col justify-center mb-2">
                    <h2 className="text-xl md:text-3xl font-bold text-primary italic">
                        A Special Message
                    </h2>
                    {!opened && (
                        <p className="text-primary/70 text-[10px] md:text-sm animate-pulse">
                            Tap to open 💌
                        </p>
                    )}
                </div>

              
                <div
                    onClick={() => !opened && setOpened(true)}
                    className="relative flex-1 w-full rounded-[30px] md:rounded-[40px] overflow-hidden shadow-inner cursor-pointer bg-white flex flex-col border border-pink-50"
                >
                    <AnimatePresence>
                        {!opened && (
                            <motion.div 
                                key="cover"
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                className="cover absolute inset-0 z-10 bg-[#ffedea]" 
                            />
                        )}
                    </AnimatePresence>

                  
                    <div 
                        ref={messageRef}
                        className="relative z-0 px-5 py-5 h-full w-full overflow-y-auto custom-scrollbar text-center"
                    >
                        <p className="font-bold text-pink-600 text-base md:text-lg mb-3">
                            Happy Birthday, Rudrakshi 🎉
                        </p>
                        
                        <div className="text-gray-700 text-[14px] md:text-[15px] leading-relaxed italic font-medium whitespace-pre-line">
                            {displayedText}
                            {!typingComplete && opened && (
                                <motion.span 
                                    animate={{ opacity: [0, 1, 0] }} 
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-1.5 h-4 bg-pink-400 ml-1 align-middle"
                                />
                            )}
                        </div>
                        
                        {typingComplete && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-pink-500 pt-4 border-t border-pink-100 mt-5 text-base md:text-lg"
                            >
                                Happy Birthday, Mall 🤍
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
            `}</style>
        </div>
    )
}