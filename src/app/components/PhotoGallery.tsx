import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Photo {
  url: string;
  caption: string;
}

interface PhotoGalleryProps {
  onContinue: () => void;
}

export function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically import all photos from src/assets/photos
  const photoImports = import.meta.glob('/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
    eager: true,
    import: 'default',
  });

  const photoUrls = Object.keys(photoImports)
    .sort((a, b) => {
      const nameA = a.split('/').pop() || '';
      const nameB = b.split('/').pop() || '';
      return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((key) => photoImports[key] as string);

  // Use imported photos, or fallback to placeholders if none found
  const photos: Photo[] = (photoUrls.length > 0 ? photoUrls : Array.from({ length: 63 }, (_, i) => `/photos/${i + 1}.jpg`)).map((url, i) => {
    const captions = [
      "You are my everything 💖",
      "Our first Bonchon together 🥰 (I was still a bit shy hihi) ✨",
      "Our 2nd movie together(medyo close na tayo, di nako nahiya magpapic hehe) 😊",
      "Hinding hindi magsasawang pagsilbihan ka araw araw, hatid sundo man as long as I'm near and here with you in PH 😊",
      "Makulit lang ako pero love na love ko ikaw baby ko! And never ko sisirain tiwala mo at hinding hindi kita iiwan! 😘",
      "🫡🫡🫡 hehehe 😘",
      "Eyyy! Thesis DEFENDED!! 😍",
      "Thank you for always taking care of me and making me feel loved every single day! I promise to always do the same for you baby ko! 💕",
      "Always my pretty and cute baby! 😍",
      "Every moment with you is a treasure, and I can't wait to create more beautiful memories together with you baby! 💖",
      "You are the best thing that ever happened to me, and I am so grateful to have you in my life! I love you so much baby ko! 💕",
      "I promise to always be there for you, through thick and thin, and to love you unconditionally for the rest of our lives! 💖",
      "You are my sunshine on a cloudy day, and I can't imagine my life without you in it! I love you so much baby ko! ☀️💕",
      "Two Kokeys in a photo! Hihi 😘",
      "I will always be your sweet, caring, loving, understanding, baby boy hihihi, I love youu!😘",
      "I may sometimes be annoying and makulit, but please know that it's all because I love you so much and want to make you happy, baby ko! Sayo lang ako ganito at magiging ganito for the rest of our lives 💕",
      "I may not be perfect, but I promise to always strive to be the best partner I can be for you, baby ko! I love you more than words can express! 💖",
      "Soooo pretty kahit nakapambahay and walang make up! Literally the prettiest, the most gorgeous and beautiful woman in the world to me! 😍",
      "Thank you for giving all your heart to me and trusting me to take care of it baby ko! I promise to cherish and treasure it always! 💕",
      "Tulad nga ng sinasabi nila na, Every great man has a woman behind him to support him in everything, and I can proudly say that I am so lucky to have the most amazing, beautiful, and lovingg woman in the world by my side! I love you so much baby ko! 💖",
      "One Kokey kissing his cute   baby Kokey! Hihi 😘",
      "I will never take you for granted, and I will always appreciate and love you for the amazing person that you are, baby ko! You deserve all the love and happiness in the world, and I promise to do everything in my power to give that to you! 💕",
      "Every time I see you, my heart skips a beat, and I fall in love with you all over again! You are my forever Nicole Boroc (baby kooo!!) 💖",
      "I am so lucky na nakilala ko kaagad ang babaeng gusto ko pakasalan at makasama habang buhay this early. #CollegeSweetheart 😍",
      "I will never get used to how beautiful you are especially when you smile and when you're happy, baby ko! You light up my world and make everything better just by being in it! I love you so much! 💕",
      "Every picture an picture and every moment of/with you is a precious memory that I will cherish forever babyy! 💖",
      "Spending time with you will always be the best part of my day! I can't wait for the day to come na magkasama na tayo palagi and I can't wait to spend the rest of my life with you babyy! 💕",
      "I am soooo happy that I got to spend my New Year with you baby ko! And I can't wait to spend the rest of my New Years with you for the rest of my life 💖 (may 2 stars ako kasi very good ako hihihi🥰)",
      "You will always be the most beautiful woman than you'll ever realize to me baby!💖",
      "Our first church with your family 🥰",
      "Hi kids! This is Mom and Dad! HAHAHAHA🥰",
      "As long as I'm alive you will be protected, cared, loved, and cherished baby ko! 😘",
      "I can’t help smiling when I think of you all the time ",
      "Simple dates with you will always be one of my favorites 🥰",
      "7-11 detour with you before I drop you off at your house will be also one of my favorite memories with you baby ko! ☺️",
      "Always know na I will always choose you over anything forever baby kooo, I love you soo muchh!💚💖",
      "My first time ever to receive flowers my whole🥰 It is from someone I wanna marry and be with for the rest of my life💍",
      "How lucky I am to have found someone that makes distance soooo worth it🥰",
      "I love seeing you, hearing your voice and spending time with you even if it's just in a screen or a call as much I love being with you in person. I can't wait for the day to come that we can be together all the time baby ko! 💖",
      "Seing you smile, laugh andd happy will always be my favorite view baby ko! I love you so sooo muchh! 💕",
      "I love how clingy and touchy you can be with me sometimes baby🥰, it makes my heart melt.",
      "Our first samgyup together!🥰 #ThesisDefended",
      "Kissing you will always be my favorite thing to do when I'm with you (sa cheeks man or sa lips or sa kahit saang parte ng katawan) and I will never ever have enough of it forever baby koo! hehehe 😘",
      "With my beautiful (soon to be) wife and our baby boy HAHAHAHA🥰",
      "Cuddling with you will always be my favorite🥰, It makes me feel like I'm in heaeven hehehe (cuddling a heaven sent Angel hehe)",
      "I was like 😍😍😍 when I saw you with bangs for the first time, parang may artista akong girlfriend HAHAHAHA",
      "You will always be my favorite person no matter what baby ☺️.",
      "How cute can you be baby ko ha? I lovee youuuu! 😘😘",
      "One of my best memories! Mario Kart with youu hehehe 🥰",
      "Thank you for all the efforts for making my first birthday with you so soo soooo special an memorable baby! Just by being with you is more than enough for me na eh🥹. I can't wait to celebrate all my birhtdays with you for the rest of our lives! 💖",
      "Arcades date with youu >>>> 🥰",
      "Magic ticket pro player ba naman kasama ko HAHAHAHAHAHA paldo🥰",
      "Akala mo maangas noh, di nila alam soft boy and iyakin ako pagdating sayo HAHAHAHA kasi love na love ko ikaw😘",
      "You will always be the most beautiful, gorgeous, cute and the prettiest woman to me no matter what baby! Kahit balibaliktarin pa ang mundo ikaw lang ang maganda sa mga mata ko wala nang iba at hinding hindi magbabago yan☺️😍",
      "Balang araw magkakaron din tayo ng sarili nating PC setup sa sarili nating kwarto at bahay baby ko, promise yan! I love you so much! 💖 #MyForeverDuoInGameAndIRL",
      "You always turn ordinary moments into something magical just by being there with me baby koo 🥰" ,
      "My sleepy head/sleeping beauty! You're so beautiful and so cute kahit tulog☺️. Pag katabi kita matulog, I would stare at you for hours and just admire how lucky I am to have you in my life. I love you so much! 💖",
      "I will always and forever be your beast boy ☺️",
      "Lumipas man ang panahon mapa-10, 20, 30, 40, 50, 60 years pa yan never ako magsasawang iparamdam tayo at sabihin sayo na mahal na mahal kita at hinding hindi kita iiwan baby ko! I love you so much from the deepest bottom of my heart! 💕",
      "Travel ready na with youuu babyyy!✈️✈️✈️😘😍",
      "How lucky I am to be with someone that makes saying GOODBYE soooo hard. But makes it sooo worth it every single time because at the end of the day, we're going to see each other again no matter what. 🥹💖",
      "I can't wait for the day to come to have our mini versions of you and me baby koo! I'm sure you will be the best Mom ever, I can see it ☺️🥰",
      "I promise you this baby ko. I will always be there for you, through thick and thin, in good times and bad, and I will love you unconditionally for the rest of our lives. And one day I will marry you💍, have kids with you, grow old with you, and spend the rest of my life loving you with all my heart and soul! I love you so much baby ko! 💖",
   
      
      

    ];
    return {
      url,
      caption: captions[i % captions.length],
    };
  });

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-pink-50 to-red-50">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl text-center mb-8 text-red-500 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Our Beautiful Memories Together 💕
        </motion.h2>

        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Photo Display */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].caption}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/50 md:bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/50 md:bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
            </button>
          </div>

          {/* Caption Below Image */}
          <div className="p-6 bg-white min-h-[100px] flex items-center justify-center border-b border-gray-100">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                className="text-gray-800 text-xl md:text-2xl text-center font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {photos[currentIndex].caption}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Photo Indicators */}
          <div className="flex justify-center gap-2 p-4 bg-white">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-red-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4 text-lg">
            {currentIndex + 1} of {photos.length}
          </p>
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg shadow-lg"
          >
            See More Love <Heart className="w-5 h-5 ml-2" fill="currentColor" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
