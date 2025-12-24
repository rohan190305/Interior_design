'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mt-24 shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta.jpg" 
          alt="Interior Design Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl w-full"
        >
          {/* Subheading */}
          <motion.p
            className="text-amber-400 font-semibold mb-2 text-xl md:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Ready to Transform Your Space?
          </motion.p>

          {/* Headline */}
          <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6">
            Create Your <span className="text-amber-400">Dream Interior</span> with Our Experts
          </h2>

          {/* Centered Button */}
          <Link href="/kitchen-design">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex justify-center"
          >
            <button className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg font-semibold flex items-center gap-2 group">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
