import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrandFinaleProps {
  girlfriendName?: string;
}

export function GrandFinale({ girlfriendName = 'Beautiful' }: GrandFinaleProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Continuous confetti
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#c71585', '#ffd700'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Show message after delay
    setTimeout(() => setShowMessage(true), 1000);

    // Heart burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { y: 0.5 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.5,
      });
    }, 2000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-red-200 to-purple-200 animate-pulse"></div>
      
      {/* Floating hearts */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Heart
              className="text-red-300"
              fill="currentColor"
              size={20 + Math.random() * 30}
              style={{ opacity: 0.6 }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-4xl w-full text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mb-8"
        >
          <Heart className="w-32 h-32 text-red-500 mx-auto" fill="currentColor" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-7xl mb-8 text-red-600 font-serif"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Happy Valentine's Day, {girlfriendName}! 💝
        </motion.h1>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="flex justify-center gap-4 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-500" />
                <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>

              <p className="text-xl md:text-3xl text-gray-700 mb-6 leading-relaxed font-serif">
                You are my everything, my best friend, my soulmate, and my forever Valentine.
              </p>

              <p className="text-lg md:text-2xl text-gray-600 mb-6">
                Thank you for being the most amazing person in my life. Every day with you is a blessing, and I can't wait to create more beautiful memories together.
              </p>

              <motion.div
                className="text-2xl md:text-4xl mb-8"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                I love you more than words can say ❤️
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4 text-4xl">
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💕
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  💖
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  💗
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, -20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                >
                  💝
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
                >
                  💘
                </motion.span>
              </div>
            </div>

            <motion.p
              className="text-gray-600 text-lg italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Forever and always, your Valentine 💌
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
