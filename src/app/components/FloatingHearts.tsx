import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface HeartType {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartType[]>([]);

  useEffect(() => {
    const heartArray: HeartType[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 20,
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -1200],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            className="text-pink-300"
            fill="currentColor"
            size={heart.size}
            style={{ filter: 'blur(1px)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
