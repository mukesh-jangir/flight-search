"use client"

import { useContext } from "react"
import { FlightsContext } from "../contexts/flights-context"
import { Skeleton } from "../../components/ui/skeleton";
import FlightRow from "./flight-row";

export default function FlightsList() {
  const { isLoading, flights } = useContext(FlightsContext);
  return (
    <section className="mt-4 grid gap-4">
      {!isLoading &&
        flights.map(props => (
          <FlightRow key={props.booking_token} {...props}></FlightRow>
        ))
      }
      {
        isLoading && Array.from(Array(10).keys()).map((_: any, i: number) => (
          <Skeleton key={i} className="w-full h-14" ></Skeleton>
        ))
      }
    </section>
  )
}