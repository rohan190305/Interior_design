'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  // Pre-filled message
  const message = encodeURIComponent(
    "Hello! I recently visited your website, Jas Modular & Interior Designers, and was very impressed with your work. I'm interested in designing a new kitchen and would love to discuss the possibilities with you. Looking forward to hearing from you!"
  );

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:bg-green-600 transition-all duration-300 ease-out group hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
      >
        <div className="absolute -right-1 -top-1 z-10">
          <div className="flex h-6 w-6 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              1
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 16 16"
          className="w-7 h-7"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
          ></path>
        </svg>

        <span className="absolute inset-0 rounded-full border-4 border-white/30 scale-100 animate-pulse"></span>

        <div className="absolute right-full mr-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg">
            Do you need help?
          </div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      </motion.button>

      {/* Animated Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 text-black bg-white shadow-2xl rounded-2xl p-6 w-72 border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-green-700">Hello👋</h3>
              <button onClick={togglePopup} className="text-gray-400 hover:text-black transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M11.742 4.742a1 1 0 1 0-1.484-1.328L8 6.328 5.742 4.742a1 1 0 1 0-1.484 1.328L6.328 8 4.258 10.258a1 1 0 1 0 1.484 1.328L8 9.672l2.258 2.258a1 1 0 1 0 1.484-1.328L9.672 8l2.258-2.258z"/>
                </svg>
              </button>
            </div>

            {/* Text */}
            <p className="text-gray-600 mb-4 text-sm">
              We're here to help. Chat with us on WhatsApp for any queries.
            </p>

            {/* Person 1 */}
            <a
              href={`https://wa.me/8551890373?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <img 
                src="/images/p1.png" 
                alt="Kedar Ahire" 
                className="w-12 h-12 rounded-full mr-3 border-2 border-green-500" 
              />
              <div>
                <p className="font-semibold text-sm">Kedar Ahire</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </a>

            {/* Person 2 */}
            <a
              href={`https://wa.me/7666344988?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <img 
                src="/images/p2.png" 
                alt="Kalvinder Ahire" 
                className="w-12 h-12 rounded-full mr-3 border-2 border-green-500" 
              />
              <div>
                <p className="font-semibold text-sm">Kalvinder Ahire</p>
                <p className="text-xs text-gray-500">Sales & Enquiry</p>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppWidget;