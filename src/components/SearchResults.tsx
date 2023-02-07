import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FlightSkeleton } from './FlightSkeleton';
import { Button, Collapse } from '@mui/material'
import classNames from 'classnames';
import React from 'react';
import { FlightsType } from '../types/types';

export interface ISearchResultsProps {
    flightInfoOpen: number[], 
    setFlightInfoOpen: (index: number[]) => void, 
    flightsData: FlightsType | null, 
    isFetching: boolean;
}

export const SearchResults = ({ flightInfoOpen, setFlightInfoOpen, flightsData, isFetching }: ISearchResultsProps) => {

    const handleflightInfoOpen = (clickIndex: number) => {
        let openFlightInfoCopy;
        if (flightInfoOpen.includes(clickIndex)) {
            openFlightInfoCopy = flightInfoOpen.filter((element) => { return element !== clickIndex });
        } else {
            openFlightInfoCopy = [...flightInfoOpen, clickIndex];
        }
        setFlightInfoOpen(openFlightInfoCopy);
    }
    return (
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
                    {flightsData?.data?.map((flight, index) => {
                        return (
                            <li key={index} className="flight-container">
                                <div className="flight-details">
                                    <p className="f-from"><span className="text-size-12">From: </span> {flight.flyFrom}</p>
                                    <div className="f-info">
                                        <FontAwesomeIcon icon={faArrowDown} />
                                        <span className="f-duration">{flight.fly_duration}</span>
                                        <span className="f-change">{flight.route.length} stops</span>
                                         <button className={classNames("f-more-details", {"open": flightInfoOpen.includes(index)})} onClick={() => handleflightInfoOpen(index)}>
                                            More details
                                            <span className="f-md-icon" aria-hidden={true}/>
                                            
                                            </button>
                                        {/* {flight?.route?.map((route) => {

                                            return (
                                                <span className="f-change">{route.flyFrom} stops</span>
                                            )
                                        })}  */}
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
                    })}
                </ul>
            }
        </div>
    )
}
