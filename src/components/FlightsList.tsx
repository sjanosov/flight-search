import { faArrowDown, faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse } from '@mui/material';
import classNames from 'classnames';
import React from 'react'
import { FlightsDataType } from '../types/types';

export interface IFlightListProps {
    flightInfoOpen: string[];
    setFlightInfoOpen: (id: string[]) => void;
    flightsList: FlightsDataType[] | undefined;
    title: string;
}

export const FlightsList = ({ flightInfoOpen, setFlightInfoOpen, flightsList, title }: IFlightListProps) => {

    const handleflightInfoOpen = (clickID: string) => {
        let openFlightInfoCopy;
        if (flightInfoOpen.includes(clickID)) {
            openFlightInfoCopy = flightInfoOpen.filter((element) => { return element !== clickID });
        } else {
            openFlightInfoCopy = [...flightInfoOpen, clickID];
        }
        setFlightInfoOpen(openFlightInfoCopy);
    }

    const getRoutFlyTime = (time: number) => {
        let eDate = new Date(0);
        eDate.setUTCSeconds(time);
        let eDateString = eDate.toLocaleDateString() + " " + eDate.toLocaleTimeString();
        return eDateString;
    }
    return (
        <>
            <h2 className="f-title">{title}</h2>

            <ul className="flight-list">
                {flightsList?.map((flight, index) => {
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
                                    {flight.has_airport_change ? <span className="f-airport-change">Airport change</span> : null}
                                    <button className={classNames("f-more-details", { "open": flightInfoOpen.includes(flight.id) })} onClick={() => handleflightInfoOpen(flight.id)}>
                                        More details
                                        <span className="f-md-icon" aria-hidden={true} />
                                    </button>
                                </div>
                                <Collapse in={flightInfoOpen.includes(flight.id)}>
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
            <hr />
        </>
    )
}
