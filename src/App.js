import Header from './components/Header';
import { Autocomplete, TextField, Box, Button, Collapse } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useMemo, useState } from 'react';
import Axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FLIGHTS_API_URL, LOCATIONS_API_URL, dateFormater } from './api/constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FlightSkeleton } from './components/FlightSkeleton';


function App() {
  const [locationsFromData, setLocationsFromData] = useState([]);
  const [locationsToData, setLocationsToData] = useState([]);
  const [selectedFromValue, setSelectedFromValue] = useState(null);
  const [selectedToValue, setSelectedToValue] = useState(null);
  const [inputFromValue, setInputFromValue] = useState('');
  const [inputToValue, setInputToValue] = useState('');
  const [dateValue, setDateValue] = useState(undefined);
  const [flightsData, setFlightsData] = useState({});
  const formattedDateValue = dateFormater.format(dateValue)
  const [isFetching, setIsfetching] = useState(false);
  const [flightInfoOpen, setFlightInfoOpen] = useState([]); //<Number[]>
  const [openDropdownInputFrom, setOpenDropdownInputFrom] = useState(false);
  const [openDropdownInputTo, setOpenDropdownInputTo] = useState(false);


  useEffect(() => {
    // console.log("useffect called")
    //locations fetch
    const fetchedFromData = () => Axios.get(`${LOCATIONS_API_URL}/${inputFromValue}&location_types=airport`)
      .then(res => {
        setLocationsFromData(res.data.locations)
      }).catch(error => console.log(error))

    const fetchedToData = () => Axios.get(`${LOCATIONS_API_URL}/${inputToValue}&location_types=airport`)
      .then(res => {
        setLocationsToData(res.data.locations)
      }).catch(error => console.log(error))



    //flights fetch
    // console.log(dateValue)
    // console.log(selectedFromValue)
    // console.log(selectedToValue)
    if (dateValue != undefined && selectedFromValue?.data != null && selectedToValue?.data != null) {
      setIsfetching(true);

      const fetchedFlightsData = () => Axios.get(`${FLIGHTS_API_URL}${selectedFromValue?.data?.code}&fly_to=${selectedToValue?.data?.code}&depart_after=${formattedDateValue}`)
        .then(res => {
          setFlightsData(res.data)

          setIsfetching(false);

        }).catch(error => {
          console.log(error);
          setIsfetching(false);
        })
      fetchedFlightsData();
    }
    else {
      setFlightsData({});
    }



    fetchedFromData();
    fetchedToData();


  }, [inputFromValue, inputToValue, formattedDateValue, selectedFromValue, selectedToValue])


  const handleflightInfoOpen = (clickIndex) => {
    let openFlightInfoCopy;
    if (flightInfoOpen.includes(clickIndex)) {
      openFlightInfoCopy = flightInfoOpen.filter((element) => { return element !== clickIndex });
    } else {
      openFlightInfoCopy = [...flightInfoOpen, clickIndex];
    }
    setFlightInfoOpen(openFlightInfoCopy);
  }

  const printFlights = () => {
    return flightsData?.data?.map((flight, index) => {
      return (
        <li key={index} className="flight-container">
          <div className="flight-details">
            <p className="f-from"><span className="text-size-12">From: </span> {flight.flyFrom}</p>
            <div className="f-info">
              <FontAwesomeIcon icon={faArrowDown} />
              <span className="f-duration">{flight.fly_duration}</span>
              <span className="f-change">{flight.route.length} stops</span>
              <button onClick={() => handleflightInfoOpen(index)}>More details...</button>
              {/* {flight?.route?.map((route) => {
                
                return (
                  <span className="f-change">{route.flyFrom} stops</span>
                )
              })} */}

            </div>
            <Collapse in={flightInfoOpen.includes(index)}>
              flight info flight info flight info flight info flight info
              flight info flight info flight info flight info flight info
            </Collapse>
            <p className="f-to"><span className="text-size-12">To: </span>{flight.flyTo}</p>
          </div>
          <div className="flight-book">
            <p className="f-price">{flight.price} eur</p>
            <Button
              variant="contained"
              className="f-book" sx={{
                backgroundColor: "#00ad98",
                boxShadow: "none",
                '&: hover': {
                  backgroundColor: "#098777"
                }
              }} >Book</Button>
          </div>
        </li>)
    });
  }


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
    <div className="search-page">
      <Header />
      <div className="container">
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
                onChange={(event, value) => { setSelectedFromValue({ data: value }); setOpenDropdownInputFrom(false); }}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                noOptionsText={"No such place"}
                open={openDropdownInputFrom}


                renderOption={(props, locationsFromData) => (
                  <Box component="p" {...props} key={locationsFromData.id}>
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
                onChange={(event, value) => { setSelectedToValue({ data: value }); setOpenDropdownInputTo(false) }}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                noOptionsText={"No such place"}
                renderOption={(props, locationsToData) => (
                  <Box component="p" {...props} key={locationsToData.id}>
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
        <div className="search-results">
          {(isFetching && selectedFromValue != null && selectedToValue != null) ?
            <ul className="flight-skeleton-list">
              <FlightSkeleton />
              <FlightSkeleton />
              <FlightSkeleton />
              <FlightSkeleton />
              <FlightSkeleton />
              <FlightSkeleton />
            </ul>
            :
            <ul className="flight-list">
              {printFlights()}
            </ul>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
