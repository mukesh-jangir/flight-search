"use client"

import { useContext, useState } from "react"
import { Skeleton } from "../../../components/ui/skeleton";
import { FlightsContext } from "../../contexts/flights-context";
import { SortParameters, AdditionalFilters } from "../../models/flight-parameters";
import { FlightSortBy } from "../sort-by/sort-by";
import { FlightRow } from "./flight-row/flight-row";
import { getFilteredFlights, getFlightsWithPrice, sortFlights } from "../../helper-functions";
import Filters from "../filters/filters";

export default function FlightsList() {
  const { isLoading, flights } = useContext(FlightsContext);

  const [sortBy, setSortBy] = useState<SortParameters>({});
  const [additionalFilters, setAdditionalFilters] = useState<AdditionalFilters>({});
  
  if (isLoading) {
    return Array.from(Array(10).keys()).map((_: any, i: number) => (
      <Skeleton key={i} className="w-full h-14 mt-4" ></Skeleton>
    ))
  }

  const flightsWithPrice = getFlightsWithPrice(flights).map(x => x.price);
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
  );
}
