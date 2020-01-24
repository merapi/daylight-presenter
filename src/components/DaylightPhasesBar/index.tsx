import { SunriseSunsetInfo } from 'api/types'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { SecondsSinceMidnight } from 'types'
import { Phase, Phases } from './dayElements'
import { TimeBar, TimeMark } from './timeElements'

interface Props {
  info: SunriseSunsetInfo
  className?: string
}

const DaylightPhasesBar = ({ className, info }: Props) => {
  const midnightMoment = moment.utc(info.solar_noon).startOf('day')

  const phases = [
    'astronomical_twilight_begin',
    'nautical_twilight_begin',
    'civil_twilight_begin',
    'sunrise',
    'sunset',
    'civil_twilight_end',
    'nautical_twilight_end',
    'astronomical_twilight_end'
  ]
  const phasesColors = [
    '#263e66',
    '#4773bb',
    '#87a4d3',
    '#dbe9ff',
    '#87a4d3',
    '#4773bb',
    '#263e66'
  ]

  const MARK_EVERY_X_HOURS = 3

  return (
    <div className={className}>
      <Phases>
        {phases.map((key, i) => {
          if (i === phases.length - 1) return null

          const phaseMoment = moment.utc(info[key])
          const phaseStart: SecondsSinceMidnight = phaseMoment.diff(
            midnightMoment,
            'seconds'
          )

          const phaseEndMoment = moment.utc(info[phases[i + 1]])
          const phaseEnd: SecondsSinceMidnight = phaseEndMoment.diff(
            midnightMoment,
            'seconds'
          )

          return (
            <Phase
              background={phasesColors[i]}
              start={phaseStart}
              end={phaseEnd}
              key={key}
            >
              {key === 'sunrise' && (
                <>
                  <span>{phaseMoment.format('HH:mm')}</span>
                  <span>{phaseEndMoment.format('HH:mm')}</span>
                </>
              )}
            </Phase>
          )
        })}
      </Phases>
      <TimeBar>
        {Array(24 / MARK_EVERY_X_HOURS + 1)
          .fill(0)
          .map((el, i) => i * MARK_EVERY_X_HOURS)
          .map(hour => (
            <TimeMark key={hour} time={hour * 60 * 60}>
              {hour}
            </TimeMark>
          ))}
      </TimeBar>
      {/* <pre>{JSON.stringify(info, null, 2)}</pre> */}
    </div>
  )
}

export default styled(DaylightPhasesBar)`
  width: 100%;
`
