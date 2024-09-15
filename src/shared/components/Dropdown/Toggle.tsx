import React from 'react'

interface ToggleProps extends React.HTMLProps<HTMLAnchorElement> {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const Toggle = React.forwardRef<HTMLAnchorElement, ToggleProps>(
  ({ children, className, onClick }, ref) => (
    <a
      href="#down"
      ref={ref}
      onClick={(e: any) => {
        e.preventDefault()
        onClick(e)
      }}
      className={`d-inline-flex ${className ? className : ''}`}
    >
      {children}
    </a>
  ),
)

export default Toggle
