import { useEffect, useState } from 'react'
import './ScrollIndicator.css'

function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollPercentage(scrollPercent)
    }

    window.addEventListener('scroll', updateScrollPercentage)
    return () => window.removeEventListener('scroll', updateScrollPercentage)
  }, [])

  return (
    <div className="scroll-indicator">
      <div 
        className="scroll-indicator-bar" 
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  )
}

export default ScrollIndicator

