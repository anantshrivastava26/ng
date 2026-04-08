import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Dot: NO spring — follows mouse with zero lag (direct motion value)
  // Ring: tight spring for a smooth but barely-lagging trail
  const ringX = useSpring(mouseX, { stiffness: 500, damping: 40, restDelta: 0.001 })
  const ringY = useSpring(mouseY, { stiffness: 500, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const body = document.body

    // Only show on fine pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) {
      body.classList.remove('cursor-ready')
      return
    }

    setMounted(true)
    body.classList.add('cursor-ready')

    const onMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null

      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      setIsHovering(Boolean(el?.closest('a, button, .project-tile, .bento-card, .tool-item')))
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      body.classList.remove('cursor-ready')
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="cursor"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          borderColor: '#fff',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}
