import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles } from 'lucide-react';

interface GiftBoxProps {
  onOpen: () => void;
}

export function GiftBox({ onOpen }: GiftBoxProps) {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl mb-8 text-red-500 font-serif"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          I have a gift for you! 🎁
        </motion.h2>

        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          animate={
            isShaking
              ? {
                  rotate: [0, -20, 20, -20, 20, 0],
                  scale: [1, 1.2, 1.2, 1.2, 1.2, 0],
                  opacity: [1, 1, 1, 1, 1, 0],
                }
              : {}
          }
          transition={
            isShaking
              ? { duration: 1 }
              : {}
          }
          onClick={handleClick}
        >
          {/* Gift Box */}
          <div className="relative inline-block">
            <div className="w-64 h-64 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Sparkles */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-12 h-12 text-yellow-300" fill="currentColor" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4"
                animate={{
                  rotate: -360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <Sparkles className="w-12 h-12 text-yellow-300" fill="currentColor" />
              </motion.div>

              {/* Ribbon vertical */}
              <div className="absolute left-1/2 top-0 bottom-0 w-12 bg-yellow-400 -translate-x-1/2 shadow-lg"></div>
              
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 left-0 right-0 h-12 bg-yellow-400 -translate-y-1/2 shadow-lg"></div>

              {/* Bow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Gift className="w-24 h-24 text-yellow-500" fill="currentColor" />
              </div>
            </div>

            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-4 bg-black/20 blur-xl rounded-full translate-y-2"></div>
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-xl text-pink-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click to unwrap your surprise! 💝
        </motion.p>
      </motion.div>
    </div>
  );
}
