import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Logo.scss'

const Logo = () => {
  const iconTextRef = useRef<HTMLImageElement>(null)
  const iconLogoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const element = document.querySelector('.simplebar-content-wrapper') as HTMLDivElement

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const style = window.getComputedStyle(element)
          const previousOverflow = mutation.oldValue?.match(/overflow:\s*(\w+)/)?.[1]
          const currentOverflow = style.overflow

          if (previousOverflow !== currentOverflow) {
            if (currentOverflow === 'scroll hidden') {
              iconTextRef.current!.style.display = 'none'
              iconLogoRef.current!.style.display = 'block'
            } else {
              iconLogoRef.current!.style.display = 'none'
              iconTextRef.current!.style.display = 'block'
            }
          }
        }
      })
    })
    observer.observe(element, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['style'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <Link to="/" className="logo-link">
      <div className="logo-wrap">
        <div className="logo">
          <div className="logo-monogram" ref={iconLogoRef}>
            <img src="/assets/images/logo/logotype.png" />
          </div>
          <div className="logo-text" ref={iconTextRef}>
            <img src="/assets/images/logo/logoMomentum.png" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
