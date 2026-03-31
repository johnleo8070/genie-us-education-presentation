import React from "react";
import { motion } from "framer-motion";

// Subject colors and icons
const subjectConfig = {
    English: { color: "#FF6B8A", bg: "rgba(255,107,138,0.15)", icon: "📖", border: "#FF6B8A" },
    Maths: { color: "#FFD700", bg: "rgba(255,215,0,0.15)", icon: "🔢", border: "#FFD700" },
    Science: { color: "#00E676", bg: "rgba(0,230,118,0.15)", icon: "🔬", border: "#00E676" },
    Coding: { color: "#00E5FF", bg: "rgba(0,229,255,0.15)", icon: "💻", border: "#00E5FF" },
    Music: { color: "#E040FB", bg: "rgba(224,64,251,0.15)", icon: "🎵", border: "#E040FB" },
};

const accentColors = [
    "#FFD700", "#00E5FF", "#FF6B8A", "#00E676", "#E040FB", "#FF9800",
];

// Media Placeholder Component
const MediaPlaceholder = ({ type, label, minHeight = "200px" }) => (
    <div className="media-placeholder" style={{ minHeight }}>
        <div className="video-placeholder-icon">
            {type === "video" ? "▶️" : "🖼️"}
        </div>
        <p className="font-cartoon text-yellow-400 text-base text-center">
            {type === "video" ? "🎬 Video Goes Here" : "🖼️ Image Goes Here"}
        </p>
        <p className="text-white/40 text-xs text-center font-body px-4">
            {label || (type === "video" ? "Drop your video here" : "Drop your image here")}
        </p>
    </div>
);

// Point Item Component
const PointItem = ({ text, index, accentColor }) => (
    <motion.div
        className="point-item"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.5 }}
    >
        <div
            className="point-bullet text-xs font-bold text-black"
            style={{ background: accentColor || "#FFD700" }}
        >
            {index + 1}
        </div>
        <p className="font-body text-white/85 text-sm md:text-base leading-relaxed">{text}</p>
    </motion.div>
);

// Professor Panda Sidebar
const PandaSidebar = ({ message, accentColor, size = "md" }) => (
    <div className="flex flex-col items-center gap-4">
        {/* Speech bubble above */}
        <div className="speech-bubble max-w-[200px]" style={{ borderColor: accentColor + "80" }}>
            <p className="font-cartoon text-sm text-center" style={{ color: accentColor }}>
                {message}
            </p>
        </div>
        {/* Panda image */}
        <motion.img
            src="/professor-panda.png"
            alt="Professor Panda"
            className={`object-contain drop-shadow-2xl ${size === "sm" ? "w-32 md:w-40" : "w-40 md:w-56"}`}
            style={{ filter: `drop-shadow(0 0 24px ${accentColor}40)` }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

// Standard Slide Layout
const StandardSlide = ({ slide, index }) => {
    const accent = slide.accentColor || accentColors[index % accentColors.length];

    return (
        <div
            id={`slide-${slide.id}`}
            className="slide-wrapper"
            style={{
                background: `radial-gradient(ellipse at 20% 30%, ${slide.bgColor || "#0d1a2d"} 0%, #050010 100%)`,
            }}
        >
            <div className="stars-layer" />

            {/* Floating decorations */}
            {["⭐", "✨", "🌟"].map((e, i) => (
                <span
                    key={i}
                    className="float-deco"
                    style={{ left: `${15 + i * 30}%`, top: `${15 + i * 25}%`, animationDelay: `${i * 2}s` }}
                >
                    {e}
                </span>
            ))}

            <div className="container relative z-10 min-h-screen flex flex-col justify-center py-28 lg:py-32">
                {/* Header row */}
                <motion.div
                    className="flex items-center gap-4 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="slide-badge">{slide.slideNumber}</div>
                    <div>
                        <h2
                            className="cartoon-title text-3xl md:text-4xl lg:text-5xl"
                            style={{ color: accent, textShadow: `2px 2px 0px rgba(0,0,0,0.5), 0 0 30px ${accent}40` }}
                        >
                            {slide.icon} {slide.title}
                        </h2>
                    </div>
                </motion.div>

                {/* Divider */}
                <div
                    className="h-1 w-32 rounded-full mb-8"
                    style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                />

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Points */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {slide.points?.map((point, i) => (
                            <PointItem key={i} text={point} index={i} accentColor={accent} />
                        ))}

                        {/* Subjects (slide 5) */}
                        {slide.subjects && (
                            <motion.div
                                className="flex flex-wrap gap-3 mt-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                {slide.subjects.map((subj) => {
                                    const cfg = subjectConfig[subj] || {};
                                    return (
                                        <div
                                            key={subj}
                                            className="subject-pill"
                                            style={{
                                                background: cfg.bg || "rgba(255,255,255,0.1)",
                                                borderColor: cfg.border || "#fff",
                                                color: cfg.color || "#fff",
                                            }}
                                        >
                                            <span>{cfg.icon}</span>
                                            <span className="font-cartoon">{subj}</span>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* Milestones (slide 15) */}
                        {slide.milestones && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                {slide.milestones.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        className="milestone-card"
                                        style={{ borderColor: accentColors[i % accentColors.length] }}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                    >
                                        <div className="text-4xl mb-3">{m.icon}</div>
                                        <div
                                            className="font-cartoon text-base mb-1"
                                            style={{ color: accentColors[i % accentColors.length] }}
                                        >
                                            {m.phase}
                                        </div>
                                        <p className="font-body text-white/80 text-sm">{m.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Media placeholder */}
                        {(slide.videoPlaceholder || slide.imagePlaceholder) && (
                            <div className="mt-4">
                                <MediaPlaceholder
                                    type={slide.videoPlaceholder ? "video" : "image"}
                                    label={
                                        slide.videoPlaceholder
                                            ? `Video: ${slide.videoPlaceholder}`
                                            : `Image: ${slide.imagePlaceholder}`
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* Panda sidebar */}
                    <div className="hidden lg:flex justify-center items-start pt-4">
                        <PandaSidebar message={slide.pandaMessage} accentColor={accent} />
                    </div>
                </div>

                {/* Mobile Panda */}
                <div className="flex lg:hidden justify-center mt-8">
                    <PandaSidebar message={slide.pandaMessage} accentColor={accent} size="sm" />
                </div>
            </div>
        </div>
    );
};

// CTA / Closing Slide
const CTASlide = ({ slide }) => {
    const accent = slide.accentColor || "#FFD700";

    return (
        <div
            id={`slide-${slide.id}`}
            className="slide-wrapper"
            style={{
                background: `radial-gradient(ellipse at 50% 40%, ${slide.bgColor} 0%, #050010 100%)`,
            }}
        >
            <div className="stars-layer" />
            <div className="container relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 py-28">
                {/* Panda large */}
                <div className="flex flex-col items-center gap-4">
                    <div className="speech-bubble max-w-[220px]" style={{ borderColor: accent + "90" }}>
                        <p className="font-cartoon text-base text-center" style={{ color: accent }}>
                            {slide.pandaMessage}
                        </p>
                    </div>
                    <motion.img
                        src="/professor-panda.png"
                        alt="Professor Panda"
                        className="w-48 md:w-64 object-contain"
                        style={{ filter: `drop-shadow(0 0 40px ${accent}50)` }}
                        animate={{ y: [0, -16, 0], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 max-w-2xl">
                    <motion.div
                        className="flex items-center gap-4 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="slide-badge">{slide.slideNumber}</div>
                        <h2
                            className="cartoon-title text-3xl md:text-5xl"
                            style={{ color: accent, textShadow: `2px 2px 0 rgba(0,0,0,0.5), 0 0 30px ${accent}50` }}
                        >
                            {slide.icon} {slide.title}
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-4 mb-8">
                        {slide.points?.map((point, i) => (
                            <PointItem key={i} text={point} index={i} accentColor={accent} />
                        ))}
                    </div>

                    {slide.type === "cta" && (
                        <div className="flex flex-wrap gap-4 mt-4">
                            <a
                                href="mailto:hello@genie-us.com"
                                id="contact-cta-btn"
                                className="font-cartoon px-8 py-3 rounded-full text-black text-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${accent}, #FF6D00)`,
                                    boxShadow: `0 6px 24px ${accent}50`,
                                }}
                            >
                                📧 Get In Touch
                            </a>
                            <a
                                href="#slide-1"
                                id="back-to-top-btn"
                                className="font-cartoon px-8 py-3 rounded-full text-white text-lg border-2 border-white/30 hover:bg-white/10 transition-all"
                            >
                                ⬆️ Back to Top
                            </a>
                        </div>
                    )}

                    {slide.type === "closing" && (
                        <a
                            href="#slide-1"
                            id="restart-btn"
                            className="font-cartoon px-10 py-4 rounded-full text-black text-xl inline-block mt-4"
                            style={{
                                background: `linear-gradient(135deg, ${accent}, #FF6D00)`,
                                boxShadow: `0 6px 30px ${accent}60`,
                            }}
                        >
                            🐼 Start Again!
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main Slides Component
const Slides = ({ slides }) => {
    return (
        <div>
            {slides.map((slide, index) => {
                if (slide.type === "title") return null; // Rendered by HeroSection

                if (slide.type === "cta" || slide.type === "closing") {
                    return <CTASlide key={slide.id} slide={slide} />;
                }

                return <StandardSlide key={slide.id} slide={slide} index={index} />;
            })}
        </div>
    );
};

export default Slides;
