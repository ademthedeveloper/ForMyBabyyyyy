import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

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
   FLOATING HEARTS
   ================================================================ */
function FloatingHearts({ count = 10, intense = false }: { count?: number; intense?: boolean }) {
  const hearts = useMemo(() => {
    const actualCount = intense ? count * 2 : count;
    return Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * (intense ? 10 : 20),
      duration: 7 + Math.random() * 9,
      size: 0.5 + Math.random() * (intense ? 1.2 : 0.7),
      drift: -70 + Math.random() * 140,
      rotation: -60 + Math.random() * 120,
      emoji: ['❤️', '💕', '💖', '💗', '💘', '✨'][Math.floor(Math.random() * 6)],
    }));
  }, [count, intense]);

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
   PARTICLES / SPARKLES
   ================================================================ */
function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.5,
      color: `rgba(255, ${Math.floor(130 + Math.random() * 125)}, ${Math.floor(170 + Math.random() * 85)}, 1)`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
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
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)',
      }} />

      {/* Title */}
      <div className={`transition-all duration-[2500ms] ease-out ${
        phase === 'title' || phase === 'subtitle' || phase === 'progress' || phase === 'done'
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide text-center px-6 animate-glow-pulse">
          A Love Story Experience
        </h1>
      </div>

      {/* Subtitle */}
      <div className={`mt-6 transition-all duration-[2000ms] ease-out ${
        phase === 'subtitle' || phase === 'progress' || phase === 'done'
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}>
        <p className="font-inter text-base md:text-xl text-white/50 tracking-[0.3em] uppercase text-center px-6">
          A special letter made with love
        </p>
      </div>

      {/* Netflix-style progress bar */}
      <div className={`mt-16 w-52 md:w-72 transition-all duration-1000 ${
        phase === 'progress' || phase === 'done' ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full animate-progress-fill animate-progress-glow"
            style={{
              background: 'linear-gradient(90deg, #e11d48, #f43f5e, #fb7185)',
            }}
          />
        </div>
      </div>

      {/* Sound bars */}
      <div className={`mt-8 flex gap-[3px] items-end transition-opacity duration-1000 ${
        phase === 'progress' || phase === 'done' ? 'opacity-60' : 'opacity-0'
      }`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              background: 'linear-gradient(to top, #e11d48, #fb7185)',
              animation: `soundBar 1.2s ease-in-out ${i * 0.12}s infinite alternate`,
              height: '6px',
            }}
          />
        ))}
      </div>
    </div>
  );
}



/* ================================================================
   ENVELOPE SCENE (with PIN)
   ================================================================ */
function EnvelopeScene({ onOpen }: { onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  // Single hidden input approach
  const [rawInput, setRawInput] = useState('');

  useEffect(() => {
    setWrongPin(false);

    if (rawInput.length === 4) {
      if (rawInput === ENVELOPE_PIN) {
        setIsOpen(true);
        setTimeout(() => setShowGlow(true), 600);
        setTimeout(() => setIsFading(true), 1800);
        setTimeout(() => onOpen(), 3000);
      } else {
        setWrongPin(true);
        setShakeKey((k) => k + 1);
        setTimeout(() => {
          setRawInput('');
          setWrongPin(false);
        }, 1500);
      }
    }
  }, [rawInput, onOpen]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-[80] transition-opacity duration-[1200ms] ${isFading ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(80, 10, 40, 0.3) 0%, rgba(0,0,0,1) 65%)',
      }}
    >
      <Particles />

      {/* Envelope */}
      <div className="animate-envelope-float select-none">
        <div
          className="relative animate-envelope-glow rounded-2xl"
          style={{ perspective: '1000px' }}
        >
          {/* Envelope body */}
          <div
            className="w-60 h-44 md:w-80 md:h-56 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #9f1239 0%, #881337 30%, #4c0519 100%)',
              boxShadow: '0 25px 80px rgba(225, 29, 72, 0.3), 0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            {/* Inner subtle pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
            }} />

            {/* Decorative lines */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-[6px]">
              <div className="h-[1px] bg-white/20 w-3/4" />
              <div className="h-[1px] bg-white/15 w-2/3" />
              <div className="h-[1px] bg-white/10 w-1/2" />
            </div>

            {/* Glow from inside when opened */}
            {showGlow && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 113, 133, 0.7) 0%, rgba(244, 63, 94, 0.3) 40%, transparent 70%)',
                  animation: 'fadeInSlow 0.5s ease-out forwards',
                }}
              />
            )}
          </div>

          {/* Envelope flap */}
          <div
            className="absolute top-0 left-0 w-full origin-top z-20"
            style={{
              height: '55%',
              transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
              transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                background: 'linear-gradient(180deg, #be123c 0%, #9f1239 60%, #881337 100%)',
                boxShadow: isOpen ? 'none' : '0 8px 30px rgba(225, 29, 72, 0.2)',
              }}
            />
          </div>

          {/* Heart seal or lock icon - Moved outside and higher Z-index */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-30 drop-shadow-2xl transition-all duration-700"
            style={{
              top: isOpen ? '20%' : '45%',
            }}
          >
            {isOpen ? (
              <span className="text-5xl md:text-6xl animate-heart-beat">❤️</span>
            ) : (
              <span className="text-5xl md:text-6xl">🔒</span>
            )}
          </div>
        </div>
      </div>

      {/* PIN input (shown before opening) */}
      {!isOpen && (
        <div className="mt-10 flex flex-col items-center">
          <p className="font-dancing text-xl md:text-2xl text-rose-300/70 mb-5 text-center animate-tap-pulse">
            Enter the PIN to open
          </p>

          {/* Hidden single input for mobile keyboard */}
          <input
            data-pin-input
            type="tel"
            inputMode="numeric"
            maxLength={4}
            value={rawInput}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
              setRawInput(v);
            }}
            className="absolute opacity-0 w-0 h-0"
            autoFocus
          />

          {/* Visual PIN display */}
          <div key={shakeKey} className={wrongPin ? 'animate-shake' : ''}>
            <div
              className="flex gap-3 md:gap-4 cursor-pointer"
              onClick={() => {
                const inp = document.querySelector('[data-pin-input]') as HTMLInputElement;
                if (inp) inp.focus();
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-14 md:w-14 md:h-16 rounded-lg border-2 flex items-center justify-center
                              transition-all duration-300 ${
                    rawInput.length === i && !wrongPin
                      ? 'border-rose-400/70 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                      : rawInput.length > i
                      ? 'border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
                      : 'border-white/20'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-white text-2xl md:text-3xl font-inter tracking-widest">
                    {rawInput.length > i ? '●' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {wrongPin && (
            <p
              className="mt-4 font-inter text-sm text-rose-400/80"
              style={{ animation: 'fadeInSlow 0.3s ease-out' }}
            >
              Try again ❤️
            </p>
          )}

          <p className="mt-6 font-inter text-xs text-white/20 tracking-wider text-center">
            Tap the digits above to enter
          </p>
        </div>
      )}

      {/* Opened state text */}
      {isOpen && (
        <div
          className="mt-10 transition-all duration-1000"
          style={{ animation: 'fadeInSlow 0.8s ease-out' }}
        >
          <p className="font-dancing text-2xl md:text-3xl text-rose-300/80 text-center">
            Opening your letter…
          </p>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   TYPEWRITER TEXT
   ================================================================ */
function TypewriterText({
  text,
  speed = 65,
  onComplete,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState('');
  const [complete, setComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let index = 0;
    setDisplayed('');
    setComplete(false);
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setComplete(true);
        onCompleteRef.current?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!complete && (
        <span
          className="inline-block ml-[2px] text-rose-400"
          style={{ animation: 'blink 1s step-end infinite' }}
        >
          |
        </span>
      )}
    </span>
  );
}

/* ================================================================
   LOVE LETTER SECTION
   ================================================================ */
function LoveLetterSection() {
  const [started, setStarted] = useState(false);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 py-24">
      <div className="max-w-2xl w-full">
        {/* Greeting */}
        <h2 className="font-dancing text-3xl md:text-4xl lg:text-5xl text-rose-300 mb-10 text-center drop-shadow-lg">
          <TypewriterText text="My Dearest," speed={75} onComplete={() => setStarted(true)} />
        </h2>

        {/* Paragraphs */}
        <div className={`transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
          {letterParagraphs.map((para, i) => {
            const renderText = (text: string) =>
              text.split('\n').map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ));

            let style: any = {
              opacity: started ? 1 : 0,
              transform: started ? 'translateY(0)' : 'translateY(15px)',
              transition: `all 0.8s ease-out ${0.2 + i * 0.25}s`,
            };

            let className = 'font-inter text-base md:text-lg text-white/70 leading-relaxed text-center mb-5';

            if (para.type === 'title') {
              className = 'font-dancing text-3xl md:text-5xl text-rose-300 text-center mb-8';
              style = { ...style, textShadow: '0 0 40px rgba(251, 113, 133, 0.6), 0 0 80px rgba(244, 63, 94, 0.3)' };
            } else if (para.type === 'anniversary') {
              className = 'font-dancing text-2xl md:text-3xl lg:text-4xl text-rose-300 text-center my-8';
              style = { ...style, textShadow: '0 0 30px rgba(251, 113, 133, 0.5), 0 0 60px rgba(244, 63, 94, 0.25)' };
            } else if (para.type === 'signature') {
              className = 'font-dancing text-2xl md:text-3xl text-rose-200 text-center mt-10';
              style = { ...style, textShadow: '0 0 20px rgba(251, 113, 133, 0.4)' };
            } else if (para.type === 'thanks') {
              className = 'font-inter text-base md:text-lg text-white/65 leading-relaxed text-center italic mb-6';
            } else if (para.type === 'gratitude') {
              className = 'font-inter text-base md:text-lg text-rose-200/70 leading-relaxed text-center mb-4';
              style = { ...style, textShadow: '0 0 10px rgba(251, 113, 133, 0.15)' };
            } else if (para.type === 'emphasis') {
              className = 'font-inter text-base md:text-lg text-white/85 leading-relaxed text-center mb-6 font-medium';
              style = { ...style, textShadow: '0 0 12px rgba(251, 113, 133, 0.1)' };
            }

            return (
              <p key={i} className={className} style={style}>
                {renderText(para.text)}
              </p>
            );
          })}

          {/* Decorative divider */}
          <div
            className="mt-14 flex items-center justify-center gap-4"
            style={{
              opacity: started ? 1 : 0,
              transition: 'opacity 1.5s ease-out 6s',
            }}
          >
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-rose-500/50" />
            <span className="text-rose-400 text-sm animate-heart-beat">❤️</span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-rose-500/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PHOTO GALLERY
   ================================================================ */
function PhotoCard({
  src,
  label,
  gradient,
}: {
  src: string;
  label: string;
  gradient: string;
}) {
  const [imgError, setImgError] = useState(false);
  const baseUrl = import.meta.env.BASE_URL || '/';
  const finalSrc = src.startsWith('http') ? src : `${baseUrl}${src.replace('./', '')}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer animate-photo-glow bg-white/5 border border-white/10">
      <div className={`relative flex flex-col ${gradient}`}>
        {!imgError ? (
          <img
            src={finalSrc}
            alt={label}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ minHeight: '200px' }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-rose-950/20 min-h-[300px]">
            <span className="text-5xl mb-3">📸</span>
            <span className="font-dancing text-rose-300/60 text-base">Image not found</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent opacity-80" />

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-dancing text-lg md:text-xl text-rose-100 text-center drop-shadow-lg">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function PhotoGallery() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const photos = [
    { src: 'IMG-20260526-WA0096.jpg', label: 'Our First Memory', gradient: 'bg-gradient-to-br from-rose-950/40 via-pink-900/20 to-purple-950/40' },
    { src: 'IMG-20260611-WA0006.jpg', label: 'Our Adventure', gradient: 'bg-gradient-to-br from-purple-950/40 via-indigo-900/20 to-blue-950/40' },
    { src: 'IMG-20260611-WA0008.jpg', label: 'Us Together', gradient: 'bg-gradient-to-br from-red-950/40 via-rose-900/20 to-pink-950/40' },
  ];

  return (
    <section className="py-24 flex flex-col items-center justify-center px-5">
      <h3
        className="font-playfair text-2xl md:text-3xl text-white/85 mb-14 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s ease-out',
        }}
      >
        Our Moments
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl w-full">
        {photos.map((photo, i) => (
          <div
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.8s ease-out ${0.3 + i * 0.2}s`,
            }}
          >
            <PhotoCard
              src={photo.src}
              label={photo.label}
              gradient={photo.gradient}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   MUSIC BUTTON
   ================================================================ */
function MusicButton() {
  const [hovered, setHovered] = useState(false);

  // ============================================================
  // 🎵 TO CHANGE THE SONG LINK:
  // Change the href below to any YouTube or Spotify URL you want
  // ============================================================
  const songUrl = 'https://www.youtube.com/watch?v=2Vv-BfVoq4g';

  return (
    <section className="py-16 flex flex-col items-center justify-center px-5">
      <div style={{ animation: 'fadeInUp 1s ease-out both' }}>
        <a
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass-card
                     hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            boxShadow: hovered
              ? '0 0 35px rgba(225, 29, 72, 0.4), 0 0 70px rgba(225, 29, 72, 0.15)'
              : '0 0 15px rgba(225, 29, 72, 0.15)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
          }}
        >
          <span
            className="text-2xl"
            style={{ animation: hovered ? 'heartBeat 0.8s ease-in-out infinite' : 'none' }}
          >
            🎵
          </span>
          <span className="font-inter text-base md:text-lg text-rose-200 tracking-wider">
            Play Our Song
          </span>
        </a>
        <p className="mt-4 text-center font-inter text-xs text-white/25 tracking-wider">
          Opens a special song on YouTube
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-16 text-center" style={{ opacity: visible ? 1 : 0, transition: 'opacity 2s ease-out' }}>
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-500/30" />
        <span className="text-rose-400 text-xs tracking-[0.3em] uppercase font-inter">
          Forever & Always
        </span>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-500/30" />
      </div>
      <div className="text-4xl animate-heart-beat mb-4">💖</div>
      <p className="font-inter text-xs text-white/10 tracking-[0.2em]">
        Made with ❤️
      </p>
    </div>
  );
}

/* ================================================================
   MAIN APP
   ================================================================ */
export default function App() {
  const [scene, setScene] = useState<Scene>('intro');
  const [transitioning, setTransitioning] = useState(false);

  const transitionTo = useCallback((newScene: Scene) => {
    setTransitioning(true);
    setTimeout(() => {
      setScene(newScene);
      window.scrollTo(0, 0);
      setTimeout(() => setTransitioning(false), 100);
    }, 1200);
  }, []);

  const handleIntroComplete = useCallback(() => {
    transitionTo('envelope');
  }, [transitionTo]);

  const handleEnvelopeOpen = useCallback(() => {
    transitionTo('letter');
  }, [transitionTo]);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Global subtle hearts */}
      {scene !== 'intro' && <FloatingHearts count={5} />}

      {/* Main scene */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 1.2s ease-in-out',
        }}
      >
        {scene === 'intro' && <CinematicIntro onComplete={handleIntroComplete} />}
        {scene === 'envelope' && <EnvelopeScene onOpen={handleEnvelopeOpen} />}

        {scene === 'letter' && (
          <div
            className="relative min-h-screen"
            style={{
              background:
                'linear-gradient(180deg, #000000 0%, #080012 15%, #0d0020 35%, #0a0018 60%, #050010 85%, #000000 100%)',
            }}
          >
            {/* Breathing glow */}
            <div
              className="fixed inset-0 animate-breathe pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 25%, rgba(100, 15, 60, 0.12) 0%, transparent 55%)',
              }}
            />
            <Particles />

            <div className="relative z-10">
              <LoveLetterSection />
              <PhotoGallery />
              <MusicButton />
              <Footer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
