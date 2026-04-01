import React from "react";
import { motion } from "framer-motion";

/* ──────────────── helpers & sub-components ──────────────── */

const subjectConfig = {
    English: { color: "#EC4899", bg: "rgba(236,72,153,0.1)", icon: "📖", border: "#EC4899" },
    Maths: { color: "#EAB308", bg: "rgba(234,179,8,0.1)", icon: "🔢", border: "#EAB308" },
    Science: { color: "#22C55E", bg: "rgba(34,197,94,0.1)", icon: "🔬", border: "#22C55E" },
    Coding: { color: "#F97316", bg: "rgba(249,115,22,0.1)", icon: "💻", border: "#F97316" },
    Music: { color: "#A855F7", bg: "rgba(168,85,247,0.1)", icon: "🎵", border: "#A855F7" },
};

const accentPool = ["#F97316", "#3B82F6", "#EAB308", "#22C55E", "#A855F7", "#EC4899"];

const bgGradients = [
    "linear-gradient(to bottom, #E0E7FF, #C7D2FE, #ffffff)", // Indigo
    "linear-gradient(to bottom, #ffffff, #E0F2FE, #ffffff)", // Sky
    "linear-gradient(to bottom, #FFF8E7, #ffffff)",          // Yellow
    "linear-gradient(to bottom, #ffffff, #FEF3C7, #fde68a50)", // Amber
    "linear-gradient(to bottom, #f5f3ff, #ede9fe, #ffffff)",   // Purple
];

// Stagger wrapper
const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Panda panel ─── */
function PandaPanel({ message, accentColor, large = false }) {
    return (
        <div className={`panda-panel ${large ? "panda-panel--large" : ""}`}>
            <div className="speech-bubble" style={{ borderColor: accentColor + "80" }}>
                <p className="font-cartoon text-sm text-center" style={{ color: accentColor }}>
                    {message}
                </p>
            </div>
            <motion.img
                src="/professor-panda.png"
                alt="Professor Panda"
                className={large ? "panda-img-large" : "panda-img"}
                style={{ filter: `drop-shadow(0 0 28px ${accentColor}50)` }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

/* ─── YouTube embed ─── */
function YouTubeEmbed({ videoId, compact = false }) {
    return (
        <div
            className="youtube-embed-wrap"
            style={{
                aspectRatio: "16/9",
                width: "100%",
                maxHeight: compact ? 220 : 320,
            }}
        >
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
                title="GENIE-US Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                loading="lazy"
            />
        </div>
    );
}

/* ─── Media placeholder ─── */
function MediaPlaceholder({ type, label, compact = false }) {
    return (
        <div className={`media-placeholder ${compact ? "media-placeholder--compact" : ""}`}>
            <div className="video-placeholder-icon" style={{ borderColor: 'var(--panda-orange)' }}>
                {type === "video" ? "▶️" : "🖼️"}
            </div>
            <p className="font-cartoon text-sm text-center" style={{ color: 'var(--panda-orange)' }}>
                {type === "video" ? "🎬 Video Goes Here" : "🖼️ Image Goes Here"}
            </p>
            {label && <p className="text-xs text-center font-body px-3 text-slate-400">{label}</p>}
        </div>
    );
}

/* ─── Bullet point ─── */
function BulletPoint({ text, index, accentColor }) {
    return (
        <motion.div className="point-item" variants={fadeUp}>
            <div
                className="point-bullet"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
            >
                <span className="text-white text-xs font-bold">{index + 1}</span>
            </div>
            <p className="font-body text-slate-700 text-sm md:text-base leading-relaxed">{text}</p>
        </motion.div>
    );
}

/* ──────────────────────────────────────────────────────────
   SLIDE LAYOUTS
────────────────────────────────────────────────────────── */

/* ── 1. TITLE SLIDE ── */
function TitleSlide({ slide }) {
    return (
        <div
            className="slide-full"
            style={{
                background: bgGradients[0],
            }}
        >
            <div className="blob-layer">
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '150px', height: '150px', background: 'rgba(249,115,22,0.1)', filter: 'blur(30px)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '250px', height: '250px', background: 'rgba(59,130,246,0.1)', filter: 'blur(30px)', borderRadius: '50%' }} />
            </div>
            {/* Soft floating emojis (reduced from dark mode stars) */}
            {["⭐", "📚", "🪄", "🎓", "🎮"].map((e, i) => (
                <span key={i} className="float-deco"
                    style={{
                        left: `${15 + i * 18}%`, top: `${20 + (i % 2) * 30}%`,
                        animationDelay: `${i * 1.5}s`, animationDuration: `${6 + i}s`
                    }}>
                    {e}
                </span>
            ))}

            <div className="container slide-inner slide-inner--title">
                {/* Left */}
                <motion.div
                    className="title-left"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="slide-badge-row mb-6">
                        <div className="slide-badge">01</div>
                        <span className="font-cartoon text-sm" style={{ color: 'var(--panda-blue)' }}>PRESENTATION START</span>
                    </div>

                    <motion.h1
                        className="cartoon-title title-gradient text-hero"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.7, ease: "backOut" }}
                    >
                        GENIE-US
                    </motion.h1>

                    <motion.div
                        className="lamp-icon"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >🪄</motion.div>

                    <motion.h2
                        className="font-bubble text-slate-600 text-xl md:text-2xl lg:text-3xl mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Transforming Early Childhood Learning Through Play
                    </motion.h2>

                    <p className="font-body text-slate-400 text-sm mb-6">Board Presentation · {new Date().getFullYear()}</p>

                    <div className="flex flex-wrap gap-3">
                        <div className="cta-btn-primary">🚀 Explore Presentation</div>
                        <div className="cta-btn-secondary">🤝 Partner With Us</div>
                    </div>
                </motion.div>

                {/* Right */}
                <motion.div
                    className="title-right"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                    <div className="speech-bubble mb-6" style={{ maxWidth: 220 }}>
                        <p className="font-cartoon text-sm text-center" style={{ color: 'var(--panda-orange)' }}>
                            {slide.pandaMessage}
                        </p>
                    </div>
                    <motion.img
                        src="/professor-panda.png"
                        alt="Professor Panda"
                        className="panda-title-img"
                        style={{ filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.15))" }}
                        animate={{ y: [0, -18, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    {slide.videoPlaceholder && (
                        <div className="mt-6 w-full max-w-xs">
                            <MediaPlaceholder type="video" label="Intro video" compact />
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

/* ── 2. STANDARD SLIDE (most slides) ── */
function StandardSlide({ slide, index }) {
    const accent = accentPool[index % accentPool.length];
    const bgGrad = bgGradients[(index + 1) % bgGradients.length];

    return (
        <div
            className="slide-full"
            style={{
                background: bgGrad,
            }}
        >
            <div className="blob-layer">
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: `${accent}15`, filter: 'blur(50px)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '0%', right: '0%', width: '200px', height: '200px', background: `rgba(249,115,22,0.1)`, filter: 'blur(40px)', borderRadius: '50%' }} />
            </div>
            {["⭐", "✨", "🌟"].map((e, i) => (
                <span key={i} className="float-deco"
                    style={{ left: `${15 + i * 30}%`, top: `${12 + i * 25}%`, animationDelay: `${i * 2}s` }}>
                    {e}
                </span>
            ))}

            <div className="container slide-inner slide-inner--standard">
                {/* ─ LEFT PANE ─ */}
                <div className="standard-left">
                    {/* Slide header */}
                    <motion.div
                        className="slide-badge-row mb-4"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="slide-badge">{slide.slideNumber}</div>
                        <h2
                            className="cartoon-title text-2xl md:text-3xl lg:text-4xl"
                            style={{
                                color: accent,
                            }}
                        >
                            {slide.icon} {slide.title}
                        </h2>
                    </motion.div>

                    {/* Divider */}
                    <div
                        className="h-1 rounded-full mb-5"
                        style={{ width: 80, background: `linear-gradient(90deg, ${accent}, transparent)` }}
                    />

                    {/* Bullet points */}
                    <motion.div
                        className="flex flex-col gap-3"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        {slide.points?.map((pt, i) => (
                            <BulletPoint key={i} text={pt} index={i} accentColor={accent} />
                        ))}
                    </motion.div>

                    {/* Subjects grid */}
                    {slide.subjects && (
                        <motion.div
                            className="flex flex-wrap gap-2 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                        >
                            {slide.subjects.map((subj) => {
                                const cfg = subjectConfig[subj] || {};
                                return (
                                    <div
                                        key={subj}
                                        className="subject-pill"
                                        style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                                    >
                                        <span>{cfg.icon}</span>
                                        <span className="font-cartoon">{subj}</span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* Milestones */}
                    {slide.milestones && (
                        <motion.div
                            className="grid grid-cols-3 gap-3 mt-4"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                        >
                            {slide.milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    className="milestone-card"
                                    style={{ borderColor: accentPool[i % accentPool.length] }}
                                    variants={fadeUp}
                                >
                                    <div className="text-3xl mb-2">{m.icon}</div>
                                    <div className="font-cartoon text-sm mb-1"
                                        style={{ color: accentPool[i % accentPool.length] }}>
                                        {m.phase}
                                    </div>
                                    <p className="font-body text-slate-600 text-xs leading-snug">{m.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Media: YouTube or placeholder */}
                    {slide.youtubeId ? (
                        <div className="mt-4">
                            <YouTubeEmbed videoId={slide.youtubeId} compact />
                        </div>
                    ) : (slide.videoPlaceholder || slide.imagePlaceholder) ? (
                        <div className="mt-4">
                            <MediaPlaceholder
                                type={slide.videoPlaceholder ? "video" : "image"}
                                label={slide.videoPlaceholder || slide.imagePlaceholder}
                                compact
                            />
                        </div>
                    ) : null}
                </div>

                {/* ─ RIGHT PANE — Panda ─ */}
                <motion.div
                    className="standard-right"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <PandaPanel message={slide.pandaMessage} accentColor={accent} />
                </motion.div>
            </div>
        </div>
    );
}

/* ── 3. CTA / CLOSING SLIDE ── */
function CTASlide({ slide, index }) {
    const accent = accentPool[index % accentPool.length] || "var(--panda-orange)";
    const bgGrad = bgGradients[(index + 1) % bgGradients.length] || bgGradients[0];

    return (
        <div
            className="slide-full"
            style={{
                background: bgGrad,
            }}
        >
            <div className="blob-layer">
                <div style={{ position: 'absolute', top: '20%', left: '30%', width: '300px', height: '300px', background: `${accent}15`, filter: 'blur(50px)', borderRadius: '50%' }} />
            </div>

            <div className="container slide-inner slide-inner--cta">
                {/* Panda large left */}
                <motion.div
                    className="cta-panda-wrap"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="speech-bubble mb-4" style={{ maxWidth: 220, borderColor: accent + "90" }}>
                        <p className="font-cartoon text-base text-center" style={{ color: accent }}>
                            {slide.pandaMessage}
                        </p>
                    </div>
                    <motion.img
                        src="/professor-panda.png"
                        alt="Professor Panda"
                        className="panda-img-large"
                        style={{ filter: `drop-shadow(0 15px 30px rgba(0,0,0,0.15))` }}
                        animate={{ y: [0, -18, 0], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </motion.div>

                {/* Content right */}
                <motion.div
                    className="cta-content"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <div className="slide-badge-row mb-5">
                        <div className="slide-badge">{slide.slideNumber}</div>
                        <h2
                            className="cartoon-title text-3xl md:text-4xl"
                            style={{ color: accent }}
                        >
                            {slide.icon} {slide.title}
                        </h2>
                    </div>

                    <motion.div
                        className="flex flex-col gap-3 mb-6"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        {slide.points?.map((pt, i) => (
                            <BulletPoint key={i} text={pt} index={i} accentColor={accent} />
                        ))}
                    </motion.div>

                    {slide.type === "cta" && (
                        <div className="flex flex-wrap gap-3 mt-2">
                            <a href="mailto:hello@genie-us.com" className="cta-btn-primary">📧 Get In Touch</a>
                            <div className="cta-btn-secondary">⬆️ Back to Start</div>
                        </div>
                    )}

                    {slide.type === "closing" && (
                        <div className="cta-btn-primary inline-flex mt-2 cursor-default">
                            🐼 Thank You — Learning is Magic!
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

/* ──────────────── MAIN ROUTER ──────────────── */
export default function SlideRenderer({ slide, index, total }) {
    if (slide.type === "title") return <TitleSlide slide={slide} index={index} />;
    if (slide.type === "cta" || slide.type === "closing")
        return <CTASlide slide={slide} index={index} />;
    return <StandardSlide slide={slide} index={index} />;
}
