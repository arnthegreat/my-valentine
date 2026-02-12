import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingHearts } from './components/FloatingHearts';
import { EnvelopeAnimation } from './components/EnvelopeAnimation';
import { LoveLetter } from './components/LoveLetter';
import { YesNoQuestion } from './components/YesNoQuestion';
import { GiftBox } from './components/GiftBox';
import { PhotoGallery } from './components/PhotoGallery';
import { ReasonsILoveYou } from './components/ReasonsILoveYou';
import { LoveCoupons } from './components/LoveCoupons';
import { ClosingLetter } from './components/ClosingLetter';
import { GrandFinale } from './components/GrandFinale';
import { Heart, Music, VolumeX } from 'lucide-react';
import backgroundMusic from '/music/bestpart.mp3';

type Stage = 'envelope' | 'letter' | 'question' | 'gift' | 'gallery' | 'reasons' | 'coupons' | 'closing' | 'finale';

export default function App() {
  const [stage, setStage] = useState<Stage>('envelope');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    // Attempt to play immediately on load
    audioRef.current.play().then(() => {
      setMusicPlaying(true);
    }).catch(e => console.log("Autoplay blocked by browser, waiting for interaction", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Customize these values
  const girlfriendName = 'Nicole'; // Change this to her actual name
  const relationshipStartDate = new Date('2023-01-14'); // Change to your actual start date

  const handleEnvelopeClick = () => {
    // Fallback: Ensure music plays on the first user interaction
    if (audioRef.current && !musicPlaying) {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(e => console.error(e));
    }

    if (!envelopeOpen) {
      setEnvelopeOpen(true);
      setTimeout(() => {
        setStage('letter');
      }, 1200);
    }
  };

  const handleLetterContinue = () => {
    setStage('question');
  };

  const handleYes = () => {
    setStage('gift');
  };

  const handleGiftOpen = () => {
    setStage('gallery');
  };

  const handleGalleryContinue = () => {
    setStage('reasons');
  };

  const handleReasonsContinue = () => {
    setStage('coupons');
  };

  const handleCouponsContinue = () => {
    setStage('closing');
  };

  const handleClosingContinue = () => {
    setStage('finale');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-red-50 to-purple-50">
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Music Toggle */}
      <motion.button
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {musicPlaying ? (
          <Music className="w-6 h-6 text-red-500" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-500" />
        )}
      </motion.button>

      {/* Stage Indicator */}
      <div className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
          <span className="text-sm text-gray-600">
            {stage === 'envelope' && 'Start'}
            {stage === 'letter' && 'Step 1'}
            {stage === 'question' && 'Step 2'}
            {stage === 'gift' && 'Step 3'}
            {stage === 'gallery' && 'Step 4'}
            {stage === 'reasons' && 'Step 5'}
            {stage === 'coupons' && 'Step 6'}
            {stage === 'closing' && 'Step 7'}
            {stage === 'finale' && 'Complete'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EnvelopeAnimation isOpen={envelopeOpen} onClick={handleEnvelopeClick} />
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoveLetter
                girlfriendName={girlfriendName}
                onContinue={handleLetterContinue}
              />
            </motion.div>
          )}

          {stage === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <YesNoQuestion onYes={handleYes} />
            </motion.div>
          )}

          {stage === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GiftBox onOpen={handleGiftOpen} />
            </motion.div>
          )}

          {stage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PhotoGallery onContinue={handleGalleryContinue} />
            </motion.div>
          )}

          {stage === 'reasons' && (
            <motion.div
              key="reasons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReasonsILoveYou onContinue={handleReasonsContinue} />
            </motion.div>
          )}

          {stage === 'coupons' && (
            <motion.div
              key="coupons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoveCoupons onContinue={handleCouponsContinue} />
            </motion.div>
          )}

          {stage === 'closing' && (
            <motion.div
              key="closing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ClosingLetter onContinue={handleClosingContinue} />
            </motion.div>
          )}

          {stage === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GrandFinale girlfriendName={girlfriendName} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}