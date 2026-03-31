import { navItems } from "../data";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const menuVars = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } },
  exit: { scaleY: 0, transition: { delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const containerVars = {
  initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } },
};

const mobileLinkVars = {
  initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
  open: { y: 0, transition: { ease: [0, 0.55, 0.45, 1], duration: 0.7 } },
};

const MobileNavLink = ({ title, href, handleClick }) => (
  <motion.div
    variants={mobileLinkVars}
    className="text-4xl font-cartoon text-white hover:text-yellow-400 transition-colors"
    onClick={() => handleClick(false)}
  >
    <a href={href}>{title}</a>
  </motion.div>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <>
      {/* TICKER TAPE */}
      <div className="ticker-wrap fixed top-0 left-0 right-0 z-[101]">
        <div className="ticker-move font-cartoon text-sm text-black font-bold tracking-wide">
          {Array(6).fill("✨ GENIE-US — Learning is Magic! 🐼 Professor Panda welcomes you! 🌟 Early Childhood Learning Revolution! 🎓 ").join("")}
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="genieus-header" style={{ top: "28px" }}>
        <div className="container py-3 flex gap-6 items-center justify-between">
          {/* Logo */}
          <header>
            <a href="/" className="flex items-center gap-3">
              <img
                src="/professor-panda.png"
                alt="Professor Panda"
                className="w-10 h-10 object-contain rounded-full border-2 border-yellow-400"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-cartoon text-2xl text-yellow-400 tracking-widest" style={{ textShadow: "2px 2px 0 #00008b" }}>
                  GENIE-US
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  Learning is Magic!
                </span>
              </div>
            </a>
          </header>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-1 items-center">
            {navItems.map(({ title, link }, index) => (
              <a
                key={index}
                href={link}
                className="font-cartoon text-sm px-4 py-2 rounded-full text-white hover:text-yellow-400 hover:bg-white/10 transition-all duration-200"
              >
                {title}
              </a>
            ))}
            <a
              href="#slide-18"
              className="ml-2 font-cartoon text-sm px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:opacity-90 transition-all"
              style={{ boxShadow: "0 4px 16px rgba(255,165,0,0.4)" }}
            >
              🤝 Partner With Us
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            className="lg:hidden font-cartoon text-yellow-400 text-base border border-yellow-400/40 px-3 py-1 rounded-full"
            onClick={toggleMenu}
          >
            ☰ MENU
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top z-[200]"
            style={{ background: "linear-gradient(135deg, #0d0030, #1a0a4e)" }}
          >
            {/* Stars decoration */}
            <div className="stars-layer" />
            <div className="container h-full flex flex-col py-8">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <img src="/professor-panda.png" alt="Panda" className="w-12 h-12 object-contain" />
                  <span className="font-cartoon text-2xl text-yellow-400">GENIE-US</span>
                </div>
                <button
                  id="close-menu-btn"
                  className="font-cartoon text-white text-base border border-white/30 px-4 py-1 rounded-full hover:border-yellow-400 transition-colors"
                  onClick={toggleMenu}
                >
                  ✕ CLOSE
                </button>
              </div>

              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center items-center gap-6 relative z-10"
              >
                {navItems.map((link, index) => (
                  <div className="overflow-hidden" key={index}>
                    <MobileNavLink title={link.title} href={link.link} handleClick={setOpen} />
                  </div>
                ))}
                <div className="overflow-hidden mt-4">
                  <motion.div
                    variants={mobileLinkVars}
                    className="font-cartoon text-3xl"
                    onClick={() => setOpen(false)}
                  >
                    <a
                      href="#slide-18"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black inline-block"
                    >
                      🤝 Partner With Us
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
