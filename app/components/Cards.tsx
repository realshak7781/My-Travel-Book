'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform, MotionValue, useScroll } from 'framer-motion';

interface CardProps {
  i: number;
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  subtitle,
  image,
  color,
  progress,
  range,
  targetScale,
}) => {
  // Card Stacking Animation
  const scale = useTransform(progress, range, [1, targetScale]);

  // Image Parallax Animation
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imageScrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imageScale = useTransform(imageScrollYProgress, [0, 1], [2, 1]);

  return (
    <motion.div
      ref={cardRef}
      className="h-screen flex items-center justify-center mx-5 sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        // Layout changed: Added 'flex flex-col' to stack everything vertically
        className="relative flex flex-col h-[650px] w-[900px] rounded-2xl md:rounded-[60px] p-8 md:p-12 border border-black text-gray-900 origin-top"
      >
        {/* 1. HEADING - Top */}
        <h2 className="text-center text-4xl md:text-6xl font-serif mb-6">
          {title}
        </h2>

        {/* 2. IMAGE - Middle (Takes up all available space) */}
        <div className="relative w-full flex-grow rounded-2xl overflow-hidden border border-black mb-6">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <Image
              fill
              src={image}
              alt={title}
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* 3. SUBTITLE - Bottom */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-base md:text-lg font-light max-w-2xl">
            {subtitle}
          </p>
          <Link
            href="/"
            className="mt-4 text-sm font-semibold underline hover:opacity-80 transition-opacity"
          >
            Show me more
          </Link>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Card;