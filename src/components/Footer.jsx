import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="py-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0020, #000010)",
        borderTop: "2px solid rgba(255,215,0,0.15)",
      }}
    >
      {/* Stars */}
      <div className="stars-layer opacity-50" />

      <div className="container relative z-10">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/professor-panda.png"
              alt="Professor Panda"
              className="w-14 h-14 object-contain"
              style={{ filter: "drop-shadow(0 0 12px rgba(255,215,0,0.4))" }}
            />
            <div>
              <div className="font-cartoon text-2xl text-yellow-400" style={{ textShadow: "2px 2px 0 #00008b" }}>
                GENIE-US
              </div>
              <div className="text-xs text-cyan-400 font-bold tracking-widest">
                Learning is Magic! 🪄
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-cartoon text-yellow-400 text-base">Follow the Adventure!</h3>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noreferrer" id="footer-instagram">
                <AiFillInstagram className="w-7 h-7 hover:scale-125 transition-transform" style={{ fill: "#FF6B8A" }} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" id="footer-facebook">
                <FaFacebookSquare className="w-7 h-7 hover:scale-125 transition-transform" style={{ fill: "#00E5FF" }} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" id="footer-twitter">
                <FaXTwitter className="w-7 h-7 hover:scale-125 transition-transform" style={{ fill: "#E040FB" }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <h3 className="font-cartoon text-yellow-400 text-base mb-1">Quick Links</h3>
            {[
              { label: "Introduction", href: "#slide-2" },
              { label: "Features", href: "#slide-5" },
              { label: "Business Model", href: "#slide-10" },
              { label: "Partner With Us", href: "#slide-18" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-sm text-white/50 hover:text-yellow-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)" }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-white/40 text-sm">
            © {new Date().getFullYear()} GENIE-US. All Rights Reserved.
          </p>
          <p className="font-cartoon text-yellow-400/60 text-sm">
            🐼 Built with love for little learners
          </p>
        </div>
      </div>
    </footer>
  );
}
