'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
