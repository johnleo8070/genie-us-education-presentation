import React from "react";
import { motion } from "framer-motion";

/* ──────────────── helpers & sub-components ──────────────── */

const accentPool = ["#F97316", "#3B82F6", "#EAB308", "#22C55E", "#A855F7", "#EC4899"];

// Magical Blobs
function BackgroundMagic({ accent }) {
    return (
        <div className="blob-layer">
            <div className="blob w-[600px] h-[600px] -top-60 -left-40" style={{ background: `${accent}25` }} />
            <div className="blob w-[500px] h-[500px] bottom-0 right-0" style={{ background: `var(--panda-yellow)20` }} />
            <div className="blob w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: `var(--panda-blue)10` }} />
        </div>
    );
}

// Animation variants
const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Panda panel ─── */
function PandaPanel({ message, accentColor, large = false }) {
    return (
        <motion.div
            className={`panda-panel flex flex-col items-center gap-4 ${large ? "scale-110" : "scale-90"}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="speech-bubble font-cartoon text-sm text-slate-600">
                <p>{message}</p>
            </div>
            <motion.img
                src="/professor-panda.png"
                alt="Professor Panda"
                className={large ? "w-64 md:w-80" : "w-48 md:w-56"}
                style={{ filter: `drop-shadow(0 20px 40px ${accentColor}40)` }}
                animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
    );
}

/* ─── Media Placeholder ─── */
function MediaDisplay({ image, video, label }) {
    if (video) {
        const getEmbedUrl = (url) => {
            if (!url) return null;
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            const id = (match && match[2].length === 11) ? match[2] : null;
            return id ? `https://www.youtube.com/embed/${id}` : null;
        };
        const embedUrl = getEmbedUrl(video);

        return (
            <motion.div
                className="relative group w-full aspect-video"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-400 to-purple-300 rounded-[40px] opacity-20 blur-3xl group-hover:opacity-50 transition-opacity" />
                <div className="relative z-10 w-full h-full rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-4 border-white/60 transform group-hover:scale-[1.02] transition-transform duration-500">
                    <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title={label}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </motion.div>
        );
    }
    if (image) {
        return (
            <motion.div
                className="relative group w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute -inset-6 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-[40px] opacity-20 blur-3xl group-hover:opacity-50 transition-opacity" />
                <img src={image} alt={label} className="relative z-10 w-full rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-4 border-white/60 transform group-hover:scale-[1.02] transition-transform duration-500" />
            </motion.div>
        );
    }
    return (
        <div className="liquid-glass border-dashed border-2 flex flex-col items-center justify-center p-12 min-h-[300px]">
            <span className="text-4xl mb-4">🖼️</span>
            <p className="font-cartoon text-slate-400">Magic Media Needed</p>
        </div>
    );
}

/* ─── Bullet point ─── */
function BulletPoint({ text, index, accentColor }) {
    return (
        <motion.div className="flex gap-3 p-3 lg:p-4 liquid-glass border-none hover:bg-white/60 transition-all group" variants={fadeUp}>
            <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-cartoon text-sm shadow-lg shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
            >
                {index + 1}
            </div>
            <p className="text-slate-600 font-body text-sm md:text-base leading-relaxed">{text}</p>
        </motion.div>
    );
}

/* ─── Section Card ─── */
function SectionCard({ section, accentColor }) {
    return (
        <motion.div className="liquid-glass p-5 border-white/40 transition-all duration-500 hover:-translate-y-1 hover:bg-white/50 flex flex-col h-full" variants={fadeUp}>
            <h4 className="font-cartoon text-lg mb-4 flex items-center gap-2" style={{ color: accentColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                {section.title}
            </h4>
            <div className="space-y-2 flex-grow">
                {section.items.map((item, i) => (
                    <div key={i} className="flex gap-2 items-start group">
                        <span className="text-orange-400 text-[10px] mt-1.5 transition-transform group-hover:scale-150 shrink-0">✦</span>
                        <p className="text-xs md:text-sm text-slate-500 font-body leading-snug">{item}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/* ── 1. TITLE SLIDE ── */
function TitleSlide({ slide }) {
    const hasText = !!(slide.title || slide.subtitle || slide.tag);

    return (
        <div className="slide-full bg-white flex items-center justify-center min-h-screen w-full relative">
            <BackgroundMagic accent="var(--panda-orange)" />

            <div className={`container relative z-10 mx-auto px-12 ${hasText ? 'grid lg:grid-cols-2 gap-16 items-center' : 'flex flex-col items-center justify-center'}`}>
                {hasText && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                                <span className="text-white font-cartoon text-xl">01</span>
                            </div>
                            <span className="font-cartoon text-orange-500 tracking-widest text-sm uppercase">{slide.tag}</span>
                        </div>

                        <h1 className="liquid-text text-7xl md:text-8xl lg:text-9xl mb-6 -ml-[60px]">
                            {slide.title}
                        </h1>

                        <h2 className="font-bubble text-3xl md:text-5xl text-slate-600 mb-10 leading-tight -ml-[10px]">
                            {slide.subtitle}
                        </h2>

                        <div className="flex flex-wrap gap-5">
                            <button className="liquid-btn primary text-lg">🚀 START ADVENTURE</button>
                            <button className="liquid-btn text-orange-500 hover:text-orange-600">
                                WATCH DEMO
                            </button>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    className="relative flex justify-center w-full"
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "backOut" }}
                >
                    <div className={`relative z-10 w-full ${hasText ? 'lg:w-[120%] lg:-ml-[10%]' : 'max-w-4xl px-4'}`}>
                        {(slide.image || slide.video) ? (
                            <MediaDisplay
                                image={slide.image}
                                video={slide.video}
                                label={slide.title}
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-10">
                                
                                <PandaPanel message={slide.pandaMessage} accentColor="var(--panda-orange)" large />
                            </div>
                        )}
                        {(slide.image || slide.video) && (
                            <div className="absolute -bottom-16 -right-16 hidden xl:block">
                                <PandaPanel message={slide.pandaMessage} accentColor="var(--panda-orange)" large />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ── 2. STANDARD SLIDE ── */
function StandardSlide({ slide, index }) {
    const accent = accentPool[index % accentPool.length];

    return (
        <div className="slide-full bg-white h-screen w-full relative overflow-hidden flex flex-col">
            <BackgroundMagic accent={accent} />

            <div className="container relative z-10 flex flex-col h-full mx-auto px-6 md:px-12 pt-24 pb-12">
                {/* Header */}
                <motion.div
                    className="flex items-center gap-6 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-white text-2xl font-cartoon shadow-xl transform -rotate-3" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}>
                        {slide.slideNumber}
                    </div>
                    <h2 className="font-cartoon text-4xl md:text-6xl" style={{ color: accent }}>
                        {slide.icon} {slide.title}
                    </h2>
                    <div className="flex-grow h-1 bg-slate-100/50 rounded-full ml-8 hidden md:block" />
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 flex-grow overflow-hidden">
                    {/* Content Area - Scrollable */}
                    <div className="lg:col-span-8 xl:col-span-8 h-full overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
                        <motion.div className="space-y-10" variants={staggerContainer} initial="hidden" animate="show">
                            {slide.paragraphs && (
                                <div className="space-y-6 max-w-4xl">
                                    {slide.paragraphs.map((p, i) => (
                                        <motion.p key={i} className="text-slate-600 font-body text-base md:text-lg leading-relaxed liquid-glass p-6 border-none italic" variants={fadeUp}>
                                            {p}
                                        </motion.p>
                                    ))}
                                </div>
                            )}

                            {slide.sections && (
                                <motion.div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6" variants={staggerContainer} initial="hidden" animate="show">
                                    {slide.sections.map((sec, i) => (
                                        <SectionCard key={i} section={sec} accentColor={accent} />
                                    ))}
                                </motion.div>
                            )}

                            {slide.content && (
                                <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerContainer} initial="hidden" animate="show">
                                    {slide.content.map((group, i) => (
                                        <motion.div key={i} className="liquid-glass p-8 group hover:bg-white/50 transition-all border-none" variants={fadeUp}>
                                            <h3 className="font-cartoon text-2xl mb-6 flex items-center gap-3" style={{ color: accent }}>
                                                <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: accent }} />
                                                {group.title}
                                            </h3>
                                            <div className="space-y-4">
                                                {group.items.map((item, j) => (
                                                    <div key={j} className="flex gap-4 items-start">
                                                        <span className="text-xl shrink-0" style={{ color: accent }}>✔</span>
                                                        <p className="text-slate-600 font-body text-sm md:text-base leading-relaxed">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {slide.points && (
                                <motion.div className="grid md:grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" animate="show">
                                    {slide.points.map((pt, i) => (
                                        <BulletPoint key={i} text={pt} index={i} accentColor={accent} />
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>

                        {slide.milestones && (
                            <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12" variants={staggerContainer} initial="hidden" animate="show">
                                {slide.milestones.map((m, i) => (
                                    <motion.div key={i} className="liquid-glass p-6 text-center group hover:bg-white/50 transition-all" variants={fadeUp} style={{ borderColor: `${accentPool[i % accentPool.length]}40` }}>
                                        <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{m.icon}</div>
                                        <div className="font-cartoon text-slate-800 mb-2">{m.phase}</div>
                                        <p className="text-sm font-body text-slate-500 leading-relaxed">{m.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Scroll hint for dense slides */}
                        <motion.div
                            className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm animate-bounce opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 2 }}
                        >
                            <span>Scroll for more</span>
                            <span className="text-lg">↓</span>
                        </motion.div>
                    </div>

                    {/* Media */}
                    <div className="lg:col-span-4 flex flex-col gap-8 items-center justify-center">
                        {(slide.image || slide.video) ? (
                            <MediaDisplay
                                image={slide.image}
                                video={slide.video}
                                label={slide.title}
                            />
                        ) : (
                            <div className="hidden lg:block w-full">
                                <PandaPanel message={slide.pandaMessage} accentColor={accent} large />
                            </div>
                        )}
                        {(slide.image || slide.video) && <PandaPanel message={slide.pandaMessage} accentColor={accent} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── 3. CTA / CLOSING SLIDE ── */
function CTASlide({ slide, index }) {
    const accent = accentPool[index % accentPool.length];

    return (
        <div className="slide-full bg-white h-screen w-full relative overflow-hidden flex flex-col">
            <BackgroundMagic accent={accent} />
            <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mx-auto px-6 md:px-12 pt-24 pb-12 h-full overflow-hidden">
                <motion.div
                    className="flex flex-col gap-6 justify-center items-center w-full lg:w-2/5 h-full overflow-y-auto pt-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {(slide.image || slide.video) ? (
                        <div className="w-full">
                            <MediaDisplay
                                image={slide.image}
                                video={slide.video}
                                label={slide.title}
                            />
                        </div>
                    ) : (
                        <PandaPanel message={slide.pandaMessage} accentColor={accent} large />
                    )}
                    {(slide.image || slide.video) && <PandaPanel message={slide.pandaMessage} accentColor={accent} />}
                </motion.div>

                <motion.div
                    className="w-full lg:w-3/5 h-full overflow-y-auto pr-6 custom-scrollbar scroll-smooth pt-10"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-3xl bg-orange-500 flex items-center justify-center text-white font-cartoon text-2xl shadow-xl transform -rotate-6">
                            {slide.slideNumber}
                        </div>
                        <h2 className="font-cartoon text-5xl md:text-7xl" style={{ color: accent }}>{slide.title}</h2>
                    </div>

                    <div className="space-y-6 mb-12">
                        {slide.points?.map((pt, i) => (
                            <BulletPoint key={i} text={pt} index={i} accentColor={accent} />
                        ))}
                        {slide.paragraphs?.map((p, i) => (
                            <motion.p key={i} className="text-slate-600 font-body text-base italic liquid-glass p-5 border-none" variants={fadeUp}>
                                {p}
                            </motion.p>
                        ))}
                    </div>

                    {/* Scroll hint */}
                    <motion.div
                        className="mb-8 flex items-center justify-center gap-2 text-slate-400 text-sm animate-bounce opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 2 }}
                    >
                        <span>Scroll for more content</span>
                        <span className="text-lg">↓</span>
                    </motion.div>

                    <div className="flex flex-wrap gap-6">
                        <button className="liquid-btn primary text-2xl px-12 py-6">✨ GET STARTED NOW</button>
                        {slide.type === "cta" && (
                            <button className="liquid-btn px-12 py-6 text-slate-500">
                                CONTACT SUPPORT
                            </button>
                        )}
                    </div>
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
