'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface HeroSlide {
  id: string;
  tag: string;
  tagIcon: 'flame' | 'sparkles' | 'shield' | 'sun' | 'trees';
  kicker: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  badge: string;
  primaryBtnText: string;
  secondaryBtnText?: string;
  image: string;
  accentColor: string;
  isSale?: boolean;
  category?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'autumn-sale',
    tag: 'LIMITED TIME PROMO',
    tagIcon: 'flame',
    kicker: 'Fresh Looks For Your Home',
    title: 'BIG AUTUMN SALE',
    highlightText: '20% OFF',
    subtitle: '20% Off Across Hundreds of Lines',
    badge: 'Save 20%',
    primaryBtnText: 'Shop Sale Tiles',
    image:
      'https://images.pexels.com/photos/7587482/pexels-photo-7587482.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    accentColor: '#d9272e',
    isSale: true,
  },
  {
    id: 'marble-luxury',
    tag: 'EXCLUSIVE RANGE',
    tagIcon: 'sparkles',
    kicker: 'Italian Luxury',
    title: 'CALACATTA MARBLE',
    highlightText: 'POLISHED PORCELAIN',
    subtitle: 'High-Gloss Polished Porcelain Tiles',
    badge: 'Bestseller',
    primaryBtnText: 'Explore Marble Tiles',
    image:
      'https://images.pexels.com/photos/4194867/pexels-photo-4194867.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    accentColor: '#f59e0b',
    category: 'Marble Effect Tiles',
  },
  {
    id: 'shower-panels',
    tag: 'NEW ARRIVALS 2026',
    tagIcon: 'shield',
    kicker: '100% Waterproof',
    title: 'SHOWER WALL PANELS',
    highlightText: 'FAST CLICK FIT',
    subtitle: 'Seamless Fit • Zero Grout Lines',
    badge: '10 Yr Warranty',
    primaryBtnText: 'Shop Shower Panels',
    image:
      'https://images.pexels.com/photos/6987718/pexels-photo-6987718.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    accentColor: '#10b981',
    category: 'Shower Panels',
  },
  {
    id: 'outdoor-living',
    tag: 'GARDEN & PATIO',
    tagIcon: 'sun',
    kicker: 'Garden & Patio',
    title: 'OUTDOOR PORCELAIN',
    highlightText: 'R11 ANTI-SLIP',
    subtitle: 'Frostproof & Non-Slip 20mm Slabs',
    badge: 'Frostproof',
    primaryBtnText: 'Shop Outdoor Slabs',
    image:
      'https://images.pexels.com/photos/8143711/pexels-photo-8143711.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    accentColor: '#f97316',
    category: 'Outdoor Tiles',
  },
  {
    id: 'wood-effect',
    tag: 'NATURAL TIMBER WARMTH',
    tagIcon: 'trees',
    kicker: 'Natural Timber',
    title: 'WOOD EFFECT PLANKS',
    highlightText: 'WATERPROOF PLANKS',
    subtitle: 'Waterproof & Scratch-Proof Porcelain',
    badge: 'Pet Friendly',
    primaryBtnText: 'Shop Wood Planks',
    image:
      'https://images.pexels.com/photos/7587734/pexels-photo-7587734.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
    accentColor: '#d97706',
    category: 'Wood Effect Tiles',
  },
];

const AUTO_PLAY_INTERVAL = 5500; // 5.5 seconds per slide

interface HeroCarouselProps {
  onShopSale: () => void;
  onOpenCalculator: () => void;
  onSelectCategory: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onShopSale,
  onOpenCalculator,
  onSelectCategory,
  onScrollToSection,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, nextSlide, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  const handlePrimaryClick = (slide: HeroSlide) => {
    if (slide.isSale) {
      onShopSale();
    } else if (slide.category) {
      onSelectCategory(slide.category);
    } else {
      onScrollToSection('products-catalog');
    }
  };

  return (
    <section
      id="top"
      className="hero-carousel-container relative overflow-hidden bg-[#241c17] text-white select-none"
      aria-label="Featured Collections Carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with Ken-Burns and smooth cross-fade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Ken Burns zoom when active */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />

              {/* Rich dark overlay with vignette for crystal-clear readability */}
              <div className="hero-carousel-overlay absolute inset-0" />
            </div>
          );
        })}
      </div>

      {/* Main Slide Content - Vertically centered with zero layout shift */}
      <div
        onClick={() => handlePrimaryClick(currentSlide)}
        className="relative z-20 mx-auto w-full max-w-[1240px] cursor-pointer px-8 py-4 text-center transition-opacity duration-300"
        title="Click to explore collection"
      >
        {/* Kicker */}
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#dcc7a9] sm:text-xs drop-shadow">
          {currentSlide.kicker}
        </p>

        {/* Main Headline */}
        <h1 className="hero-slide-title mx-auto max-w-4xl text-3xl font-black uppercase leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-[76px] transition-transform duration-500 hover:scale-[1.01]">
          {currentSlide.title}
        </h1>

        {/* Subtitle / Offer */}
        <p className="mx-auto mt-4 max-w-2xl text-sm font-extrabold uppercase tracking-[0.06em] text-[#f8f6f0] drop-shadow sm:text-xl md:text-2xl">
          {currentSlide.subtitle}
        </p>
      </div>

      {/* Navigation Arrows: Left & Right */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="carousel-nav-btn absolute left-3 top-1/2 z-30 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 hover:bg-black/70 sm:left-6 sm:h-13 sm:w-13"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="carousel-nav-btn absolute right-3 top-1/2 z-30 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 hover:bg-black/70 sm:right-6 sm:h-13 sm:w-13"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
};
