"use server"

import { FlightParameters, FlightSearchResponse, TravelType } from '../models/flight-parameters';
import { getJson } from "serpapi";

interface ApiFlightParameters {
  departure_id: string;
  arrival_id: string;
  currency: 'INR'; // keeping it restricted for now
  type?: string;
  outbound_date: string; // YYYY-MM-DD format
  return_date?: string; // YYYY-MM-DD format
  travel_class?: string;
  adults?: string;
  children?: string;
  infants_in_seat?: string;
  infants_on_lap?: string;
}

export async function getFlights(params: FlightParameters): Promise<FlightSearchResponse> {
  const apiParams = parametersToApiParametersMap(params);
  Object.keys(apiParams).forEach((key) => {
    if (apiParams[key as keyof ApiFlightParameters] === undefined) {
      delete apiParams[key as keyof ApiFlightParameters];
    }
  });

  return getJson({
    api_key: process.env.REACT_APP_SERP_API_KEY,
    engine: "google_flights",
    ...apiParams
  }).then(response => ({
    bestFlights: response.best_flights,
    otherFlights: response.other_flights
  }));
}

function parametersToApiParametersMap(params: FlightParameters): ApiFlightParameters {
  return {
    departure_id: params.from ?? '',
    arrival_id: params.to ?? '',
    currency: 'INR',
    type: params.travelType?.toString() ?? TravelType.OneWay.toString(),
    outbound_date: params.departureDate?.toISOString().split('T')[0] ?? '',
    return_date: params.returnDate?.toISOString().split('T')[0],
    travel_class: params.travelClass?.toString(),
    adults: params.adults?.toString(),
    children: params.childCount?.toString(),
    infants_in_seat: (params.allotInfantSeats ? params.infants : 0)?.toString(),
    infants_on_lap: (params.allotInfantSeats ? 0 : params.infants)?.toString()
  }
}