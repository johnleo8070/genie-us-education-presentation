import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function HeroSection() {
  const pandaRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lampRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.8)" } });

    // Animate title
    tl.fromTo(
      titleRef.current,
      { y: -80, opacity: 0, scale: 0.6 },
      { y: 0, opacity: 1, scale: 1, duration: 1.4 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        "-=0.8"
      )
      .fromTo(
        pandaRef.current,
        { x: 120, opacity: 0, scale: 0.5 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2 },
        "-=1.0"
      )
      .fromTo(
        lampRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.5"
      );

    // Panda bounce loop
    gsap.to(pandaRef.current, {
      y: -16,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.8,
    });

    // Lamp sparkle
    gsap.to(lampRef.current, {
      rotate: 8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      id="slide-1"
      className="slide-wrapper relative"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, #1a0a6e 0%, #0d0030 50%, #000820 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Stars layer */}
      <div className="stars-layer" />

      {/* Floating emojis */}
      {["⭐", "🌟", "✨", "🎓", "📚", "🎮", "🌈", "🪄"].map((emoji, i) => (
        <span
          key={i}
          className="float-deco"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
            fontSize: `${1.5 + (i % 3) * 0.5}rem`,
            opacity: 0.12 + (i % 3) * 0.05,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${7 + i}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Content */}
      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 py-28">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Slide Badge */}
          <div className="mb-6 flex items-center gap-3">
            <div className="slide-badge">01</div>
            <span
              className="font-cartoon text-yellow-400 text-lg tracking-widest"
              style={{ textShadow: "1px 1px 0 #00008b" }}
            >
              TITLE SLIDE
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="cartoon-title title-slide-glow text-6xl md:text-8xl lg:text-9xl mb-4 text-yellow-400"
          >
            GENIE-US
          </h1>

          {/* Lamp icon */}
          <div ref={lampRef} className="mb-6 text-5xl">
            🪄
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef}>
            <h2
              className="font-bubble text-xl md:text-2xl lg:text-3xl text-cyan-300 mb-6"
              style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}
            >
              Transforming Early Childhood Learning Through Play
            </h2>

            <p className="font-body text-white/70 text-base mb-8">
              A Board Presentation · {new Date().getFullYear()}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#slide-2"
                id="explore-btn"
                className="font-cartoon px-8 py-3 rounded-full text-black text-lg"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FF6D00)",
                  boxShadow: "0 6px 24px rgba(255,165,0,0.5)",
                }}
              >
                🚀 Explore Presentation
              </a>
              <a
                href="#slide-18"
                id="partner-btn"
                className="font-cartoon px-8 py-3 rounded-full text-white text-lg border-2 border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
              >
                🤝 Partner With Us
              </a>
            </div>
          </div>
        </div>

        {/* Right: Professor Panda + Video Placeholder */}
        <div className="flex-1 flex flex-col items-center gap-6 relative">
          {/* Professor Panda */}
          <div ref={pandaRef} className="relative">
            <img
              src="/professor-panda.png"
              alt="Professor Panda — GENIE-US Mascot"
              className="w-64 md:w-80 lg:w-96 object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 40px rgba(255,215,0,0.4))" }}
            />
            {/* Speech bubble */}
            <div
              className="speech-bubble absolute -top-12 -left-4 md:-left-16 max-w-[180px]"
            >
              <p className="font-cartoon text-yellow-300 text-sm text-center">
                Welcome! Let's learn together! 🎓
              </p>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="media-placeholder w-full max-w-sm" style={{ minHeight: "180px" }}>
            <div className="video-placeholder-icon">▶️</div>
            <p className="font-cartoon text-yellow-400 text-base text-center">
              🎬 Video Goes Here
            </p>
            <p className="text-white/40 text-xs text-center font-body px-4">
              Drop your intro video here
            </p>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce">
        <span className="text-white/50 text-xs font-cartoon tracking-widest">SCROLL DOWN</span>
        <span className="text-yellow-400 text-xl">↓</span>
      </div>
    </div>
  );
}

export default HeroSection;
