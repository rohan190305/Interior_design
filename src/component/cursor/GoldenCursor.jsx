'use client';
import { useEffect, useState } from 'react';

export default function GoldenCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glitters, setGlitters] = useState([]);

  useEffect(() => {
    // if ('ontouchstart' in window) return;
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add glitter on every move (more sparkles!)
      if (Math.random() > 0.4) {
        addGlitter(e.clientX, e.clientY);
      }
    };

    const addGlitter = (x, y) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 30;
      
      setGlitters((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x,
          y,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance,
          size: 3 + Math.random() * 5,
        }
      ]);

      // Auto-cleanup
      setTimeout(() => {
        setGlitters((prev) => prev.slice(1));
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="golden-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {glitters.map((g) => (
        <div
          key={g.id}
          className="glitter"
          style={{
            left: `${g.x}px`,
            top: `${g.y}px`,
            '--tx': `${g.tx}px`,
            '--ty': `${g.ty}px`,
            width: `${g.size}px`,
            height: `${g.size}px`,
          }}
        />
      ))}
    </>
  );
}