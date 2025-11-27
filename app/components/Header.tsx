'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-8 fixed top-0 w-full z-50 mix-blend-difference text-white">
      
      {/* LEFT SIDE - Logo / Name */}
      <Link
        href="/"
        className="text-2xl font-serif font-bold tracking-tighter hover:scale-105 transition-transform duration-300"
      >
        SHARIQUE'S TRAVELS
      </Link>

      {/* RIGHT SIDE - Link */}
      <a
        href="https://github.com/realshak7781" // Replace with your actual GitHub or Portfolio
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-serif font-bold hover:underline underline-offset-4 decoration-1 transition-all duration-300"
      >
        Github
      </a>

    </header>
  );
}