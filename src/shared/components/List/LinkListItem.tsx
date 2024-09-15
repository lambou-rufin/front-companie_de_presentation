import React from 'react'
import { Link } from 'react-router-dom'
const LinkListItem: React.FC<any> = ({ className, linkClassName, to, href, ...props }) => {
  return (
    <li className={className} style={{ cursor: 'pointer' }}>
      {to && (
        <Link className={linkClassName} to={to}>
          {props.children}
        </Link>
      )}
      {href && (
        <a className={linkClassName} href={href} >
          {props.children}
        </a>
      )}
        {props.onClick && (
        <a className={linkClassName} onClick={props.onClick} >
          {props.children}
        </a>
      )}
    </li>
  )
}

export default LinkListItem
