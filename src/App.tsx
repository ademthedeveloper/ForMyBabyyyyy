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
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      {/* Left Curtain */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1/2 transition-transform duration-[2000ms] ease-in-out"
        style={{
          transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
          background: 'linear-gradient(to right, #4c0519, #9f1239, #881337, #4c0519)',
          boxShadow: '10px 0 50px rgba(0,0,0,0.8)',
          borderRight: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 30px, #000 60px)',
        }} />
      </div>
      {/* Right Curtain */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1/2 transition-transform duration-[2000ms] ease-in-out"
        style={{
          transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
          background: 'linear-gradient(to left, #4c0519, #9f1239, #881337, #4c0519)',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.8)',
          borderLeft: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          background: 'repeating-linear-gradient(-90deg, transparent, transparent 30px, #000 60px)',
        }} />
      </div>
    </div>
  );
}

/* ================================================================
   FLOATING HEARTS
   ================================================================ */
function FloatingHearts({ count = 10 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 7 + Math.random() * 9,
      size: 0.5 + Math.random() * 0.7,
      drift: -70 + Math.random() * 140,
      rotation: -60 + Math.random() * 120,
      emoji: ['❤️', '💕', '💖', '💗', '💘', '✨'][Math.floor(Math.random() * 6)],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: '-60px',
            fontSize: `${heart.size}rem`,
            animation: `floatUp ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
            '--drift': `${heart.drift}px`,
            '--rotation': `${heart.rotation}deg`,
            willChange: 'transform, opacity',
          } as any}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   CINEMATIC INTRO
   ================================================================ */
function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'waiting' | 'title' | 'subtitle' | 'progress' | 'done'>('waiting');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('title'), 600);
    const t2 = setTimeout(() => setPhase('subtitle'), 1800);
    const t3 = setTimeout(() => setPhase('progress'), 2400);
    const t4 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[80]">
      <div className={`transition-all duration-[2500ms] ease-out ${
        phase !== 'waiting' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white tracking-wide text-center px-6 animate-glow-pulse">
          A Love Story Experience
        </h1>
      </div>

      <div className={`mt-6 transition-all duration-[2000ms] ease-out ${
        phase === 'subtitle' || phase === 'progress' || phase === 'done' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <p className="font-inter text-base md:text-xl text-white/50 tracking-[0.3em] uppercase text-center px-6">
          A special letter made with love
        </p>
      </div>

      <div className={`mt-16 w-52 md:w-72 transition-all duration-1000 ${
        phase === 'progress' || phase === 'done' ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full animate-progress-fill"
            style={{ background: 'linear-gradient(90deg, #e11d48, #f43f5e, #fb7185)' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   ENVELOPE SCENE
   ================================================================ */
function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const [wrongPin, setWrongPin] = useState(false);

  useEffect(() => {
    if (rawInput.length === 4) {
      if (rawInput === ENVELOPE_PIN) {
        setIsOpen(true);
        setTimeout(() => onOpen(), 2500);
      } else {
        setWrongPin(true);
        setTimeout(() => {
          setRawInput('');
          setWrongPin(false);
        }, 1000);
      }
    }
  }, [rawInput, onOpen]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[80] bg-black">
      <div className="animate-envelope-float relative">
        <div className="w-60 h-44 md:w-80 md:h-56 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #9f1239 0%, #881337 30%, #4c0519 100%)', boxShadow: '0 25px 80px rgba(225, 29, 72, 0.3)' }}>
        </div>
        <div className="absolute top-0 left-0 w-full origin-top z-20" style={{ height: '55%', transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)', transition: 'transform 1.4s ease' }}>
          <div className="w-full h-full" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)', background: 'linear-gradient(180deg, #be123c 0%, #9f1239 100%)' }} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 z-30 transition-all duration-700" style={{ top: isOpen ? '20%' : '45%' }}>
          <span className="text-5xl md:text-6xl">{isOpen ? '❤️' : '🔒'}</span>
        </div>
      </div>

      {!isOpen && (
        <div className="mt-10 flex flex-col items-center">
          <input
            type="tel"
            maxLength={4}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value.replace(/[^0-9]/g, ''))}
            className="absolute opacity-0 w-0 h-0"
            autoFocus
            id="pin-input"
          />
          <div className={`flex gap-3 cursor-pointer ${wrongPin ? 'animate-shake' : ''}`} onClick={() => document.getElementById('pin-input')?.focus()}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`w-12 h-14 rounded-lg border-2 flex items-center justify-center transition-all ${rawInput.length > i ? 'border-rose-500 shadow-[0_0_10px_#e11d48]' : 'border-white/20'}`}>
                <span className="text-white text-2xl">{rawInput.length > i ? '●' : ''}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-rose-300/70 font-dancing text-xl">Enter PIN to open</p>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   LOVE LETTER SECTION
   ================================================================ */
function LoveLetterSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center py-24 px-6 bg-black overflow-y-auto">
      <div className={`max-w-2xl w-full transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="font-dancing text-4xl text-rose-300 mb-12 text-center">My Dearest,</h2>
        {letterParagraphs.map((para, i) => (
          <p
            key={i}
            className={`mb-8 text-center leading-relaxed ${para.type === 'title' ? 'font-dancing text-3xl text-rose-300' : para.type === 'emphasis' ? 'font-inter font-semibold text-rose-100' : 'font-inter text-white/70'}`}
            style={{ transition: `all 0.8s ease-out ${0.5 + i * 0.2}s`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            {para.text}
          </p>
        ))}
        <div className="h-20" />
      </div>
    </section>
  );
}

/* ================================================================
   MAIN APP
   ================================================================ */
export default function App() {
  const [scene, setScene] = useState<Scene>('intro');
  const [isStarted, setIsStarted] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    // Tiny delay to ensure component is rendered under curtains
    setTimeout(() => setCurtainsOpen(true), 100);
  };

  const handleIntroComplete = useCallback(() => {
    setCurtainsOpen(false); // Close curtains
    setTimeout(() => {
      setScene('envelope');
      setTimeout(() => setCurtainsOpen(true), 1000); // Open curtains
    }, 2500);
  }, []);

  const handleEnvelopeOpen = useCallback(() => {
    setCurtainsOpen(false); // Close curtains
    setTimeout(() => {
      setScene('letter');
      setTimeout(() => setCurtainsOpen(true), 1000); // Open curtains
    }, 2500);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-rose-500/30">
      {/* Background Hearts */}
      {isStarted && <FloatingHearts count={15} />}

      {/* Theater Curtains are ALWAYS present on top */}
      <TheaterCurtains isOpen={curtainsOpen} />

      {/* Start Button Screen */}
      {!isStarted && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
          <button
            onClick={handleStart}
            className="px-12 py-5 rounded-full border border-rose-500/30 text-rose-200 text-lg uppercase tracking-widest hover:bg-rose-500/10 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            Begin Experience
          </button>
        </div>
      )}

      {/* Content Rendering */}
      {isStarted && (
        <main className="relative z-[50]">
          {scene === 'intro' && <CinematicIntro onComplete={handleIntroComplete} />}
          {scene === 'envelope' && <EnvelopeScene onOpen={handleEnvelopeOpen} />}
          {scene === 'letter' && <LoveLetterSection />}
        </main>
      )}
    </div>
  );
}
