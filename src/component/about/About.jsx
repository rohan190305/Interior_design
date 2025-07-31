"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Home, Award, Users, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function About() {
  const stats = [
    {
      value: "200+",
      label: "Projects Completed",
      icon: <Home className="w-6 h-6" />,
    },
    {
      value: "15+",
      label: "Years Experience",
      icon: <Award className="w-6 h-6" />,
    },
    {
      value: "500+",
      label: "Happy Clients",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] min-h-[300px] md:min-h-[500px] w-full overflow-hidden">
        <Image
          src="/images/best.jpg"
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
              About <span className="text-amber-400">JAS Modular</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Crafting spaces that inspire and transform lives
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-amber-500 w-6 h-6" />
              <h2 className="text-2xl font-medium text-amber-600">Our Story</h2>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Designing Experiences, Not Just Spaces
            </h3>

            <div className="space-y-6 text-gray-600 text-lg">
              <p>
                At{" "}
                <span className="font-semibold text-amber-600">
                  JAS Modular & Interior Designers
                </span>
                , we understand that embarking on an interior design project is
                an exciting, yet often daunting, endeavor. That's why we're here
                to simplify the process and transform your ideas into
                breathtaking realities.
              </p>
              <p>
                Our core mission is to empower our clients to live and work in
                spaces that truly enhance their lives.
              </p>
              <p>
                We don't just design rooms; we design experiences. Whether
                you're seeking to refresh a single space, undertake a complete
                home renovation, or create a dynamic commercial environment, we
                bring a wealth of creativity, technical expertise, and an
                unwavering commitment to your satisfaction.
              </p>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/a3.jpg"
                alt="Modern living room"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mt-8">
              <Image
                src="/images/a4.jpg"
                alt="Elegant kitchen design"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/best.jpg"
                alt="Contemporary office space"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mt-8">
              <Image
                src="/images/best2.jpg"
                alt="Luxury bedroom"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="text-white flex flex-col items-center">
                  <div className="mb-4 text-amber-200">{stat.icon}</div>
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-lg">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Philosophy */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/v1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Fallback image if video doesn't load */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <Image
                src="/images/team-photo.jpg"
                alt="JAS Modular team"
                fill
                className="object-cover opacity-0"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Our Design Philosophy
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                We believe great design should be accessible to everyone. Our
                approach combines aesthetic vision with practical functionality,
                creating spaces that are as beautiful as they are livable.
              </p>
              <p>
                Every project begins with listening - we want to understand your
                lifestyle, preferences, and aspirations. This deep understanding
                allows us to create designs that feel uniquely yours.
              </p>
              <p>
                Sustainability and quality craftsmanship are at the heart of
                everything we do. We source materials responsibly and work with
                skilled artisans to ensure lasting beauty.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
