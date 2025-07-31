"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

const defaultGalleryItems = [
  {
    image: "/images/k.jpg",
    category: "Modern",
    title: "Modern Indian Kitchen",
  },
  {
    image: "/images/k2.jpg",
    category: "Minimalist",
    title: "Contemporary Modular Kitchen",
  },
  {
    image: "/images/k6.jpg",
    category: "Luxury",
    title: "Scandinavian Kitchen with Breakfast Bar",
  },
  {
    image: "/images/k4.jpg",
    category: "Contemporary",
    title: "High-Gloss Modular Kitchen",
  },
  {
    image: "/images/k5.jpg",
    category: "Industrial",
    title: "Urban Industrial Kitchen",
  },
  {
    image: "/images/k3.jpg",
    category: "Scandinavian",
    title: "Nordic Blue Modular Kitchen",
  },
  {
    image: "/images/a3.jpg",
    category: "Modern",
    title: "Luxury Dining & Kitchen Setup",
  },
  {
    image: "/images/a4.jpg",
    category: "Minimalist",
    title: "Minimalist Wooden Kitchen",
  },
  {
    image: "/images/best2.jpg",
    category: "Luxury",
    title: "Luxury Executive Kitchen",
  },
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedItems, setUploadedItems] = useState([]);

  // Load uploaded items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      setUploadedItems(JSON.parse(savedItems));
    }
  }, []);

  // Combine default and uploaded items
  const galleryItems = [...defaultGalleryItems, ...uploadedItems];

  const openModal = (index) => {
    setSelectedImage(galleryItems[index].image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigate = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex].image);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] min-h-[300px] md:min-h-[500px] w-full overflow-hidden">
        <Image
          src="/images/design1.jpg"
          alt="Beautiful interior design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-amber-400">Design Gallery</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Explore our portfolio of transformative interior spaces
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Introduction */}
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
              Design Showcase
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover our diverse portfolio featuring various styles and
            innovative solutions
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, i) => {
            // Check if the image is from default or uploaded
            const isDefaultImage = i < defaultGalleryItems.length;
            
            return (
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  {isDefaultImage ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      quality={90}
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-amber-50 transition-colors"
                    onClick={() => openModal(i)}
                  >
                    <ZoomIn className="text-amber-600" size={24} />
                  </motion.div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  {!isDefaultImage && item.description && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 -z-10"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Image Modal */}
        <AnimatePresence>
          {isModalOpen && selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
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
                  {currentIndex < defaultGalleryItems.length ? (
                    <Image
                      src={selectedImage}
                      alt={galleryItems[currentIndex]?.title || "Design project"}
                      fill
                      className="object-contain rounded-lg"
                      priority
                      quality={100}
                    />
                  ) : (
                    <img
                      src={selectedImage}
                      alt={galleryItems[currentIndex]?.title || "Design project"}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Navigation Arrows */}
                {galleryItems.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("prev");
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-amber-600 transition-colors"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("next");
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-amber-600 transition-colors"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}

                {/* Image Info */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  <h3 className="text-xl font-bold">
                    {galleryItems[currentIndex]?.title}
                  </h3>
                  <p className="text-amber-300">
                    {galleryItems[currentIndex]?.category}
                  </p>
                  {currentIndex >= defaultGalleryItems.length && galleryItems[currentIndex]?.description && (
                    <p className="text-gray-200 max-w-2xl mx-auto mt-2">
                      {galleryItems[currentIndex]?.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}