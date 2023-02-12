export type FlightsType = {
    data: FlightsDataType[];
}

export type FlightsDataType = {
    id: string;
    fly_duration: string;
    duration: FlightDuration;
    route: RouteType[];
    flyFrom: string;
    flyTo: string;
    price: number;
    has_airport_change: boolean;
    
}

export type FlightDuration = {
    total: number;
}

export type RouteType = {
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    aTimeUTC: number;
    dTimeUTC: number;
    airline: string;
}

export type LocationType = {
    data: LocationDataType | null;
}

export type LocationDataType = {
    code: string;
    city: CityType;
    id: number;
}

export type CityType = {
    name: string;
}