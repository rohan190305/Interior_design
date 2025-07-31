"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-black/20 backdrop-blur-lg shadow-xl"
          : "bg-gradient-to-b from-black/10 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        {/* Logo with animation */}
        <motion.div
          className="text-2xl font-bold tracking-wide"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <span className="text-amber-400">Jas Modular </span>
          <span className="text-white">& Interior</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8 text-lg font-medium relative">
            {navItems.map(({ name, href }) => (
              <motion.div
                key={name}
                className="relative py-2"
                onHoverStart={() => setHoveredItem(name)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <motion.a
                  href={href}
                  className={`relative z-10 transition-colors ${
                    hoveredItem === name ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {name}
                </motion.a>
                
                {hoveredItem === name && (
                  <motion.div
                    layoutId="navHighlight"
                    className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* AI Star Icon Button */}
          <Link href="/addimage" passHref>
            <motion.button
              className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="text-amber-400" size={24} />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          {/* Mobile version of the AI star icon */}
          <Link href="/addimage" passHref>
            <motion.button
              className="p-2 rounded-full bg-amber-500/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Sparkles className="text-amber-400" size={24} />
            </motion.button>
          </Link>
          
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? (
              <X size={28} className="text-yellow-400" />
            ) : (
              <Menu size={28} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mt-4 mx-4 bg-[#1a1a1a]/95 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
          >
            {navItems.map(({ name, href }, i) => (
              <motion.a
                key={name}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-white border-b border-white/5 hover:bg-white/5 transition-all relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  paddingLeft: "28px"
                }}
              >
                <motion.span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  •
                </motion.span>
                {name}
              </motion.a>
            ))}
            {/* Add mobile menu item for the AI design page */}
            <motion.a
              href="/addimage"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-white border-b border-white/5 hover:bg-white/5 transition-all relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * navItems.length }}
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                paddingLeft: "28px"
              }}
            >
              <motion.span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * navItems.length + 0.1 }}
              >
                •
              </motion.span>
              Add Image
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}