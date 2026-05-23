import { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function Confetti({ trigger }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas dimensions to containing area
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const colors = [
      '#FFCE00', // German Gold
      '#DD0000', // German Red
      '#1A1A1A', // German Black
      '#4CAF50', // Duolingo green
      '#00A3FF', // Sky blue
    ];
    
    const particles: Particle[] = [];
    const particleCount = 65;

    // Initialize particles shooting up and outwards
    const startX = canvas.width / 2;
    const startY = canvas.height * 0.35;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI - Math.PI; // Range -180 to 0 degrees
      const speed = 6 + Math.random() * 8;
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed + (Math.random() * 2 - 1),
        vy: Math.sin(angle) * speed - 2, // Upwards pull
        radius: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 4 - 2) * 2,
        opacity: 1,
      });
    }

    let animationId: number;
    const gravity = 0.28;
    const friction = 0.985;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;

      particles.forEach((p) => {
        if (p.opacity <= 0) return;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity; // Gravity pull
        p.vx *= friction;
        p.vy *= friction;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.016; // Fade out gradually

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Draw squares/rectangles
          ctx.fillRect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
