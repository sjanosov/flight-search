import Header from './components/Header';
import { Autocomplete, TextField, Box, Button, Collapse } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FLIGHTS_API_URL, LOCATIONS_API_URL, dateFormater } from './api/constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FlightSkeleton } from './components/FlightSkeleton';


function App() {
  const [locationsFromData, setLocationsFromData] = useState([]);
  const [locationsToData, setLocationsToData] = useState([]);
  const [selectedFromValue, setSelectedFromValue] = useState({});
  const [selectedToValue, setSelectedToValue] = useState('');
  const [inputFromValue, setInputFromValue] = useState('');
  const [inputToValue, setInputToValue] = useState('');
  const [dateValue, setDateValue] = useState(undefined);
  const [flightsData, setFlightsData] = useState({});
  const formattedDateValue = dateFormater.format(dateValue)
  const [isFetching, setIsfetching] = useState(false);
  const [flightInfoOpen, setFlightInfoOpen] = useState([]); //<Number[]>


  useEffect(() => {
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
    if (dateValue != undefined && selectedFromValue != '' & selectedToValue != '') {
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


    fetchedFromData();
    fetchedToData();


  }, [inputFromValue, inputToValue, formattedDateValue])


  const handleflightInfoOpen = (clickIndex) => {
    if (flightInfoOpen.includes(clickIndex)) {
      const openFlightInfoCopy = flightInfoOpen.filter((element) => { return element !== clickIndex });
      setFlightInfoOpen(openFlightInfoCopy);
    } else {
      const openFlightInfoCopy = [...flightInfoOpen];
      openFlightInfoCopy.push(clickIndex);
      setFlightInfoOpen(openFlightInfoCopy);
    }
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

  return (
    <div className="search-page">
      <Header />
      <div className="container">
        <div className="search-form">
          <form>
            <div className="search-inputs">
              <Autocomplete
                id="autocompleteFrom"
                className="autocomplete is-from"
                inputValue={inputFromValue}
                onInputChange={(event, newInputValue) => {
                  setInputFromValue(newInputValue);
                }}
                getOptionLabel={(locationsFromData) => `${locationsFromData.code} ${locationsFromData.city.name}`}
                options={locationsFromData}
                onChange={(event, value) => setSelectedFromValue({ data: value })}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                noOptionsText={"No availabe location"}
                renderOption={(props, locationsFromData) => (
                  <Box component="p" {...props} key={locationsFromData.id}>
                    {locationsFromData.code} - {locationsFromData.city.name}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params}
                  label="From" />}

              />
              <Autocomplete
                id="autocompleteTo"
                className="autocomplete is-to"
                inputValue={inputToValue}
                onInputChange={(event, newInputValue) => {
                  setInputToValue(newInputValue);
                }}
                getOptionLabel={(locationsToData) => `${locationsToData.code} ${locationsToData.city.name}`}
                options={locationsToData}
                onChange={(event, value) => setSelectedToValue({ data: value })}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                noOptionsText={"No availabe location"}
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
          {isFetching ?
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
