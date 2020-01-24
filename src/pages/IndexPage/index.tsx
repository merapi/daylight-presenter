import {
  Button,
  Callout,
  Card,
  Dialog,
  Elevation,
  Menu,
  Popover,
  Position,
  Spinner
} from '@blueprintjs/core'
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime'
import DaylightPhasesBar from 'components/DaylightPhasesBar'
import moment, { DurationInputArg2 } from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as locationsActions from 'store/locations/actions'
import * as locationsSelectors from 'store/locations/selectors'
import styled from 'styled-components'
import 'styles.css'
import { ControlPanel, LocationInfo, LocationPhases } from './elements'
import Form from './Form'

function getMomentFormatter(format: string): IDateFormatProps {
  return {
    formatDate: date => moment(date).format(format),
    parseDate: str => moment(str, format).toDate(),
    placeholder: format
  }
}

const IndexPage = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const locations = useSelector(locationsSelectors.list)
  const date = useSelector(locationsSelectors.date)
  const [formData, setFormData] = useState<any>({})
  const [showForm, setShowForm] = useState(false)

  const changeDate = (selectedDate: Date) => {
    dispatch(
      locationsActions.setDate(moment(selectedDate).format('YYYY-MM-DD'))
    )
  }

  const controlDate = (n: number, type: DurationInputArg2) => () => {
    let newDate = moment(date || undefined).add(n, type)

    if (type === 'month') {
      newDate.date(1)
    }

    dispatch(locationsActions.setDate(newDate.format('YYYY-MM-DD')))
  }

  const removeLocation = (lat: number, lon: number) => () => {
    dispatch(locationsActions.removeLocation(lat, lon))
  }

  const addNewLocation = (formData: any) => {
    dispatch(
      locationsActions.addLocation(formData.name, formData.lat, formData.lon)
    )
    setShowForm(false)
  }

  const updateLocation = (lat: number, lon: number) => (data: any) => {
    dispatch(locationsActions.updateLocation(lat, lon, data))
    setShowForm(false)
  }

  const editLocation = (lat: number, lon: number, name: string) => () => {
    setFormData({ lat, lon, name })
    setShowForm(true)
  }

  useEffect(() => {
    // Initialize our data
    if (!locations.length) {
      dispatch(locationsActions.setDate(moment().format('YYYY-MM-DD')))
      dispatch(locationsActions.addLocation('Kraków', 50.064651, 19.944981))
      dispatch(locationsActions.addLocation('SinCity', 666, 0))
      dispatch(locationsActions.addLocation('Tokio', 39.758602, -104.997437))
      dispatch(locationsActions.addLocation('New York', 55.755825, 37.617298))
    }
  }, [])

  return (
    <div>
      <Dialog
        onClose={() => setShowForm(false)}
        isOpen={showForm}
        style={{ width: 250 }}
      >
        <Form
          edit={true}
          data={formData}
          onSubmit={updateLocation(formData.lat, formData.lon)}
        />
      </Dialog>
      <ControlPanel>
        <div>
          <Popover
            content={<Form onSubmit={addNewLocation} />}
            position={Position.RIGHT_TOP}
          >
            <Button icon="add" text="Add new location" />
          </Popover>
        </div>
        <div>
          <Button
            icon="double-chevron-left"
            onClick={controlDate(-1, 'month')}
          />
          <Button icon="chevron-left" onClick={controlDate(-1, 'day')} />
          <DateInput
            value={date ? moment(date, 'YYYY-MM-DD').toDate() : null}
            onChange={changeDate}
            maxDate={moment('2040-01-01', 'YYYY-MM-DD').toDate()}
            {...getMomentFormatter('YYYY-MM-DD')}
          />
          <Button icon="chevron-right" onClick={controlDate(1, 'day')} />
          <Button
            icon="double-chevron-right"
            onClick={controlDate(1, 'month')}
          />
        </div>
      </ControlPanel>

      {locations.map(location => {
        const { lat, lon, name } = location
        let info = null
        if (date) {
          info = location.infoByDate[date]
        }
        return (
          <Card
            key={`${lat}_${lon}`}
            style={{ marginBottom: 20, minHeight: 100 }}
            elevation={Elevation.TWO}
          >
            <div style={{ display: 'flex' }}>
              <LocationInfo>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h1 className="bp3-heading" style={{ margin: '0 10px 0 0' }}>
                    {name}
                  </h1>
                  <Popover
                    content={
                      <Menu>
                        <Menu.Item
                          icon="edit"
                          text="Edit location"
                          onClick={editLocation(lat, lon, name)}
                        />
                        <Menu.Item
                          icon="trash"
                          intent="danger"
                          text="Remove location"
                          onClick={removeLocation(lat, lon)}
                        />
                      </Menu>
                    }
                    position={Position.RIGHT_TOP}
                  >
                    <Button icon="more" />
                  </Popover>
                </div>
                <div className="bp3-monospace-text">
                  {location.lat}, {location.lon}
                </div>
              </LocationInfo>

              <LocationPhases>
                {location.isLoading && <Spinner />}
                {info && <DaylightPhasesBar info={info} />}
                {location.isError && (
                  <Callout intent="danger" title="Error">
                    {location.isError}
                  </Callout>
                )}
              </LocationPhases>
            </div>
          </Card>
        )
      })}
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  )
}

export default styled(IndexPage)``
