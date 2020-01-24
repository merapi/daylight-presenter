import { SECONDS_IN_A_DAY } from 'config/consts'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { SecondsSinceMidnight } from 'types'

interface PhasesProps {
  className?: string
  children: ReactNode
}

export const Phases = styled(({ className, children }: PhasesProps) => {
  return <div className={className}>{children}</div>
})`
  background: #1f252d;
  position: relative;
  height: 40px;
  overflow: hidden;
  border-radius: 4px;
`

interface PhaseProps {
  className?: string
  start: SecondsSinceMidnight
  end: SecondsSinceMidnight
  background: string
  children: ReactNode
}

export const Phase = styled(({ className, children }: PhaseProps) => {
  return <div className={className}>{children}</div>
})`
  background: ${({ background }) => background};
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ end, start }) => ((end - start) / SECONDS_IN_A_DAY) * 100}%;
  left: ${({ start }) => (start / SECONDS_IN_A_DAY) * 100}%;
  transition: all 1s;
  color: #333;
  padding: 5px;
  font-size: 11px;
`
