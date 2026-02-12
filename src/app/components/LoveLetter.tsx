import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface LoveLetterProps {
  onContinue: () => void;
  girlfriendName?: string;
}

export function LoveLetter({ onContinue, girlfriendName = 'My Love' }: LoveLetterProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-red-300">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-4 right-4 text-red-300">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-4 left-4 text-red-300">
          <Heart className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="absolute bottom-4 right-4 text-red-300">
          <Heart className="w-6 h-6" fill="currentColor" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-8 text-red-500 font-serif">
              To {girlfriendName},
            </h2>
          </motion.div>

          <motion.div
            className="space-y-4 text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-lg">
              From the moment I met you, my life has been filled with more joy, laughter, and love than I ever thought possible. You light up every room you walk into, and you've certainly illuminated my entire world baby ko!
            </p>

            <p className="text-lg">
              Every day with you is a gift. Your smile makes my heart skip a beat, your laugh is my favorite sound, and being with you feels like home. You make the ordinary extraordinary and turn simple moments into cherished memories.
            </p>

            <p className="text-lg">
              I fall more in love with you with each passing day. Your kindness, your warmth, your beautiful soul—everything about you amazes me. You are my best friend, my confidant, my everything.
            </p>

            <p className="text-lg text-center mt-8 text-red-500 font-serif italic">
              You make my heart whole. ❤️
            </p>
          </motion.div>

          <motion.div
            className="mt-8 text-right text-gray-600 font-serif italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p>Forever yours,</p>
            <p className="text-red-500 mt-1">Your Baby Aaron/Ron/Jayson/Gnaru</p>
          </motion.div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg shadow-lg"
            >
              Continue Reading <Heart className="w-5 h-5 ml-2" fill="currentColor" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
