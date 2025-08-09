'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';

const items = [
  { image: '/images/k.jpg', category: 'Modern' },
  { image: '/images/k2.jpg', category: 'Minimalist' },
  { image: '/images/k6.jpg', category: 'Luxury' },
  { image: '/images/best.jpg', category: 'Contemporary' },
  { image: '/images/best2.jpg', category: 'Industrial' },
  { image: '/images/a4.jpg', category: 'Scandinavian' },
];

export default function Showcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section className="px-6 py-20 md:px-16 lg:px-32 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Our Design Showcase
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover how we transform spaces with innovative design solutions
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={item.image}
                  alt="Design project"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredIndex === i ? 0 : 20,
                    opacity: hoveredIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {item.category}
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: hoveredIndex === i ? 1 : 0.8,
                    opacity: hoveredIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full cursor-pointer shadow-lg"
                  onClick={() => openModal(item.image)}
                >
                  <ZoomIn className="text-amber-600" size={24} />
                </motion.div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300 rounded-2xl pointer-events-none transition-all duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Full Image Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors z-10"
                >
                  <X size={32} />
                </button>

                <div className="relative w-full h-[80vh]">
                  <Image
                    src={selectedImage}
                    alt="Full size design"
                    fill
                    className="object-contain rounded-xl"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
