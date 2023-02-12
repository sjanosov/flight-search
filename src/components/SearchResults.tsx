
import { FlightSkeleton } from './FlightSkeleton';
import React, { useEffect } from 'react';
import { FlightsType } from '../types/types';
import { FlightsList } from './FlightsList';

export interface ISearchResultsProps {
    flightInfoOpen: string[],
    setFlightInfoOpen: (id: string[]) => void,
    flightsData: FlightsType | null,
    isFetching: boolean;
}

export const SearchResults = ({ flightInfoOpen, setFlightInfoOpen, flightsData, isFetching }: ISearchResultsProps) => {

    //Pick first three flights (lowest prices)
    const lowestPriceFlightList = flightsData?.data?.filter((flight, index) => index < 3)

    //shortest time
    flightsData?.data?.sort((a, b) => a.duration.total - b.duration.total)
    const shortestTimeFlightList = flightsData?.data?.filter((flight, index) => index < 3)

    //other flights 
    flightsData?.data?.sort((a, b) => a.price - b.price)
    const otherFlightsList = flightsData?.data?.filter((flight) => !lowestPriceFlightList?.includes(flight) && !shortestTimeFlightList?.includes(flight))



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
                flightsData != null ?
                    <>
                        <FlightsList flightInfoOpen={flightInfoOpen} setFlightInfoOpen={setFlightInfoOpen} flightsList={lowestPriceFlightList} title="Lowest prices" />
                        <FlightsList flightInfoOpen={flightInfoOpen} setFlightInfoOpen={setFlightInfoOpen} flightsList={shortestTimeFlightList} title="Shortest flights" />
                        <FlightsList flightInfoOpen={flightInfoOpen} setFlightInfoOpen={setFlightInfoOpen} flightsList={otherFlightsList} title="Other flights" />
                    </> : null
            }
        </div>
    )
}
