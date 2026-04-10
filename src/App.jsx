import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "./data";
import SlideRenderer from "./components/SlideRenderer.jsx";
import "./style.scss";

// Slide transition variants
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      filter: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      filter: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const goTo = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (isLoading) return <LoadingScreen />;

  const currentSlide = slides[currentIndex];

  return (
    <div className="presentation-shell bg-[#fcfdff] w-screen h-screen overflow-hidden relative selection:bg-orange-100">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <SlideRenderer
            slide={currentSlide}
            index={currentIndex}
            total={slides.length}
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav Arrows */}
      <div className="z-[300]">
        {!(currentIndex === 0) && (
          <button onClick={goPrev} className="nav-arrow left" aria-label="Previous">
            <ChevronLeft size={32} strokeWidth={3} />
          </button>
        )}
        {!(currentIndex === slides.length - 1) && (
          <button onClick={goNext} className="nav-arrow right" aria-label="Next">
            <ChevronRight size={32} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-wrap">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            title={s.title}
          />
        ))}
      </div>

      {/* Top Bar Logo Only */}
      <div className="fixed top-6 left-8 z-[100] flex items-center gap-3 liquid-glass px-5 py-3 border-white/40">
        <img src="/professor-panda.png" alt="Panda" className="w-10 h-10 object-contain drop-shadow-md" />
        <span className="liquid-text text-xl">GENIE-US</span>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-6 right-8 z-[100] liquid-glass px-5 py-3 border-white/40 font-cartoon text-slate-500">
        <span className="text-orange-500">{currentIndex + 1}</span> / {slides.length}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(24px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="magic-particles" />
      <div className="blob-layer">
        <div className="blob w-[800px] h-[800px] bg-orange-200/30 -top-40 -left-60" />
        <div className="blob w-[600px] h-[600px] bg-blue-200/30 -bottom-20 -right-40" />
        <div className="blob w-[400px] h-[400px] bg-purple-200/20 top-1/4 left-1/2" />
      </div>

      <div className="loading-content">
        <div className="loading-panda-wrap relative">
          <motion.img
            src="/professor-panda.png"
            alt="Professor Panda"
            className="w-56 md:w-72 object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.4)]"
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0, y: [0, -25, 0] }}
            transition={{
              scale: { type: "spring", stiffness: 200, damping: 25 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-5 bg-black/5 blur-2xl rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
        </div>

        <div className="mt-12">
          <h1 className="loading-title liquid-text italic">GENIE-US</h1>
          <motion.p
            className="font-bubble text-2xl text-blue-400 tracking-[0.2em] mt-4"
            animate={{ opacity: [0.4, 1, 0.4], y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            BREWING MAGIC LEARNING...
          </motion.p>
        </div>

        <div className="flex gap-5 mt-10">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-5 h-5 rounded-full liquid-glass border-white/50"
              style={{ background: i % 2 === 0 ? 'var(--panda-orange)' : 'var(--panda-blue)' }}
              animate={{ scale: [1, 1.6, 1], y: [0, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
