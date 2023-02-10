import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

import { FlightSkeleton } from './FlightSkeleton';
import { Button, Collapse } from '@mui/material'
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { FlightsType } from '../types/types';
import moment from 'moment';

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

    const getRoutFlyTime = (time: number) => {
        let eDate = new Date(0);
        eDate.setUTCSeconds(time);
        let eDateString = eDate.toLocaleDateString() + " " + eDate.toLocaleTimeString();
        return eDateString;
    }



    let sortingMap = new Map();

    const lowestPrice = flightsData?.data?.map(flight => {
        console.log(flight)
        if (!sortingMap.has(flight.price)) sortingMap.set(flight.price, []);
        sortingMap.get(flight.price).push(flight);

        // console.log(sortingMap.forEach(f => f.push(flight.price)))
    })
    useEffect((() => {
        const flightLists = document.querySelectorAll(".flight-container");


        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle("show", entry.isIntersecting);
                if (entry.isIntersecting) observer.unobserve(entry.target)
            })
        }, {
            threshold: 1,
        })

        flightLists.forEach(list => {
            observer.observe(list);
        })

    }))
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
                                    <p className="f-from">
                                        <span className="text-size-12">From: </span>
                                        {flight.flyFrom}
                                    </p>
                                    <div className="f-info">
                                        <FontAwesomeIcon icon={faArrowDown} />
                                        <span className="f-duration">{flight.fly_duration}</span>
                                        <span className="f-change">{flight.route.length - 1 == 1 ? flight.route.length - 1 + " stop" : flight.route.length - 1 + " stops"}</span>
                                        {flight.has_airport_change ? <span className="f-duration">Has airport change</span> : null}
                                        <button className={classNames("f-more-details", { "open": flightInfoOpen.includes(index) })} onClick={() => handleflightInfoOpen(index)}>
                                            More details
                                            <span className="f-md-icon" aria-hidden={true} />
                                        </button>
                                    </div>
                                    <Collapse in={flightInfoOpen.includes(index)}>
                                        <table className="f-md-table">
                                            <thead>
                                                <tr>
                                                    <th>Airline</th>
                                                    <th className="from">From</th>
                                                    <th></th>
                                                    <th className="to">To</th>

                                                </tr>
                                            </thead>
                                            {flight?.route?.map((route, index) => {
                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td className="airline">
                                                                <p>{route.airline}</p>
                                                            </td>
                                                            <td className="from">
                                                                <p className="f-place">{route.flyFrom} {route.cityFrom}</p>
                                                                <p className="f-date">{getRoutFlyTime(route.dTimeUTC)}</p>
                                                            </td>
                                                            <td className="f-icon">
                                                                <FontAwesomeIcon icon={faPlane} />
                                                            </td>
                                                            <td className="to">
                                                                <p className="f-to">{route.flyTo} {route.cityTo}</p>
                                                                <p className="f-date">{getRoutFlyTime(route.aTimeUTC)}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                )
                                            })}
                                        </table>
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
