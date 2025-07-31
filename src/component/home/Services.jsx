"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const services = [
  {
    title: "Design Projects",
    description:
      "Explore our latest interior design transformations that blend functionality with aesthetic excellence.",
    image: "/images/s1.jpg",
    // button: "View Project",
  },
  {
    title: "Property Interior",
    description:
      "Complete interior solutions tailored to your property's unique character and your personal style.",
    image: "/images/s2.png",
    // button: "Learn More",
  },
  {
    title: "Building Architecture",
    description:
      "Innovative architectural designs that push boundaries while respecting your vision and budget.",
    image: "/images/s3.jpg",
    // button: "See Designs",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gradient-to-b from-white to-amber-50 py-20 px-6 md:px-16 text-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-amber-100/40 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-amber-100/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 bg-amber-100/50 px-4 py-2 rounded-full"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-relaxed bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
            Transformative Design Solutions
          </h2>

          <p className="text-gray-600 font-serif max-w-2xl mx-auto text-lg">
            We create spaces that inspire, with meticulous attention to detail
            and a passion for innovative design solutions.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
            >
              {/* Stylish Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div> */}
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500 clip-path-corner transform rotate-90"></div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-5">{service.description}</p>

                {/* <motion.button
                  whileHover={{
                    backgroundColor: "#d97706",
                    color: "white",
                    x: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 text-amber-500 font-medium transition-all group-hover:bg-amber-500 group-hover:text-white"
                >
                  {service.button}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button> */}
              </div>
              
            </motion.div>
          ))}
        </div>
       
      </div>

      <style jsx>{`
        .clip-path-corner {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
      `}</style>
    </section>
  );
}
