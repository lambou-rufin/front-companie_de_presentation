import classNames from 'classnames'
import { FC } from 'react'

const OverlineTitle: FC<any> = ({ className, ...props }) => {
  const Classes = classNames({
    'overline-title': true,
    [className]: className,
  })

  return (
    <>
      {!props.tag ? (
        <div className={Classes}>{props.children}</div>
      ) : (
        <props.tag className={Classes}>{props.children}</props.tag>
      )}
    </>
  )
}

export default OverlineTitle
