import { motion } from 'motion/react';
import { Heart, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface ClosingLetterProps {
  onContinue: () => void;
  girlfriendName?: string;
}

export function ClosingLetter({ onContinue, girlfriendName = 'My Love' }: ClosingLetterProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="max-w-3xl w-full bg-[#fff0f3]/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-white/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-200 to-red-200 rounded-full blur-3xl opacity-50 -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50 translate-x-20 translate-y-20"></div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-red-300">
          <Star className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="absolute top-4 right-4 text-red-300">
          <Star className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="absolute bottom-4 left-4 text-pink-300">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-4 right-4 text-pink-300">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="inline-block mb-4"
            >
              <Heart className="w-16 h-16 text-red-500" fill="currentColor" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl text-red-600 font-serif font-bold tracking-wide">
              To My Dearest {girlfriendName},
            </h2>
          </motion.div>

          {/* Letter Content */}
          <motion.div
            className="space-y-6 text-gray-800 leading-loose text-lg font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p>
              As I sit here trying to put my feelings into words, I realize that no amount of text could ever truly capture how much you mean to me. But I want to try, because you deserve to know just how deeply you've touched my heart.
            </p>

            <p>
              You came into my life like a beautiful surprise, and everything changed. You taught me what it means to truly love someone, not just with passion, but with patience, understanding, and genuine care. You've shown me that love isn't just a feeling; it's a choice we make every single day, and I choose you, always.
            </p>

            <p>
              Thank you for being my safe haven, my adventure partner, and my best friend all wrapped into one incredible person. Thank you for loving me on my worst days and celebrating me on my best ones. Thank you for your patience when I'm stubborn, your laughter when I'm silly, and your comfort when I'm struggling.
            </p>

            <p>
              You inspire me in ways you probably don't even realize. Your strength amazes me, your kindness humbles me, and your beauty both inside and out leaves me breathless. The way you see the world, with such hope and wonder, reminds me to appreciate the little things and find joy in every moment.
            </p>

            <p>
              I want you to know that you are appreciated, cherished, and loved beyond measure. Every smile you give me is a gift. Every moment we share together is a treasure I hold close to my heart. You make me want to be better, do better, and give you the world you deserve.
            </p>

            <p className="text-xl text-red-600 font-serif italic text-center pt-4 font-medium">
              I don't just love you for who you are.
              <br />
              I love you for who I become when I'm with you.
            </p>

            <p>
              As we continue this beautiful journey together, I promise to always support you, encourage you, and stand by your side through everything. You are my today and all of my tomorrows. My heart is yours, now and forever.
            </p>

            <p className="text-center pt-4 pb-2 italic text-gray-600">
              Thank you for being you. Thank you for choosing me.
              <br />
              Thank you for making my life infinitely better.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            className="mt-10 text-right text-gray-700 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <p className="text-lg">With all my love,</p>
            <p className="text-2xl text-red-500 mt-2">Aaron 💕</p>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg shadow-lg"
            >
              See My Final Message <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
