import Api from 'api'
import { ResponseStatus } from 'api/types'
import moment from 'moment'
import IndexPage from 'pages/IndexPage'
import React from 'react'

const cities = [
  { name: 'Kraków', lat: 50.064651, lon: 19.944981 },
  { name: 'Tokio', lat: 39.758602, lon: -104.997437 },
  { name: 'New York', lat: 55.755825, lon: 37.617298 }
]

const info = {
  sunrise: '2020-01-23T06:25:20+00:00',
  sunset: '2020-01-23T15:18:47+00:00',
  solar_noon: '2020-01-23T10:52:04+00:00',
  day_length: 32007,
  civil_twilight_begin: '2020-01-23T05:49:28+00:00',
  civil_twilight_end: '2020-01-23T15:54:39+00:00',
  nautical_twilight_begin: '2020-01-23T05:09:45+00:00',
  nautical_twilight_end: '2020-01-23T16:34:22+00:00',
  astronomical_twilight_begin: '2020-01-23T04:31:26+00:00',
  astronomical_twilight_end: '2020-01-23T17:12:41+00:00'
}

const App = () => {
  const now = moment().format('YYYY-MM-DD')

  Promise.all(
    cities.map(city =>
      Api.sunriseSunset.getInfoForGeolocationAndDate(city.lat, city.lon, now)
    )
  ).then(infos => console.log(infos))

  Api.sunriseSunset
    .getInfoForGeolocationAndDate(50.0619474, 19.9368564)
    // .getInfoForGeolocationAndDate(0, 19.9368564)
    .then(info => {
      if (info.status === ResponseStatus.OK) {
        const sunriseTime = info.results.sunrise
        const sunrise = moment.utc(sunriseTime)
        let now = moment().format('LLLL')

        console.log(info)
        console.log(sunriseTime)
        console.log(sunrise.toISOString(), sunrise.toLocaleString())
        console.log(now)
        console.log('local', moment().format())
        console.log('utc', moment.utc().format())
      } else {
        console.log(info.status)
      }
    })

  return (
    <>
      {/* <span>just a test</span> */}
      {/* <DaylightPhasesBar info={info} /> */}
      <IndexPage />
    </>
  )
}

export default App
