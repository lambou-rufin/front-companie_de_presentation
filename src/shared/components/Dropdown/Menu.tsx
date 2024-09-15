import React from 'react'

interface MenuProps extends React.HTMLProps<HTMLDivElement> {
  'aria-labelledby'?: string
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        {children}
      </div>
    )
  },
)

export default Menu
