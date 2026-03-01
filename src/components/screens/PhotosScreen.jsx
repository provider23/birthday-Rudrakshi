"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { Mail, SkipForward, Volume2, VolumeX } from "lucide-react"
import Button from "../Button"
import confetti from "canvas-confetti"

const media = [
  { type: "image", src: "/images/1.jpeg", duration: 3500 },
  { type: "image", src: "/images/2.jpeg", duration: 3500 },
  { type: "video", src: "/videos/v1.mp4" },
  { type: "image", src: "/images/3.jpeg", duration: 3500 },
  { type: "image", src: "/images/4.jpeg", duration: 3500 },
  { type: "video", src: "/videos/v2.mp4", special: true },
]

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)
  const videoRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  // 🔹 Har slide change par purani videos ko STOP karne ka function
  const stopAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  // 🔹 Progress Logic
  useEffect(() => {
    let interval;
    const currentMedia = media[activeIndex];

    if (currentMedia.type === "image") {
      const duration = currentMedia.duration;
      const startTime = Date.now();
      setProgress(0);
      
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / duration) * 100, 100);
        setProgress(p);

        if (p >= 100) {
          clearInterval(interval);
          swiperRef.current?.slideNext();
        }
      }, 16);
    } else {
      setProgress(0); // Video progress handles itself via handleTimeUpdate
      // Auto-play the video for the current slide
      const currentVideo = videoRefs.current[activeIndex];
      if (currentVideo) {
        currentVideo.play().catch(() => console.log("User interaction needed"));
      }
    }

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleTimeUpdate = (e) => {
    const video = e.target;
    if (!isNaN(video.duration)) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleVideoEnd = (item) => {
    if (item.special) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setTimeout(onNext, 2000);
    } else {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <div className="bg-[#fff8fc] p-6 rounded-[50px] drop-shadow-2xl w-full max-w-md relative flex flex-col items-center gap-5 my-10 border-4 border-white">
      

      <div className="text-center">
        <h2 className="text-2xl font-bold text-violet-600">Sweet Moments</h2>
        <p className="text-[10px] text-violet-400 uppercase tracking-widest font-bold">Insta-style Stories</p>
      </div>

    
      <div className="flex gap-1.5 w-full px-1">
        {media.map((_, i) => (
          <div key={i} className="h-1 bg-black/10 flex-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-500"
              style={{ 
                width: i < activeIndex ? "100%" : i === activeIndex ? `${progress}%` : "0%",
                transition: i === activeIndex && media[i].type === "video" ? "none" : "width 0.1s linear"
              }}
            />
          </div>
        ))}
      </div>

      
      <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden bg-black shadow-2xl">
        
        
        <div className="absolute top-4 right-4 z-30 flex gap-2">
           <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white">
             {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
           </button>
           <button onClick={() => swiperRef.current?.slideNext()} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white">
             <SkipForward size={16} />
           </button>
        </div>

        <Swiper
          effect="fade"
          modules={[EffectFade]}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => {
            stopAllVideos(); 
            setActiveIndex(s.activeIndex);
          }}
          className="h-full w-full"
        >
          {media.map((item, i) => (
            <SwiperSlide key={i} className="h-full w-full bg-black">
              <div className="h-full w-full flex items-center justify-center">
                {item.type === "image" ? (
                  <img src={item.src} className="h-full w-full object-contain" alt="" />
                ) : (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={item.src}
                    className="h-full w-full object-contain" // Ratio fix
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => handleVideoEnd(item)}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full mt-2">
        <Button onClick={onNext} className="bg-violet-100 text-violet-700 w-full py-4 rounded-2xl font-bold border-2 border-violet-200 shadow-md">
          <Mail size={18} className="mr-2" />
          Read My Message
        </Button>
      </div>
    </div>
  )
}