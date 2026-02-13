import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface ReasonsILoveYouProps {
  onContinue: () => void;
}

export function ReasonsILoveYou({ onContinue }: ReasonsILoveYouProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Customize these reasons!
  const reasons = [
    {
      number: 1,
      reason: "Your smile lights up my entire world",
      emoji: "😊"
    },
    {
      number: 2,
      reason: "The way you laugh at my silly jokes and punch me when I say something cheesy",
      emoji: "😂"
    },
    {
      number: 3,
      reason: "How you make my every day special just by being in it",
      emoji: "🌟"
    },
    {
      number: 4,
      reason: "Your kindness and beautiful heart",
      emoji: "💖"
    },
    {
      number: 5,
      reason: "The way you understand me like no one else",
      emoji: "🤗"
    },
    {
      number: 6,
      reason: "How you inspire me to be better every single day",
      emoji: "✨"
    },
    {
      number: 7,
      reason: "Your gorgeous brown eyes that I get lost in",
      emoji: "👀"
    },
    {
      number: 8,
      reason: "The comfort I feel when I'm with you",
      emoji: "🏡"
    },
    {
      number: 9,
      reason: "How you make ordinary moments magical an unforgettable",
      emoji: "🎭"
    },
    {
      number: 10,
      reason: "SIMPLY EVERYTHING ABOUT YOU BABY KO!",
      emoji: "💝"
    },
  ];

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => new Set([...prev, index]));
    if (index === currentIndex) {
      setTimeout(() => {
        if (currentIndex < reasons.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 600);
    }
  };

  const allCardsFlipped = flippedCards.size === reasons.length;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="max-w-6xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-block mb-4"
          >
            <Heart className="w-16 h-16 text-red-500 mx-auto" fill="currentColor" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl mb-4 text-red-500 font-serif">
            Reasons Why I Love You
          </h2>
          <p className="text-xl text-gray-600">
            Click each card to reveal why you're so special to me 💕
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="perspective-1000"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className="relative h-48 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  rotateY: flippedCards.has(index) ? 180 : 0,
                }}
                transition={{ duration: 0.6 }}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: index === currentIndex || flippedCards.has(index) ? 1.05 : 1 }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl shadow-xl flex items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
                    <div className="text-5xl font-bold text-white">{item.number}</div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-4"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <p className="text-gray-700 text-sm leading-tight">{item.reason}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {allCardsFlipped && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-2xl text-red-500 mb-6 font-serif italic">
                And there are a million more reasons... 💖
              </p>
              <Button
                onClick={onContinue}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg shadow-lg"
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {!allCardsFlipped && (
          <motion.p
            className="text-center text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Flip all the cards to continue...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
