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
`

interface TimeMarkProps {
  className?: string
  time: SecondsSinceMidnight
  children: ReactNode
}

export const TimeMark = styled(({ className, children }: TimeMarkProps) => {
  return <span className={className}>{children}</span>
})`
  background: lightgreen;
  position: absolute;
  left: ${({ time }) => (time / SECONDS_IN_A_DAY) * 100}%;
  transform: translateX(-50%);
`
