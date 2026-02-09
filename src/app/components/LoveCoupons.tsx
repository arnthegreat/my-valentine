import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Gift, Heart, Coffee, Utensils, Film, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface LoveCouponsProps {
  onContinue: () => void;
}

interface Coupon {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  redeemed: boolean;
}

export function LoveCoupons({ onContinue }: LoveCouponsProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 1,
      title: "Movie Night",
      description: "One movie night of your choice with popcorn and cuddles",
      icon: Film,
      color: "from-purple-400 to-purple-600",
      redeemed: false,
    },
    {
      id: 2,
      title: "Breakfast in Bed",
      description: "I'll make you breakfast in bed on any day you choose",
      icon: Coffee,
      color: "from-orange-400 to-red-500",
      redeemed: false,
    },
    {
      id: 3,
      title: "Dinner Date",
      description: "A special dinner date at the restaurant of your choice",
      icon: Utensils,
      color: "from-pink-400 to-red-500",
      redeemed: false,
    },
    {
      id: 4,
      title: "Spa Day",
      description: "A relaxing spa day together - massages included!",
      icon: Sparkles,
      color: "from-blue-400 to-cyan-500",
      redeemed: false,
    },
    {
      id: 5,
      title: "Shopping Spree",
      description: "A shopping trip where I carry all the bags (and pay!)",
      icon: Gift,
      color: "from-green-400 to-emerald-600",
      redeemed: false,
    },
    {
      id: 6,
      title: "Your Choice!",
      description: "Whatever you want to do - this day is all about you!",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      redeemed: false,
    },
  ]);

  const handleCouponClick = (id: number) => {
    setSelectedCoupon(selectedCoupon === id ? null : id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        className="max-w-5xl w-full"
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
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-block mb-4"
          >
            <Ticket className="w-16 h-16 text-red-500 mx-auto" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl mb-4 text-red-500 font-serif">
            Love Coupons 🎫
          </h2>
          <p className="text-xl text-gray-600">
            Special coupons just for you - redeemable anytime! 💝
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {coupons.map((coupon, index) => {
            const Icon = coupon.icon;
            const isSelected = selectedCoupon === coupon.id;

            return (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => handleCouponClick(coupon.id)}
              >
                <motion.div
                  className={`relative bg-gradient-to-br ${coupon.color} rounded-2xl p-6 shadow-xl h-full overflow-hidden`}
                  animate={{
                    rotate: isSelected ? [0, -2, 2, -2, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-12 h-12 text-white" />
                      {coupon.redeemed && (
                        <span className="bg-white/30 text-white text-xs px-2 py-1 rounded-full">
                          Redeemed
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {coupon.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      {coupon.description}
                    </p>

                    {/* Coupon tear marks */}
                    <div className="flex gap-1 pt-4 border-t-2 border-dashed border-white/50">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="text-white text-4xl"
                        >
                          💖
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-600 mb-4 italic">
            Save these and redeem them whenever you want! 🎁
          </p>
          <p className="text-sm text-gray-500 mb-6">
            (Screenshot this page to keep them forever!)
          </p>
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg shadow-lg"
          >
            Continue <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
