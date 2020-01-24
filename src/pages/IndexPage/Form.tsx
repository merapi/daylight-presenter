import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import React, { FormEvent, useState } from 'react'
import { Inner } from './elements'

interface Props {
  data?: any
  edit?: boolean
  onSubmit: (data: any) => void
}

export default ({ data = {}, edit, onSubmit }: Props) => {
  console.log({ data })
  const [form, setForm] = useState(data)

  const handleChange = (field: string) => (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    console.log({ field, value })
    setForm({ ...form, [field]: value })
  }

  const onClick = () => {
    onSubmit(form)
  }

  return (
    <Inner>
      <FormGroup label="Name" labelFor="name" labelInfo="(required)">
        <InputGroup
          id="name"
          onChange={handleChange('name')}
          value={form.name}
        />
      </FormGroup>
      <FormGroup label="Latitude" labelFor="lat" labelInfo="(required)">
        <InputGroup
          id="lat"
          placeholder="0.00"
          onChange={handleChange('lat')}
          value={form.lat}
        />
      </FormGroup>
      <FormGroup label="Longitude" labelFor="lon" labelInfo="(required)">
        <InputGroup
          id="lon"
          placeholder="0.00"
          onChange={handleChange('lon')}
          value={form.lon}
        />
      </FormGroup>
      <Button fill intent="success" onClick={onClick}>
        {edit ? 'Change' : 'Add'}
      </Button>
    </Inner>
  )
}
