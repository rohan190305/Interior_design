"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  Home,
  User,
  Briefcase,
  Folder,
} from "lucide-react";
import { Image } from "lucide-react";
import { GalleryHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-6 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center mb-8">
          {/* Logo & Description - Center aligned for mobile */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-xl">
                <Home className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-xl">Jas Modular</h4>
                <p className="text-sm text-gray-400">& Interface Designers</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-md mx-auto">
              Creating beautiful, functional spaces that enhance your lifestyle
              and reflect your personality.
            </p>
          </div>

          {/* Quick Links and Services side by side */}
          <div className="w-full grid grid-cols-2 gap-8 mb-8">
            {/* Quick Links - Left */}
            <div className="text-left">
              <h4 className="text-yellow-400 font-semibold text-lg mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 hover:text-white transition">
                  <Home size={16} />
                  <Link href="/">Home</Link>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition">
                  <User size={16} />
                  <Link href="/about">About</Link>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition">
                  <Briefcase size={16} />
                  <Link href="/services">Services</Link>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition">
                <Image size={16} />
                <Link href="/gallery">Gallery</Link>
              </li>
                <li className="flex items-center space-x-2 hover:text-white transition">
                  <Folder size={16} />
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Services - Right */}
            <div className="text-left">
              <h4 className="text-yellow-400 font-semibold text-lg mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                <li className="hover:text-white transition">Kitchen Design</li>
                <li className="hover:text-white transition">Living Room</li>
                <li className="hover:text-white transition">Wardrobes</li>
                <li className="hover:text-white transition">Commercial</li>
              </ul>
            </div>
          </div>

          {/* Follow Us - Center aligned for mobile */}
          <div className="text-center">
            <h4 className="text-yellow-400 font-semibold text-lg mb-4">
              Follow Us
            </h4>
            <div className="flex justify-center space-x-3 mb-4">
              {[
                { Icon: Facebook, url: "https://facebook.com" },
                { Icon: Instagram, url: "https://instagram.com" },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: Linkedin, url: "https://linkedin.com" },
              ].map(({ Icon, url }, idx) => (
                <Link
                  href={url}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                  >
                    <Icon className="text-white" size={18} />
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="text-blue-400" size={16} />
                <a href="mailto:info@jasmodular.com">Kedarahire05@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="text-pink-500" size={16} />
                <a href="tel:+15551234567">+91-8551890373/ 7666344988</a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - unchanged */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-xl">
                <Home className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-xl">Jas Modular </h4>
                <p className="text-sm text-gray-400">& Interior Designers</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Creating beautiful, functional spaces that enhance your lifestyle
              and reflect your personality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-yellow-400 font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 hover:text-white transition">
                <Home size={16} />
                <Link href="/">Home</Link>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition">
                <User size={16} />
                <Link href="/about">About</Link>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition">
                <Briefcase size={16} />
                <Link href="/services">Services</Link>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition">
                <Image size={16} />
                <Link href="/gallery">Gallery</Link>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition">
                <Folder size={16} />
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-yellow-400 font-semibold text-lg mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              <li className="hover:text-white transition">Kitchen Design</li>
              <li className="hover:text-white transition">Living Room</li>
              <li className="hover:text-white transition">Wardrobes</li>
              <li className="hover:text-white transition">Commercial</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-yellow-400 font-semibold text-lg mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-3 mb-4">
              {[
                {
                  Icon: Facebook,
                  url: "https://www.facebook.com/share/1NcTK2s3K6/?mibextid=wwXIfr",
                },
                {
                  Icon: Instagram,
                  url: "https://www.instagram.com/jas.interior?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: Linkedin, url: "https://linkedin.com" },
              ].map(({ Icon, url }, idx) => (
                <Link
                  href={url}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                  >
                    <Icon className="text-white" size={18} />
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2 mb-2 text-sm">
              <Mail className="text-blue-400" size={16} />
              <a href="mailto:info@jasmodular.com">Kedarahire05@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="text-pink-500" size={16} />
              <a href="tel:+15551234567">+91-8551890373/ 7666344988</a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2025 Jas Modular & Interior Designers. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
