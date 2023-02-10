import Header from './components/Header';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { FLIGHTS_API_URL, LOCATIONS_API_URL, dateFormater } from './api/constants/constants';
import { SearchForm } from './components/SearchForm';
import { SearchResults } from './components/SearchResults';
import React from 'react';
import { FlightsType, LocationType} from './types/types';


function App() {
  const [locationsFromData, setLocationsFromData] = useState([]);
  const [locationsToData, setLocationsToData] = useState([]);
  const [selectedFromValue, setSelectedFromValue] = useState<LocationType | null>(null);
  const [selectedToValue, setSelectedToValue] = useState<LocationType | null>(null);
  const [inputFromValue, setInputFromValue] = useState('');
  const [inputToValue, setInputToValue] = useState('');
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [flightsData, setFlightsData] = useState<FlightsType | null>(null);
  const formattedDateValue = dateFormater.format(dateValue)
  const [isFetching, setIsfetching] = useState(false);
  const [flightInfoOpen, setFlightInfoOpen] = useState<number[]>([]); //<Number[]>
  const [openDropdownInputFrom, setOpenDropdownInputFrom] = useState(false);
  const [openDropdownInputTo, setOpenDropdownInputTo] = useState(false);

 

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
      setFlightsData(null);
    }

    fetchedFromData();
    fetchedToData();

   


  }, [inputFromValue, inputToValue, formattedDateValue, selectedFromValue, selectedToValue])


  
  return (
    <div className="search-page">
      <Header />
      <div className="container">
        <SearchForm
          inputFromValue={inputFromValue}
          setInputFromValue={setInputFromValue}
          selectedFromValue={selectedFromValue}
          setSelectedFromValue={setSelectedFromValue}
          openDropdownInputFrom={openDropdownInputFrom}
          setOpenDropdownInputFrom={setOpenDropdownInputFrom}
          locationsFromData={locationsFromData}
          inputToValue={inputToValue}
          setInputToValue={setInputToValue}
          selectedToValue={selectedToValue}
          setSelectedToValue={setSelectedToValue}
          openDropdownInputTo={openDropdownInputTo}
          setOpenDropdownInputTo={setOpenDropdownInputTo}
          locationsToData={locationsToData}
          dateValue={dateValue}
          setDateValue={setDateValue}
        />
        <SearchResults
          flightInfoOpen={flightInfoOpen}
          setFlightInfoOpen={setFlightInfoOpen}
          isFetching={isFetching}
          flightsData={flightsData}
        />
      </div>
    </div>
  );
}

export default App;
