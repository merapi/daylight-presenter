import Api from 'api'
import { ResponseStatus } from 'api/types'
import moment from 'moment'
import React from 'react'

const cities = [
  { name: 'Kraków', lat: 50.064651, lon: 19.944981 },
  { name: 'Tokio', lat: 39.758602, lon: -104.997437 },
  { name: 'New York', lat: 55.755825, lon: 37.617298 }
]

const App = () => {
  const now = moment()

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

  return <div>just a test</div>
}

export default App
