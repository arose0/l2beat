import cx from 'classnames'
import React from 'react'

import { ShieldIcon } from '../icons'
import { ArchivedIcon } from '../icons/symbols/ArchivedIcon'
import { Callout } from './Callout'

export interface WarningBarProps {
  color: 'red' | 'yellow'
  text: string
  isCritical: boolean
  className?: string
  isArchived?: boolean
}

export function WarningBar({
  color,
  text,
  isCritical,
  className,
  isArchived,
}: WarningBarProps) {
  const iconFill =
    color === 'red'
      ? 'fill-red-700 dark:fill-red-300'
      : 'fill-yellow-700 dark:fill-yellow-300'

  return (
    <Callout
      className={cx('p-4', className)}
      color={color}
      icon={
        isArchived ? (
          <ArchivedIcon className={cx()} />
        ) : (
          <ShieldIcon className={cx(iconFill)} />
        )
      }
      body={
        isCritical ? (
          <>
            {text.slice(0, -1)}{' '}
            <span className="text-red-700 dark:text-red-300">(CRITICAL)</span>
            {text.slice(-1)}
          </>
        ) : (
          text
        )
      }
    />
  )
}
