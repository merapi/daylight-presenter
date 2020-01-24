import { SECONDS_IN_A_DAY } from 'config/consts'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { SecondsSinceMidnight } from 'types'

interface TimeBarProps {
  className?: string
  children: ReactNode
}

export const TimeBar = styled(({ className, children }: TimeBarProps) => {
  return <div className={className}>{children}</div>
})`
  background: #ccc;
  position: relative;
  margin-top: 2px;
  font-size: 11px;
  color: #ccc;
`

interface TimeMarkProps {
  className?: string
  time: SecondsSinceMidnight
  children: ReactNode
}

export const TimeMark = styled(({ className, children }: TimeMarkProps) => {
  return (
    <span className={className}>
      {children}
      <Line />
    </span>
  )
})`
  position: absolute;
  left: ${({ time }) => (time / SECONDS_IN_A_DAY) * 100}%;
  transform: translateX(-50%);
`

const Line = styled.div`
  position: absolute;
  left: 50%;
  top: -4px;
  translate: transformX(-50%);
  width: 1px;
  height: 4px;
  background: #ccc;
`
