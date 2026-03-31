import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "./data";
import SlideRenderer from "./components/SlideRenderer.jsx";
import "./style.scss";

// Slide transition variants based on direction
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.35 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.94,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
    },
  }),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
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

  const goTo = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

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
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;
  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div
      className="presentation-shell"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "#050010",
      }}
    >
      {/* ── SLIDE AREA ── */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            willChange: "transform, opacity",
          }}
        >
          <SlideRenderer
            slide={currentSlide}
            index={currentIndex}
            total={slides.length}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── LEFT ARROW ── */}
      {!isFirst && (
        <motion.button
          id="btn-prev"
          onClick={goPrev}
          className="nav-arrow nav-arrow-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Previous slide"
        >
          <span className="arrow-icon">‹</span>
        </motion.button>
      )}

      {/* ── RIGHT ARROW ── */}
      {!isLast && (
        <motion.button
          id="btn-next"
          onClick={goNext}
          className="nav-arrow nav-arrow-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Next slide"
        >
          <span className="arrow-icon">›</span>
        </motion.button>
      )}

      {/* ── TOP BAR ── */}
      <TopBar currentIndex={currentIndex} total={slides.length} progress={progress} />

      {/* ── SLIDE DOTS ── */}
      <SlideDots
        slides={slides}
        currentIndex={currentIndex}
        goTo={goTo}
      />

      {/* ── KEYBOARD HINT (first slide only) ── */}
      {currentIndex === 0 && (
        <motion.div
          className="keyboard-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span>← → Arrow keys to navigate</span>
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────── TOP BAR ─────────────────────────────── */
function TopBar({ currentIndex, total, progress }) {
  return (
    <div className="top-bar">
      {/* Logo */}
      <div className="top-bar-logo">
        <img
          src="/professor-panda.png"
          alt="Professor Panda"
          className="top-bar-avatar"
        />
        <span className="top-bar-brand">GENIE-US</span>
      </div>

      {/* Progress */}
      <div className="top-bar-progress-wrap">
        <div className="top-bar-progress-bar">
          <motion.div
            className="top-bar-progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="top-bar-counter">
          {currentIndex + 1} / {total}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────── DOTS ─────────────────────────────── */
function SlideDots({ slides, currentIndex, goTo }) {
  return (
    <div className="slide-dots-bar">
      {slides.map((s, i) => (
        <button
          key={s.id}
          id={`dot-${s.id}`}
          onClick={() => goTo(i)}
          className={`slide-dot ${i === currentIndex ? "active" : ""}`}
          title={s.title}
          aria-label={`Go to slide ${i + 1}: ${s.title}`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────── LOADING ─────────────────────────────── */
function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7 }}
    >
      <div className="stars-layer" />

      {["⭐", "🌟", "✨", "📚", "🎮", "🌈"].map((e, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 2) * 45}%`,
            fontSize: "2.2rem",
            opacity: 0.15,
          }}
          animate={{ y: [0, -22, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {e}
        </motion.span>
      ))}

      <div className="loading-content">
        <motion.img
          src="/professor-panda.png"
          alt="Professor Panda"
          className="loading-panda"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0, y: [0, -14, 0] }}
          transition={{
            scale: { duration: 0.8, ease: "backOut" },
            rotate: { duration: 0.8 },
            y: { duration: 2.5, repeat: Infinity, delay: 1 },
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h1 className="loading-title">GENIE-US</h1>
          <p className="loading-sub">Learning is Magic! 🪄</p>
        </motion.div>

        <motion.div
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="loading-dot"
              animate={{ y: [0, -10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
