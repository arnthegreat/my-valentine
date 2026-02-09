import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

interface EnvelopeAnimationProps {
  isOpen: boolean;
  onClick: () => void;
}

export function EnvelopeAnimation({ isOpen, onClick }: EnvelopeAnimationProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {/* Envelope Body */}
        <div className="relative w-80 h-56 bg-gradient-to-br from-pink-100 to-red-100 rounded-lg shadow-2xl">
          {/* Envelope Flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0 border-l-[160px] border-r-[160px] border-t-[120px] border-l-transparent border-r-transparent border-t-red-300 origin-top"
            style={{
              transformOrigin: 'top center',
            }}
            animate={{
              rotateX: isOpen ? 180 : 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          />

          {/* Letter inside */}
          <motion.div
            className="absolute left-1/2 top-8 -translate-x-1/2 w-64 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center"
            initial={{ y: 0 }}
            animate={{
              y: isOpen ? -180 : 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          >
            <div className="text-center p-6">
              <Mail className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">Click to open</p>
              <p className="text-red-400 text-xs mt-1">A special message awaits...</p>
            </div>
          </motion.div>

          {/* Heart seal */}
          {!isOpen && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <span className="text-2xl">💌</span>
            </motion.div>
          )}
        </div>

        {!isOpen && (
          <motion.p
            className="text-center mt-6 text-pink-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click the envelope to read my letter
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
