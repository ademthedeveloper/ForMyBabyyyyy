import React, { useState, useEffect, useCallback, useMemo } from 'react';

type Scene = 'intro' | 'envelope' | 'letter';

const ENVELOPE_PIN = '0521';

const letterParagraphs = [
  { text: "💌 My baby ❤️", type: 'title' as const },
  { text: "So yeah... this might be a little weird.", type: 'normal' as const },
  { text: "A virtual envelope isn't exactly the most traditional way to write a love letter 😅", type: 'normal' as const },
  { text: "But I wanted our first month together to feel special.", type: 'normal' as const },
  { text: "I wanted to give you something you could open slowly, something that would make you smile before you even started reading.", type: 'normal' as const },
  { text: "And honestly... every moment with you feels worth celebrating.", type: 'emphasis' as const },
  { text: "It's only been one month, but you've already become such an important part of my life.", type: 'emphasis' as const },
  { text: "I'm genuinely grateful that I found you.", type: 'gratitude' as const },
  { text: "I'm grateful that I sent that first message.", type: 'gratitude' as const },
  { text: "I'm grateful for every conversation, every laugh, every memory, and every moment we've shared since then.", type: 'gratitude' as const },
  { text: "You make ordinary days feel brighter, and somehow even the shortest moments with you become the best part of my day.", type: 'normal' as const },
  { text: "I really love you, and I need you to know something.", type: 'emphasis' as const },
  { text: "You are deeply loved.\nMore than you probably realize.", type: 'emphasis' as const },
  { text: "Even when I'm not right beside you, I hope you always remember that there is someone thinking about you, caring about you, and appreciating you every single day.", type: 'normal' as const },
  { text: "My baby, time with you flies faster than I ever want it to.\nBut whenever we're apart, every minute suddenly feels much longer than it should.", type: 'normal' as const },
  { text: "Thank you for this first month.\nThank you for your kindness.\nThank you for your smile.\nThank you for your patience.\nThank you for being yourself.\nAnd thank you for letting me be part of your life.", type: 'thanks' as const },
  { text: "I don't know what the future holds, but I know that meeting you was one of the best things that could have happened to me.", type: 'normal' as const },
  { text: "💖 Happy One Month Anniversary, my love", type: 'anniversary' as const },
  { text: "I can't wait for all the months, memories, and moments that are still ahead of us.", type: 'normal' as const },
  { text: "With all my love,\nAdam ❤️", type: 'signature' as const },
];

/* ================================================================
   THEATER CURTAINS
   ================================================================ */
function TheaterCurtains({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[150] flex overflow-hidden">
      <div
        className="h-full w-1/2 transition-transform duration-[2000ms] ease-in-out"
        style={{
          transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
          background: '#881337',
          boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      <div
        className="h-full w-1/2 transition-transform duration-[2000ms] ease-in-out"
        style={{
          transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
          background: '#881337',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
        }}
      />
    </div>
  );
}

/* ================================================================
   FLOATING HEARTS
   ================================================================ */
function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 1 + Math.random() * 1,
      emoji: ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-500 animate-bounce"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}rem`,
            animation: `floatUp ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ================================================================
   CINEMATIC INTRO
   ================================================================ */
function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-playfair text-3xl md:text-5xl text-white mb-4">
        A Love Story Experience
      </h1>
      <p className="font-inter text-lg text-white/60 tracking-widest uppercase">
        Made with love
      </p>
    </div>
  );
}

/* ================================================================
   ENVELOPE SCENE
   ================================================================ */
function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  const [pin, setPin] = useState('');
  const [isWrong, setIsWrong] = useState(false);

  const handleInput = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(clean);
    if (clean.length === 4) {
      if (clean === ENVELOPE_PIN) {
        onOpen();
      } else {
        setIsWrong(true);
        setTimeout(() => {
          setPin('');
          setIsWrong(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-6">
      <div className={`mb-12 text-6xl transition-transform ${isWrong ? 'animate-shake' : ''}`}>
        {pin.length === 4 && pin === ENVELOPE_PIN ? '❤️' : '🔒'}
      </div>

      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-12 h-16 border-2 rounded-xl flex items-center justify-center text-2xl ${pin.length > i ? 'border-rose-500 bg-rose-500/10' : 'border-white/20'}`}>
            {pin.length > i ? '●' : ''}
          </div>
        ))}
      </div>

      <input
        type="tel"
        inputMode="numeric"
        autoFocus
        value={pin}
        onChange={(e) => handleInput(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-default"
      />

      <p className="font-dancing text-2xl text-rose-300">Enter PIN to open</p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ================================================================
   LOVE LETTER SECTION
   ================================================================ */
function LoveLetterSection() {
  return (
    <div className="min-h-screen w-full overflow-y-auto px-6 py-24 flex flex-col items-center">
      <h2 className="font-dancing text-4xl text-rose-300 mb-12">My Dearest,</h2>
      {letterParagraphs.map((para, i) => (
        <p key={i} className={`mb-8 text-center text-lg leading-relaxed ${para.type === 'title' ? 'text-2xl text-rose-400 font-bold' : 'text-white/80'}`}>
          {para.text}
        </p>
      ))}
    </div>
  );
}

/* ================================================================
   MAIN APP
   ================================================================ */
export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [scene, setScene] = useState<Scene>('intro');
  const [curtainsOpen, setCurtainsOpen] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => setCurtainsOpen(true), 500);
  };

  const nextScene = (next: Scene) => {
    setCurtainsOpen(false);
    setTimeout(() => {
      setScene(next);
      setTimeout(() => setCurtainsOpen(true), 500);
    }, 2500);
  };

  return (
    <div className="w-full h-full min-h-screen bg-black text-white font-inter">
      <TheaterCurtains isOpen={curtainsOpen} />

      {!isStarted ? (
        <div className="fixed inset-0 flex items-center justify-center z-[200] bg-black">
          <button
            onClick={handleStart}
            className="px-10 py-4 rounded-full border-2 border-rose-500 text-rose-100 text-lg uppercase tracking-widest font-bold"
          >
            Begin Experience
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full min-h-screen">
          <FloatingHearts />
          {scene === 'intro' && <CinematicIntro onComplete={() => nextScene('envelope')} />}
          {scene === 'envelope' && <EnvelopeScene onOpen={() => nextScene('letter')} />}
          {scene === 'letter' && <LoveLetterSection />}
        </div>
      )}
    </div>
  );
}
