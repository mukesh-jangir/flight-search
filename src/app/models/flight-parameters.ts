import { DropdownItem } from "./dropdown-item";

export enum TravelType {
  RoundTrip = '1',
  OneWay = '2'
}

export enum TravelClass {
  Economy = '1',
  PremiumEconomy = '2',
  Business = '3',
  First = '4'
}

export enum TravelClassNames {
  Economy = 'Economy',
  PremiumEconomy = 'Premium Economy',
  Business = 'Business',
  First = 'First'
}

export interface FlightTravellersParameters {
  adults?: number;
  childCount?: number;
  infants?: number;
  allotInfantSeats?: boolean;
  travelClass?: TravelClass;
}

export interface FlightParameters extends FlightTravellersParameters {
  from?: string;
  to?: string;
  travelType?: TravelType;
  departureDate?: Date; // YYYY-MM-DD format
  returnDate?: Date; // YYYY-MM-DD format
}

export interface AirportInfo {
  id: string;
  name: string;
}

export interface AirportDepartArrival extends AirportInfo {
  time: string;
}

export interface LayoverInfo extends AirportInfo {
  duration: number;
}

export interface FlightInfo {
  airline: string;
  airline_logo: string;
  airplane: string;
  arrival_airport: AirportDepartArrival;
  departure_airport: AirportDepartArrival;
  duration: number;
  flight_number: string;
  legroom: string;
  travel_class: string;
}

export interface FlightSearchInfo {
  airline_logo: string;
  booking_token: string;
  flights: FlightInfo[];
  layovers: LayoverInfo[];
  price: number;
  total_duration: number;
  type: string;
}

export interface FlightSearchResponse {
  bestFlights: FlightSearchInfo[];
  otherFlights: FlightSearchInfo[];
}

export interface FlightsStateProps {
  items: DropdownItem<string>[];
  isLoading: boolean;
  parameters: FlightParameters;
  flights: FlightSearchInfo[],
  fetchFlights: () => void,
  setFlightParameters: (data: Partial<FlightParameters>) => void;
}

export enum SortBy {
  Departure,
  Duration,
  Arrival,
  Price
}

export interface SortParameters {
  sortBy?: SortBy,
  ascending?: boolean;
}

export enum Stops {
  NonStop = "Non-Stop",
  OneStop = "1 Stop",
  MultipleStops = "2+ Stops"
}

export interface AdditionalFilters {
  stops?: Stops,
  priceRange?: number[]
}
