import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Fast dot
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35 })

  // Slow ring
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    // Only show on fine pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, .project-tile, .bento-card, .tool-item')) {
        setIsHovering(true)
      }
    }

    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, .project-tile, .bento-card, .tool-item')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="cursor"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          borderColor: isHovering ? '#7E19B0' : 'rgba(0,0,0,0.35)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}
