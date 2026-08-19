import { useEffect, useCallback } from 'react'

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
]

export default function useKonami(onSuccess) {
  const sequence = []

  const handleKey = useCallback((e) => {
    sequence.push(e.key)
    if (sequence.length > KONAMI.length) sequence.shift()
    if (sequence.join(',') === KONAMI.join(',')) {
      onSuccess()
      sequence.length = 0
    }
  }, [onSuccess])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])
}
