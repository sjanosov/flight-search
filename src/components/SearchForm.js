import React from 'react'
import { Autocomplete, TextField, Box, Button, Collapse } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const SearchForm = ({
  inputFromValue,
  setInputFromValue,
  selectedFromValue,
  setSelectedFromValue,
  setOpenDropdownInputFrom,
  openDropdownInputFrom,
  locationsFromData,
  inputToValue,
  setInputToValue,
  setSelectedToValue,
  selectedToValue,
  setOpenDropdownInputTo,
  openDropdownInputTo,
  locationsToData,
  dateValue,
  setDateValue
}) => {

  const handleInputFromOpen = (inputValue) => {
    if (inputValue.length > 0 && selectedFromValue?.data == null) {
      setOpenDropdownInputFrom(true);
    } else setOpenDropdownInputFrom(false);
  }

  const handleInputToOpen = (inputValue) => {
    if (inputValue.length > 0 && selectedToValue?.data == null) {
      setOpenDropdownInputTo(true);
    } else setOpenDropdownInputTo(false);
  }
  return (
    <div className="search-form">
      <form>
        <div className="search-inputs">
          <Autocomplete
            sx={{ background: "white" }}
            id="autocompleteFrom"
            className="autocomplete is-from"
            inputValue={inputFromValue}
            onInputChange={(event, newInputValue) => {
              setInputFromValue(newInputValue);
              handleInputFromOpen(newInputValue)
            }}
            getOptionLabel={(locationsFromData) => `${locationsFromData.code} ${locationsFromData.city.name}`}
            options={locationsFromData}
            onChange={(event, value) => {
              setSelectedFromValue({ data: value });
              setOpenDropdownInputFrom(false);
            }}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            noOptionsText={"No such place"}
            open={openDropdownInputFrom}


            renderOption={(props, locationsFromData) => (
              <Box component="li" {...props} key={locationsFromData.id}>
                {locationsFromData.code} - {locationsFromData.city.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params}
              label="From" />}

          />
          <Autocomplete
            sx={{ background: "white" }}
            id="autocompleteTo"
            className="autocomplete is-to"
            inputValue={inputToValue}
            onInputChange={(event, newInputValue) => {
              setInputToValue(newInputValue);
              handleInputToOpen(newInputValue);
            }}
            open={openDropdownInputTo}
            getOptionLabel={(locationsToData) => `${locationsToData.code} ${locationsToData.city.name}`}
            options={locationsToData}
            onChange={(event, value) => {
              setSelectedToValue({ data: value });
              setOpenDropdownInputTo(false)
            }}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            noOptionsText={"No such place"}
            renderOption={(props, locationsToData) => (
              <Box component="li" {...props} key={locationsToData.id}>
                {locationsToData.code} - {locationsToData.city.name}
              </Box>
            )}
            renderInput={(params) => <TextField {...params}
              label="To" />}

          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ background: "white" }}
              label="Date from"
              className="autocomplete"
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </form>
    </div>
  )
}
