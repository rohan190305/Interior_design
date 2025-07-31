"use client";
import { motion } from "framer-motion";
import { Layout, Box, Palette, Sofa, Ruler, Home, Zap, Wrench, RefreshCw,ChefHat} from "lucide-react";
import { User, PenTool, Settings, CheckCircle } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";

export default function Services() {
  const services = [
    {
      title: "Space Planning",
      icon: <Layout className="w-8 h-8" />,
      description:"Optimizing the layout and flow of your space for functionality and aesthetics.",
      image: "/images/service1.jpg",
    },
    {
      title: "3D Visualization",
      icon: <Box className="w-8 h-8" />,
      description:"Providing realistic 3D images and panoramic views of the proposed design.",
      image: "/images/service2.png",
    },
    {
      title: "Material Selection",
      icon: <Palette className="w-8 h-8" />,
      description:"Guiding you in choosing materials, color palettes, textures, and finishes.",
      image: "/images/service3.jpg",
    },
    {
      title: "Furniture Selection",
      icon: <Sofa className="w-8 h-8" />,
      description:"Assisting with selection and sourcing of furniture and decorative elements.",
      image: "/images/service4.png",
    },
    {
      title: "Custom Furniture",
      icon: <Ruler className="w-8 h-8" />,
      description:"Designing bespoke furniture pieces to fit your space and style.",
      image: "/images/service5.png",
    },
    {
      title: "False Ceiling/POP",
      icon: <Home className="w-8 h-8" />,
      description:"Designing and implementing false ceilings and plaster of Paris designs.",
      image: "/images/service6.png",
    },
    {
      title: "Modular Kitchen",
      icon: <ChefHat className="w-8 h-8 text-amber-500" />,
      description:"Specializing in modern and functional modular kitchen setups.",
      image: "/images/best2.jpg",
    },
  
    {
      title: "Electrical Planning",
      icon: <Zap className="w-8 h-8" />,
      description:"Integrating electrical elements seamlessly into the design.",
      image: "/images/service7.jpg",
    },
    {
      title: "Renovation",
      icon: <RefreshCw className="w-8 h-8" />,
      description:"Transforming existing spaces with fresh looks and improved functionality.",
      image: "/images/service9.jpg",
    },
  ];

  return (
    <section className="bg-white">
{/* Hero Section */}
<div className="relative h-[60vh] md:h-[90vh] min-h-[300px] md:min-h-[400px] w-full overflow-hidden">
  <Image
    src="/images/s2.png"
    alt="Interior design services"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center px-6"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Our <span className="text-amber-400">Design Services</span>
      </h1>
      <p className="text-xl text-gray-200 max-w-2xl mx-auto">
        Comprehensive solutions to bring your vision to life
      </p>
    </motion.div>
  </div>
</div>


      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Types of{" "}
            <span className="text-amber-600">Interior Design Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a complete range of professional services to transform your
            space
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-60">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="mt-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 shadow-lg"
>
  <div className="text-center mb-16">
    <motion.h3 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
    >
      Our <span className="text-amber-600">Design Journey</span>
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
      className="text-gray-600 max-w-2xl mx-auto text-lg"
    >
      A seamless process from concept to completion, tailored to your vision
    </motion.p>
  </div>

  <div className="relative">
    {/* Decorative line for desktop */}
    <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/20 via-amber-400/60 to-amber-400/20 z-0"></div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
      {[
        {
          step: "01",
          title: "Discovery",
          desc: "We listen to understand your needs and vision",
          icon: <User className="w-5 h-5" />,
          color: "bg-amber-100 text-amber-600"
        },
        {
          step: "02",
          title: "Concept Creation",
          desc: "Initial designs that capture your aesthetic",
          icon: <PenTool className="w-5 h-5" />,
          color: "bg-blue-100 text-blue-600"
        },
        {
          step: "03",
          title: "Design Refinement",
          desc: "Perfecting every material and detail",
          icon: <Settings className="w-5 h-5" />,
          color: "bg-purple-100 text-purple-600"
        },
        {
          step: "04",
          title: "Implementation",
          desc: "Bringing your dream space to life",
          icon: <CheckCircle className="w-5 h-5" />,
          color: "bg-green-100 text-green-600"
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -10 }}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full">
            <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110`}>
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2 font-bold">{item.step}</span>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-20 h-20 bg-amber-400/10 rounded-full filter blur-xl"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full filter blur-xl"></div>
</motion.div>
      </div>
    </section>
  );
}
