import { useState, useEffect } from 'react'

const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      },
    )
    if (ref.current) {
      observer.observe(ref.current)
    }

    const { current } = ref
    return () => {
      current && observer.unobserve(current)
    }
  }, [ref, rootMargin])

  return isIntersecting
}

export { useOnScreen }
