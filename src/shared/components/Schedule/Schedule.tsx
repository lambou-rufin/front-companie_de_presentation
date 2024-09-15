import React from 'react'
import classNames from 'classnames'

const Schedule: React.FC<any> & { Item: React.FC<any> } = ({ className, children }) => {
  const compClass = classNames({
    'nk-schedule': true,
    [className]: className,
  })

  return <ul className={compClass}>{children}</ul>
}

const ScheduleItem: React.FC<any> = ({ symbol, flush, grow, contentClass, type, children }) => {
  const symbolClass = classNames({
    'nk-schedule-symbol': true,
    [symbol]: symbol,
  })

  const contentClasss = classNames({
    'nk-schedule-content': true,
    [contentClass]: contentClass,
  })

  return (
    <li className="nk-schedule-item">
      <div className="nk-schedule-item-inner">
        <div className={symbolClass}></div>
        <div className={contentClasss}>{children}</div>
      </div>
    </li>
  )
}

Schedule.Item = ScheduleItem

export default Schedule
