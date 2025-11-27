'use client';
import { CARDS_DATA } from './data'; 
import Card from './components/Cards';
import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Header from './components/Header';

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'], 
  });

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // This function runs on every animation frame
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header/>
    <main ref={containerRef} className="relative mt-[50vh]">
      {CARDS_DATA.map((project, i) => {

        // This ensures the scale never drops below 0.8 (80%)
         const targetScale = Math.max(0.8, 1 - (CARDS_DATA.length - i) * 0.05);
        // the mathematical magic that is going to provide the shrinking card effect when all the cards are finall
        // lly stacked together

        return (
          <Card
            key={`card_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress} 
            range={[i * 0.25, 1] } 
            targetScale={targetScale}
          />
        );
      })}
    </main>

    </>
  );
}