// hooks/useSmoothScroll.ts
'use client'
import { useCallback } from 'react'

const useSmoothScroll = () => {
  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  return scrollToId
}

export default useSmoothScroll
