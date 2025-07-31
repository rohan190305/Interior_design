'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  // Pre-filled message
  const message = encodeURIComponent(
     "Hello! I recently visited your website, Jas Modular & Interior Designers, and was very impressed with your work. I’m interested in designing a new kitchen and would love to discuss the possibilities with you. Looking forward to hearing from you!"  );

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        whileHover={{ scale: 1.1 }}
        animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0.7)', '0 0 0 30px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0.7)', ] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Icon"
          className="w-7 h-7"
        />
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