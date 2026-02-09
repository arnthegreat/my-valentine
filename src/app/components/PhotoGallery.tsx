import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Photo {
  url: string;
  caption: string;
}

interface PhotoGalleryProps {
  onContinue: () => void;
}

export function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample photos - these can be replaced with actual photos
  const photos: Photo[] = [
    {
      url: 'https://images.unsplash.com/photo-1643123928085-b93ff675ec79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      caption: 'Every moment with you is magical ✨',
    },
    {
      url: 'https://images.unsplash.com/photo-1582845715481-a810047ab56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      caption: 'Together we create beautiful memories 🌅',
    },
    {
      url: 'https://images.unsplash.com/photo-1758524053906-d1f9148c2b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      caption: 'Your smile lights up my world 😊',
    },
    {
      url: 'https://images.unsplash.com/photo-1760669345703-930cd212b219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      caption: 'Every date with you is perfect 🥂',
    },
    {
      url: 'https://images.unsplash.com/photo-1625751989974-e3e28aac9594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      caption: 'Adventure is better with you by my side 🏖️',
    },
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-pink-50 to-red-50">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl text-center mb-8 text-red-500 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Our Beautiful Memories Together 💕
        </motion.h2>

        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Photo Display */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].caption}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay for caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <motion.p
                    className="text-white text-xl md:text-2xl text-center font-serif"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {photos[currentIndex].caption}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Photo Indicators */}
          <div className="flex justify-center gap-2 p-4 bg-white">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-red-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4 text-lg">
            {currentIndex + 1} of {photos.length}
          </p>
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg shadow-lg"
          >
            See More Love <Heart className="w-5 h-5 ml-2" fill="currentColor" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
