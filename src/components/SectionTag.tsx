import { motion } from 'framer-motion'

type SectionTagProps = {
  label: string
  className?: string
  icon?: React.ReactNode
  align?: 'left' | 'center'
}

export function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c0-3.5 3.1-6 7-6s7 2.5 7 6" />
    </svg>
  )
}

export function BenefitsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7h6v6H5z" />
      <path d="M13 7h6v4h-6z" />
      <path d="M13 13h6v4h-6z" />
      <path d="M5 15h6v2H5z" />
    </svg>
  )
}

export function WorkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7V6a4 4 0 0 1 8 0v1" />
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M4 12h16" />
    </svg>
  )
}

export function MethodologyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v3" />
      <path d="M19 12h-3" />
      <path d="M12 19v-3" />
      <path d="M5 12h3" />
    </svg>
  )
}

export function InsightsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11z" />
    </svg>
  )
}

export function DesignIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20l5-1 10-10-4-4L5 15l-1 5z" />
      <path d="M14 6l4 4" />
    </svg>
  )
}

export function ThinkingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 10a4 4 0 1 1 8 0c0 2-1 2.5-1.7 3.2C13.5 14.4 13 15 13 17" />
      <path d="M12 21h.01" />
    </svg>
  )
}

export function TurnaroundIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7h6a4 4 0 1 1 0 8H9" />
      <path d="M7 7l3-3" />
      <path d="M7 7l3 3" />
    </svg>
  )
}

export default function SectionTag({ label, className = '', icon, align = 'left' }: SectionTagProps) {
  return (
    <motion.div
      className={`tag section-tag${icon ? ' tag--has-icon' : ''}${align === 'center' ? ' section-tag--centered' : ''}${className ? ` ${className}` : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {icon ? <span className="tag__icon" aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </motion.div>
  )
}