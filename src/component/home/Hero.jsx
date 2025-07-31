"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDiscoverMore = (e) => {
    e.preventDefault();
    // Scroll to the next section
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Star component for the shiny animation
  const Star = ({ style }) => (
    <motion.div
      className="absolute bg-yellow-300 rounded-full"
      style={style}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  );

  // Generate random stars only on client
  const stars = mounted
    ? Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 6 + 2;
        return (
          <Star
            key={i}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
          />
        );
      })
    : null;

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile background image with stars */}
      <div className="md:hidden absolute inset-0 -z-10">
        <img
          src="/images/bg.jpg"
          alt="Kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 overflow-hidden">{stars}</div>
      </div>

      {/* Left content (dark bg only on desktop) */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-8 md:px-12 text-white h-full bg-transparent md:bg-[#1d2a28]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl space-y-6 py-16 md:py-0"
        >
          <motion.h1
            className="text-4xl md:text-[44px] font-bold leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Design Your Kitchen <br />{" "}
            <span className="text-yellow-400">With Our Experts</span>
          </motion.h1>
          <motion.p
            className="text-gray-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Interior design consultancy firm that brings sensitivity to the design
            top restaurants, hotels, offices & homes around the world. We stand
            for quality, safety and credibility.
          </motion.p>
          <motion.button
            onClick={handleDiscoverMore}
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop image with animated overlay */}
      <div className="hidden md:block w-[60%] h-full relative overflow-hidden">
        <motion.img
          src="/images/bg.jpg"
          alt="Kitchen"
          className="object-cover w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 overflow-hidden">{stars}</div>
      </div>
    </section>
  );
}