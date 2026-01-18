import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const banners = [
  {
    id: 1,
    title: 'Gear up for SSC 2026',
    subtitle: 'Study Material Designed for Success',
    cta: 'Shop Now',
    link: '/products',
    image:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop',
    color: 'from-purple-900/90 to-indigo-900/90',
  },
  {
    id: 2,
    title: 'GRAB YOUR FREE YEARLY CURRENT AFFAIRS',
    subtitle: 'Download PDF & Stay Updated with Latest News',
    cta: 'Download PDF',
    link: '/products',
    image:
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&auto=format&fit=crop',
    color: 'from-blue-900/90 to-cyan-900/90',
  },
  {
    id: 3,
    title: 'Special Offers on All Exam Books',
    subtitle: "Limited Time Discounts - Don't Miss Out",
    cta: 'Explore Offers',
    link: '/products',
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&auto=format&fit=crop',
    color: 'from-emerald-900/90 to-teal-900/90',
  },
  {
    id: 4,
    title: 'Exclusive Discounts on Competitive Exam Guides',
    subtitle: 'Get the Edge You Need to Succeed',
    cta: 'View Guides',
    link: '/products',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop',
    color: 'from-rose-900/90 to-red-900/90',
  },
];

const PromoBannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[250px] md:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image */}
              <img
                src={banners[currentIndex].image}
                alt={banners[currentIndex].title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banners[currentIndex].color}`}
              >
                <div className="container mx-auto px-6 md:px-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-2xl text-white"
                  >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {banners[currentIndex].title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-8">
                      {banners[currentIndex].subtitle}
                    </p>
                    <Link to={banners[currentIndex].link}>
                      <Button
                        size="lg"
                        className="bg-white text-purple-900 hover:bg-purple-50 font-bold"
                      >
                        {banners[currentIndex].cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBannerCarousel;