import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, HeartCrack } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './ui/button';

interface YesNoQuestionProps {
  onYes: () => void;
}

export function YesNoQuestion({ onYes }: YesNoQuestionProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  
  const noTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Don't be silly!",
    "Last chance!",
    "You know you want to!",
    "Just say yes!",
    "Pretty please?",
    "I know you mean yes!"
  ];

  const handleYes = () => {
    // Trigger confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#c71585'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Heart burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.2,
      });
    }, 200);

    setTimeout(onYes, 1500);
  };

  const handleNoHover = () => {
    if (noButtonRef.current) {
      const maxX = window.innerWidth - noButtonRef.current.offsetWidth - 40;
      const maxY = window.innerHeight - noButtonRef.current.offsetHeight - 40;
      
      const newX = Math.random() * maxX - maxX / 2;
      const newY = Math.random() * maxY - maxY / 2;
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
    handleNoHover();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Heart className="w-32 h-32 mx-auto mb-8 text-red-500" fill="currentColor" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl mb-6 text-red-500 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Will you be my Valentine?
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I promise to make every day special with you 💕
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative h-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleYes}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-12 py-8 rounded-full text-2xl shadow-2xl hover:scale-110 transition-transform"
            >
              Yes! 💖
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: noButtonPosition.x,
              y: noButtonPosition.y,
            }}
            transition={{
              opacity: { delay: 0.6 },
              x: { type: 'spring', stiffness: 300, damping: 20 },
              y: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="relative"
          >
            <Button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={handleNoClick}
              variant="outline"
              className="border-2 border-gray-400 text-gray-600 px-12 py-8 rounded-full text-2xl hover:bg-gray-100"
            >
              {noTexts[Math.min(noClickCount, noTexts.length - 1)]}
            </Button>
          </motion.div>
        </div>

        {noClickCount > 3 && (
          <motion.p
            className="mt-8 text-pink-500 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HeartCrack className="w-5 h-5 inline mr-2" />
            You're breaking my heart trying to click "No"! 💔
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
