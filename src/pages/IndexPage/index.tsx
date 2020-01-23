import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as locationsActions from 'store/locations/actions'
import styled from 'styled-components'

const IndexPage = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state)

  useEffect(() => {
    dispatch(locationsActions.setDate(moment().format('YYYY-MM-DD')))
    dispatch(locationsActions.addLocation('Kraków', 50.064651, 19.944981))
    dispatch(locationsActions.addLocation('SinCity', 666, 0))
    dispatch(locationsActions.addLocation('Tokio', 39.758602, -104.997437))
    dispatch(locationsActions.addLocation('New York', 55.755825, 37.617298))
  }, [dispatch])

  return (
    <div>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  )
}

export default styled(IndexPage)``
