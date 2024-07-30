"use client"

import { useContext, useEffect, useState } from "react"
import { FlightsContext } from "../contexts/flights-context"
import { Skeleton } from "../../components/ui/skeleton";
import FlightRow from "./flight-row";
import { AdditionalFilters, FlightSearchInfo, SortBy, SortParameters, Stops } from "../models/flight-parameters";
import FlightSortBy from "./sort-by";
import Filters from "./filters";

export default function FlightsList() {
  const { isLoading, flights } = useContext(FlightsContext);

  const [sortBy, setSortBy] = useState<SortParameters>({});
  const [additionalFilters, setAdditionalFilters] = useState<AdditionalFilters>({});
  
  if (isLoading) {
    return Array.from(Array(10).keys()).map((_: any, i: number) => (
      <Skeleton key={i} className="w-full h-14 mt-4" ></Skeleton>
    ))
  }

  const flightsWithPrice = flights.filter(x => x.price !== undefined).map(x => x.price);
  const minPrice = flights.length > 0 ? Math.min(...flightsWithPrice) : undefined;
  const maxPrice = flights.length > 0 ? Math.max(...flightsWithPrice) : undefined;
  const filteredAndSortedFlights = sortFlights(getFilteredFlights(flights.slice(), additionalFilters), sortBy);

  return (
    <section className="mt-4 grid grid-cols-[1fr_4fr] gap-4">
      <Filters setFilters={setAdditionalFilters} {...additionalFilters} min={minPrice} max={maxPrice} ></Filters>
      <section className="grid gap-4">
        <FlightSortBy setSortByParams={setSortBy} {...sortBy}></FlightSortBy>
        {
          filteredAndSortedFlights.map(props => (
            <FlightRow key={props.booking_token} {...props}></FlightRow>
          ))
        }
      </section>
    </section>
  )
}

function getFilteredFlights(flights: FlightSearchInfo[], filters: AdditionalFilters): FlightSearchInfo[] {
  if ( filters?.stops === undefined && filters?.priceRange === undefined) {
    return flights;
  }

  const stopsCheckFn = (flightInfo: FlightSearchInfo, stops?: Stops): boolean => {
    switch (stops) {
      case Stops.NonStop: return flightInfo.flights.length === 1;
      case Stops.OneStop: return flightInfo.flights.length === 2;
      case Stops.MultipleStops: return flightInfo.flights.length > 2;
      default: return true;
    }
  }

  return flights.filter(flightInfo => (
    stopsCheckFn(flightInfo, filters.stops) && 
    (
      filters.priceRange === undefined ||
      flightInfo.price === undefined ||
      (flightInfo.price >= filters.priceRange[0] && flightInfo.price <= filters.priceRange[1])
    )
  ));
}

function sortFlights(flights: FlightSearchInfo[], sortParameters: SortParameters): FlightSearchInfo[] {
  const getArrivalDepartureMinutes = (dateString: string): number => {
    const timePart = dateString.split(' ')[1];
    const hoursAndMinSplit = timePart.split(':')[0];

    return (parseInt(hoursAndMinSplit[0])*60) + parseInt(hoursAndMinSplit[1]);
  }

  switch (sortParameters.sortBy) {
    case SortBy.Price:
      const flightsWithoutPrice = flights.filter(x => x.price === undefined);
      const flightsWithPrice = flights.filter(x => x.price !== undefined);
      return flightsWithPrice
        .sort((a, b) => sortParameters.ascending ? a.price - b.price : b.price - a.price)
        .concat(flightsWithoutPrice);

    case SortBy.Duration:
      return flights.sort((a, b) => sortParameters.ascending ? a.total_duration - b.total_duration: b.total_duration - a.total_duration);
    
    case SortBy.Departure:
      // the departure time is to be considered only for the first flight
      return flights.sort((a, b) => sortParameters.ascending ?
        getArrivalDepartureMinutes(a.flights[0].departure_airport.time) -  getArrivalDepartureMinutes(b.flights[0].departure_airport.time) :
        getArrivalDepartureMinutes(b.flights[0].departure_airport.time) -  getArrivalDepartureMinutes(a.flights[0].departure_airport.time)
      );

    case SortBy.Arrival:
      // arrival time is to be considered for the last flight
      return flights.sort((a, b) => sortParameters.ascending ?
        getArrivalDepartureMinutes(a.flights[a.flights.length - 1].arrival_airport.time) -  getArrivalDepartureMinutes(b.flights[b.flights.length - 1].arrival_airport.time) :
        getArrivalDepartureMinutes(b.flights[b.flights.length - 1].arrival_airport.time) -  getArrivalDepartureMinutes(a.flights[a.flights.length - 1].arrival_airport.time)
      );
  
    default: return flights;
  }
}