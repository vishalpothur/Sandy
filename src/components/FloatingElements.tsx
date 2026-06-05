'use client'

const elements = [
  { id: 1,  emoji: '✦', top: '12%', left: '5%',   size: 18, anim: 'deco-float', delay: '0s',    opacity: 0.35 },
  { id: 2,  emoji: '✦', top: '70%', left: '3%',   size: 14, anim: 'deco-slow',  delay: '1.2s',  opacity: 0.25 },
  { id: 3,  emoji: '✦', top: '30%', right: '4%',  size: 20, anim: 'deco-drift', delay: '0.4s',  opacity: 0.3  },
  { id: 4,  emoji: '★', top: '80%', right: '6%',  size: 16, anim: 'deco-float', delay: '2s',    opacity: 0.2  },
  { id: 5,  emoji: '🎈', top: '8%',  left: '88%',  size: 28, anim: 'deco-slow',  delay: '0.6s',  opacity: 0.7  },
  { id: 6,  emoji: '🎈', top: '55%', left: '92%',  size: 22, anim: 'deco-float', delay: '1.8s',  opacity: 0.55 },
  { id: 7,  emoji: '🧸', top: '22%', left: '2%',   size: 26, anim: 'deco-drift', delay: '0.9s',  opacity: 0.6  },
  { id: 8,  emoji: '🎀', top: '75%', left: '89%',  size: 24, anim: 'deco-slow',  delay: '1.5s',  opacity: 0.55 },
  { id: 9,  emoji: '🌟', top: '45%', left: '94%',  size: 20, anim: 'deco-float', delay: '0.2s',  opacity: 0.45 },
  { id: 10, emoji: '🌸', top: '60%', left: '1%',   size: 22, anim: 'deco-drift', delay: '2.5s',  opacity: 0.5  },
  { id: 11, type: 'dot', top: '18%', right: '10%', size: 10, anim: 'deco-slow',  delay: '1s',    opacity: 0.2,  color: '#e8a598' },
  { id: 12, type: 'dot', top: '85%', left: '15%',  size: 8,  anim: 'deco-float', delay: '3s',    opacity: 0.18, color: '#8fa68d' },
  { id: 13, type: 'dot', top: '40%', left: '97%',  size: 12, anim: 'deco-drift', delay: '0.7s',  opacity: 0.15, color: '#c97b5a' },
] as const

export default function FloatingElements({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {elements.map((el) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          top: el.top,
          left: 'left' in el ? el.left : undefined,
          right: 'right' in el ? (el as any).right : undefined,
          opacity: el.opacity,
          animation: `${el.anim} ${el.id % 2 === 0 ? '8s' : '6s'} ease-in-out ${el.delay} infinite`,
          willChange: 'transform',
          userSelect: 'none',
          zIndex: 0,
        }
        if ('type' in el && el.type === 'dot') {
          return (
            <div key={el.id} style={{ ...style, width: el.size, height: el.size, borderRadius: '50%', background: (el as any).color }} />
          )
        }
        return (
          <span key={el.id} style={{ ...style, fontSize: el.size }} role="presentation">
            {(el as any).emoji}
          </span>
        )
      })}
    </div>
  )
}
