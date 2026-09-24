import { Smile, CloudRain, Flame, CloudSnow } from 'lucide-react'

export const MODES = [
  {
    id: 'happy',
    label: 'Happy',
    icon: Smile,
    color: '#f59e0b',
    soft: 'rgba(245, 158, 11, 0.12)',
    glow: 'rgba(245, 158, 11, 0.35)',
    accent: '#d97706',
  },
  {
    id: 'sad',
    label: 'Sad',
    icon: CloudRain,
    color: '#3b82f6',
    soft: 'rgba(59, 130, 246, 0.12)',
    glow: 'rgba(59, 130, 246, 0.35)',
    accent: '#2563eb',
  },
  {
    id: 'angry',
    label: 'Angry',
    icon: Flame,
    color: '#ef4444',
    soft: 'rgba(239, 68, 68, 0.12)',
    glow: 'rgba(239, 68, 68, 0.35)',
    accent: '#dc2626',
  },
  {
    id: 'depressed',
    label: 'Depressed',
    icon: CloudSnow,
    color: '#8b5cf6',
    soft: 'rgba(139, 92, 246, 0.12)',
    glow: 'rgba(139, 92, 246, 0.35)',
    accent: '#7c3aed',
  },
]

export const getMode = (id) => MODES.find((m) => m.id === id) || MODES[0]