import React from 'react'

export const FlightSkeleton = () => {
    return (
        <>
            <li className="flight-skeleton">
                <div className="left-side">
                    <div className="fs w-75" />
                    <div className="fs w-160" />
                    <div className="fs w-75" />
                </div>
                <div className="right-side">
                    <div className="fs w-100" />
                    <div className="fs w-100" />
                </div>
            </li>
        </>

    )
}
