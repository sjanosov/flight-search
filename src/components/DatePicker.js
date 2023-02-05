import React from 'react'
import { DatePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import { useState } from 'react'

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(null)
  console.log(selectedDate)
  return (
    <div>
      <DatePicker
        label="Date"
        renderInput={(params) => <TextField {...params} />}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
      />
    </div>
  )
}

export default DatePicker