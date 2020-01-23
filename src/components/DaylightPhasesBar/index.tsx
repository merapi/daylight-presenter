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
  const midnightMoment = moment.utc(info.sunrise).startOf('day')

  const sunriseMoment = moment.utc(info.sunrise)
  const sunsetMoment = moment.utc(info.sunset)
  const daylightStart: SecondsSinceMidnight = sunriseMoment.diff(
    midnightMoment,
    'seconds'
  )
  const daylightEnd: SecondsSinceMidnight = daylightStart + info.day_length

  const civilTwilightMoment = moment.utc(info.civil_twilight_begin)
  const civilTwilightStart: SecondsSinceMidnight = civilTwilightMoment.diff(
    midnightMoment,
    'seconds'
  )

  const nauticalTwilightMoment = moment.utc(info.nautical_twilight_begin)
  const nauticalTwilightStart: SecondsSinceMidnight = nauticalTwilightMoment.diff(
    midnightMoment,
    'seconds'
  )

  const astronomicalTwilightMoment = moment.utc(
    info.astronomical_twilight_begin
  )
  const astronomicalTwilightStart: SecondsSinceMidnight = astronomicalTwilightMoment.diff(
    midnightMoment,
    'seconds'
  )

  console.log({ daylightStart, daylightEnd })

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
    'lightblue',
    '#666',
    '#888',
    'yellow',
    '#888',
    '#666',
    'lightgreen'
  ]

  const MARK_EVERY_X_HOURS = 0.5

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
            >
              <span>
                {phaseMoment.format('HH:mm')}
                <br />
                {phaseEndMoment.format('HH:mm')}
              </span>
              {/* <span>{phaseMoment.format('HH:mm')}</span> */}
              {/* {key === 'sunrise' && (
                <span>{phaseEndMoment.format('HH:mm')}</span>
              )} */}
            </Phase>
          )
        })}
        {/* <Phase
          background="navy"
          start={astronomicalTwilightStart}
          end={nauticalTwilightStart}
        >
          <span>{astronomicalTwilightMoment.format('HH:mm')}</span>
        </Phase>
        <Phase
          background="blue"
          start={nauticalTwilightStart}
          end={civilTwilightStart}
        >
          <span>{nauticalTwilightMoment.format('HH:mm')}</span>
        </Phase>
        <Phase
          background="lightblue"
          start={civilTwilightStart}
          end={daylightStart}
        >
          <span>{civilTwilightMoment.format('HH:mm')}</span>
        </Phase>
        <Phase background="yellow" start={daylightStart} end={daylightEnd}>
          <span>{sunriseMoment.format('HH:mm')}</span>
          <span>{sunsetMoment.format('HH:mm')}</span>
        </Phase> */}
      </Phases>
      <TimeBar>
        {Array(24 / MARK_EVERY_X_HOURS + 1)
          .fill(0)
          .map((el, i) => i * MARK_EVERY_X_HOURS)
          .map(hour => (
            <TimeMark time={hour * 60 * 60}>{hour}</TimeMark>
          ))}
      </TimeBar>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  )
}

export default styled(DaylightPhasesBar)`
  background: red;
`
