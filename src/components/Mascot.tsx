import { motion } from 'motion/react';

interface MascotProps {
  state: 'idle' | 'correct' | 'wrong' | 'dance' | 'static';
  size?: number;
}

export function Mascot({ state, size = 120 }: MascotProps) {
  // Sparkle stars for correct state
  const sparkles = [
    { cx: 15, cy: 20, delay: 0 },
    { cx: 105, cy: 30, delay: 0.1 },
    { cx: 25, cy: 95, delay: 0.2 },
  ];

  // Tears for wrong state
  const tears = [
    { cx: 38, cy: 60 },
    { cx: 82, cy: 60 },
  ];

  // Motion variants for core body animations
  const bodyVariants = {
    idle: {
      y: [0, -4, 0],
      scaleY: [1, 1.02, 1],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    correct: {
      y: [0, -18, 0, -12, 0],
      scaleY: [1, 0.9, 1.1, 0.95, 1],
      rotate: [0, -5, 5, -3, 3, 0],
      transition: {
        duration: 0.75,
        ease: 'easeOut',
      },
    },
    wrong: {
      x: [0, -8, 8, -6, 6, -4, 4, 0],
      y: [0, 4, 0],
      scaleY: [1, 0.96, 1],
      transition: {
        duration: 0.55,
        ease: 'easeInOut',
      },
    },
    dance: {
      y: [0, -10, 0, -10, 0],
      x: [-5, 5, -5, 5, 0],
      rotate: [0, -10, 10, -10, 10, 0],
      scaleX: [1, 1.05, 0.95, 1.05, 1],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
    static: {
      y: 0,
      scaleY: 1,
      transition: { duration: 0 },
    },
  };

  const armVariantsL = {
    idle: { rotate: [0, 5, 0], transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
    correct: { rotate: [0, -45, 0], transition: { duration: 0.4 } },
    wrong: { rotate: [0, 15, 0], transition: { duration: 0.5 } },
    dance: { rotate: [0, -80, 0, -80, 0], transition: { duration: 1.4, repeat: Infinity } },
    static: { rotate: 0, transition: { duration: 0 } },
  };

  const armVariantsR = {
    idle: { rotate: [0, -5, 0], transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
    correct: { rotate: [0, 45, 0], transition: { duration: 0.4 } },
    wrong: { rotate: [0, -15, 0], transition: { duration: 0.5 } },
    dance: { rotate: [0, 85, 0, 85, 0], transition: { duration: 1.4, repeat: Infinity } },
    static: { rotate: 0, transition: { duration: 0 } },
  };

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      
      {/* Absolute floating sparkles on CORRECT */}
      {state === 'correct' && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {sparkles.map((star, idx) => (
              <motion.path
                key={idx}
                d="M0,-5 L1,-1 L5,0 L1,1 L0,5 L-1,1 L-5,0 L-1,-1 Z"
                fill="#FFCE00"
                initial={{ scale: 0, x: star.cx, y: star.cy, opacity: 0 }}
                animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], rotate: [0, 90] }}
                transition={{ duration: 0.8, delay: star.delay, ease: 'easeOut' }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Main Mascot Draw area */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        className="overflow-visible"
        variants={bodyVariants}
        animate={state}
        initial="idle"
      >
        <g id="bear-mascot">
          {/* Shadow beneath Bear */}
          <ellipse cx="60" cy="112" rx="36" ry="6" fill="#1A1A1A" fillOpacity="0.12" />

          {/* Ears */}
          {/* Left Ear */}
          <circle cx="36" cy="34" r="14" fill="#8D5524" />
          <circle cx="36" cy="34" r="8" fill="#F0C27B" />
          
          {/* Right Ear */}
          <circle cx="84" cy="34" r="14" fill="#8D5524" />
          <circle cx="84" cy="34" r="8" fill="#F0C27B" />

          {/* Arms (Behind Body) */}
          {/* Left Arm */}
          <motion.path
            d="M26 68 C16 68, 12 55, 14 48 C16 42, 24 45, 28 55 Z"
            fill="#704214"
            transform="translate(24, 58)"
            variants={armVariantsL}
            style={{ originX: '26px', originY: '58px' }}
          />
          {/* Right Arm */}
          <motion.path
            d="M94 68 C104 68, 108 55, 106 48 C104 42, 96 45, 92 55 Z"
            fill="#704214"
            transform="translate(92, 58)"
            variants={armVariantsR}
            style={{ originX: '94px', originY: '58px' }}
          />

          {/* Main Body + Head merged */}
          {/* Round chubby body */}
          <rect x="25" y="45" width="70" height="60" rx="35" fill="#8D5524" />
          
          {/* Light chest bell patch */}
          <ellipse cx="60" cy="85" rx="18" ry="15" fill="#F0C27B" />

          {/* Cute German Flag scarf wrapped around neck (layered over chest) */}
          <g id="scarf-neck">
            {/* Horizontal band stripes around neck area (y: 64 to 73) */}
            {/* Scarf Base strip */}
            <rect x="36" y="65" width="48" height="10" rx="4" fill="#1A1A1A" />
            <rect x="36" y="68" width="48" height="7" rx="2" fill="#DD0000" />
            <rect x="36" y="72" width="48" height="3" rx="1" fill="#FFCE00" />

            {/* Scarf hanging tail (animated slightly or statically drooping on right) */}
            <motion.g 
              initial={{ rotate: 0 }}
              animate={state === 'dance' ? { rotate: [-10, 15, -10] } : state === 'wrong' ? { rotate: 25 } : state === 'static' ? { rotate: 0 } : { rotate: [0, 4, 0] }}
              transition={{ duration: 2, repeat: repeatBehavior(state) }}
              className="origin-top-left"
              style={{ originX: '76px', originY: '70px' }}
            >
              {/* Hanging scarf flap */}
              <path d="M72 72 L82 72 L85 96 L71 96 Z" fill="#1A1A1A" />
              <path d="M75 72 L81 72 L83 96 L74 96 Z" fill="#DD0000" />
              <path d="M78 72 L80 72 L81 96 L77 96 Z" fill="#FFCE00" />
              {/* Tassel fringe */}
              <line x1="72" y1="96" x2="72" y2="100" stroke="#FFCE00" strokeWidth="2.5" />
              <line x1="77" y1="96" x2="77" y2="100" stroke="#DD0000" strokeWidth="2.5" />
              <line x1="82" y1="96" x2="82" y2="100" stroke="#1A1A1A" strokeWidth="2.5" />
            </motion.g>
          </g>

          {/* Bear Face muzzle */}
          <ellipse cx="60" cy="54" rx="14" ry="10" fill="#F0C27B" />
          {/* Nose */}
          <polygon points="56,49 64,49 60,53" fill="#1A1A1A" />
          {/* Mouth line */}
          <path d="M60,53 L60,57 C58,57 57,56 57,55 M60,57 C62,57 63,56 63,55" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />

          {/* Eyes & Blushing */}
          {(state === 'idle' || state === 'static') && (
            <>
              {/* Happy dots */}
              <circle cx="45" cy="46" r="3.5" fill="#1A1A1A" />
              <circle cx="75" cy="46" r="3.5" fill="#1A1A1A" />
              {/* Blush */}
              <circle cx="38" cy="52" r="3" fill="#DD0000" fillOpacity="0.4" />
              <circle cx="82" cy="52" r="3" fill="#DD0000" fillOpacity="0.4" />
            </>
          )}

          {state === 'correct' && (
            <>
              {/* Thrilled happy curved closed eyes ^ ^ */}
              <path d="M41,48 Q45,43 49,48" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M71,48 Q75,43 79,48" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Big rosy cheeks */}
              <circle cx="38" cy="52" r="4.5" fill="#DD0000" fillOpacity="0.65" />
              <circle cx="82" cy="52" r="4.5" fill="#DD0000" fillOpacity="0.65" />
              {/* Happy tongue out mouth override */}
              <path d="M57,55 Q60,63 63,55 Z" fill="#DD0000" />
            </>
          )}

          {state === 'wrong' && (
            <>
              {/* Drooping sad curved eyes \ / */}
              <path d="M41,45 L48,49" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
              <path d="M79,45 L72,49" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
              
              {/* Sad droop mouth override */}
              <path d="M57,58 Q60,54 63,58" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* Absolute crying droplets */}
              {tears.map((tear, index) => (
                <motion.path
                  key={index}
                  d="M0,0 Q-4,6 0,8 Q4,6 0,0 Z"
                  fill="#0099FF"
                  initial={{ x: tear.cx, y: tear.cy, scale: 0.6 }}
                  animate={{ y: [tear.cy, tear.cy + 18], opacity: [1, 0], scale: [0.6, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.4 }}
                />
              ))}
            </>
          )}

          {state === 'dance' && (
            <>
              {/* Sparkling winking or star eyes or proud happy closed eyes */}
              <path d="M41,48 Q45,43 49,48" stroke="#1A1A1A" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              {/* Winking star eye */}
              <path d="M72,46 L78,46 M75,43 L75,49" stroke="#1A1A1A" strokeWidth="2.8" strokeLinecap="round" />
              {/* High blushed cheeks */}
              <circle cx="37" cy="51" r="5" fill="#FFCE00" fillOpacity="0.9" />
              <circle cx="83" cy="51" r="5" fill="#FFCE00" fillOpacity="0.9" />
              {/* Big happy mouth */}
              <ellipse cx="60" cy="58" rx="4" ry="3.5" fill="#DD0000" />
            </>
          )}
        </g>
      </motion.svg>
    </div>
  );
}

// Inline helper to get repeat count type safely
function repeatBehavior(state: 'idle' | 'correct' | 'wrong' | 'dance' | 'static') {
  return state === 'idle' || state === 'dance' || state === 'wrong' ? Infinity : 0;
}
