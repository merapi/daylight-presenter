import App from 'App'
import React from 'react'
import { cleanup, fireEvent, render, waitForElement } from 'tests/utils'
import './mocks'

describe('Index page', () => {
  afterEach(cleanup)

  test('Show 4 locations on start, add 1 more', async () => {
    const {
      getByText,
      getByLabelText,
      getByTestId,
      getAllByTestId,
      findAllByTestId
    } = render(<App />)

    const locations = await findAllByTestId(/^location-/i)
    expect(locations).toHaveLength(4)

    getByText(/Add new location/i).click()

    const name = await waitForElement(() => getByLabelText(/name/i))
    fireEvent.change(name, { target: { value: 'Montgomery' } })

    const lat = getByLabelText(/lat/i)
    fireEvent.change(lat, { target: { value: '32.378877' } })

    const lon = getByLabelText(/lon/i)
    fireEvent.change(lon, { target: { value: '-86.309551' } })

    const add = getByText(/^Add$/)
    fireEvent.click(add)

    const locationsUpdated = await findAllByTestId(/^location-/i)
    expect(locationsUpdated).toHaveLength(5)

    getByText('Montgomery')
  })
})
