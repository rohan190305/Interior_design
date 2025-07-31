"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Vision() {
  return (
    <section className="px-6 py-20 md:px-16 lg:px-32 bg-gradient-to-br from-[#f9f5f0] to-[#f0e9e1] text-[#111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-amber-100/30 blur-xl"></div>
        <div className="absolute bottom-1/3 right-20 w-40 h-40 rounded-full bg-amber-100/30 blur-xl"></div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Headline - First on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:hidden"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Crafting Kitchens{" "}
            <span className="italic font-extrabold text-black relative inline-block px-2">
              <span className="relative z-10">for Life</span>
              <span className="absolute inset-0 bg-amber-200/60 rounded-full transform -rotate-2 -z-10"></span>
            </span>{" "}
            with JAS
            <span className="text-orange-600 font-bold text-4xl animate-pulse">
              .
            </span>
          </h2>
        </motion.div>

        {/* Right Image - Second on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group w-full lg:order-2"
        >
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:-rotate-1 transition-all duration-300">
            <Image
              src="/images/k.jpg"
              alt="Furniture Showcase"
              width={700}
              height={500}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-400/20 blur-md -z-10"></div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-orange-400/20 blur-md -z-10"></div>

          {/* Polaroid-style overlay */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-2 rounded-lg shadow-xl rotate-12 border-4 border-white overflow-hidden group-hover:rotate-6 transition-transform duration-300">
            <Image
              src="/images/k2.jpg"
              alt="Decorative"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-2 text-center text-xs font-bold text-gray-800">
              Featured Design
            </div>
          </div>

          {/* Floating tag */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold text-amber-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            New Collection
          </div>
        </motion.div>

        {/* Left Content - Third on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 lg:order-1"
        >
          {/* Headline - Hidden on mobile (already shown above) */}
          <h2 className="hidden lg:block text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Crafting Kitchens{" "}
            <span className="italic font-extrabold text-black relative inline-block px-2">
              <span className="relative z-10">for Life</span>
              <span className="absolute inset-0 bg-amber-200/60 rounded-full transform -rotate-2 -z-10"></span>
            </span>{" "}
            with JAS
            <span className="text-orange-600 font-bold text-4xl animate-pulse">
              .
            </span>
          </h2>

          {/* Subheading */}
          <div className="flex items-center gap-3 pt-4">
            <Sparkles className="text-amber-500 w-6 h-6" />
            <h4 className="text-xl font-medium bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Bespoke Kitchen Design
            </h4>
          </div>

          {/* Paragraph */}
          <motion.p
            className="text-gray-700 max-w-xl text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-600 font-semibold">JAS</span>{" "}
            transforms your culinary space into a masterpiece—designed for
            beauty, built for function. From contemporary elegance to timeless
            charm, we tailor kitchens that reflect your lifestyle. Experience
            unmatched craftsmanship and personalized service every step of the
            way.
          </motion.p>

          {/* CTA Button */}
          <Link href="/gallery">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-amber-300/40 transition-all flex items-center gap-2"
          >
            View Our Work
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </span>
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}