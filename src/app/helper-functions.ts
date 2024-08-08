import { FlightSearchInfo, AdditionalFilters, Stops, SortParameters, SortBy } from "./models/flight-parameters";

export function getFilteredFlights(flights: FlightSearchInfo[], filters: AdditionalFilters): FlightSearchInfo[] {
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
        (flightInfo.price >= filters.priceRange.min && flightInfo.price <= filters.priceRange.max)
      )
    ));
  }
  
  export function sortFlights(flights: FlightSearchInfo[], sortParameters: SortParameters): FlightSearchInfo[] {
    const getArrivalDepartureMinutes = (dateString: string): number => {
      const timePart = dateString.split(' ')[1];
      const hoursAndMinSplit = timePart.split(':')[0];
  
      return (parseInt(hoursAndMinSplit[0])*60) + parseInt(hoursAndMinSplit[1]);
    }
  
    const sortOrder: SortOrder = sortParameters.ascending ? 'Asc' : 'Desc';
  
    switch (sortParameters.sortBy) {
      case SortBy.Price:
        return sortBy(getFlightsWithPrice(flights), 'price', sortOrder)
          .concat(getFlightsWithoutPrice(flights));
  
      case SortBy.Duration:
        return sortBy(flights, 'total_duration', sortOrder);
      
      case SortBy.Departure:
        // the departure time is to be considered only for the first flight
        return sortBy(
          flights,
          (x) => getArrivalDepartureMinutes(x.flights[0].departure_airport.time),
          sortOrder);
  
      case SortBy.Arrival:
        // arrival time is to be considered for the last flight
        return sortBy(
          flights,
          (x) => getArrivalDepartureMinutes(x.flights[x.flights.length - 1].arrival_airport.time),
          sortOrder);
    
      default: return flights;
    }
  }
  
  export function getFlightsWithoutPrice(flights: FlightSearchInfo[]): FlightSearchInfo[] {
    return flights.filter(x => x.price === undefined);
  }
  
  export function getFlightsWithPrice(flights: FlightSearchInfo[]): FlightSearchInfo[] {
    return flights.filter(x => x.price !== undefined);
  }
  
  export type SortOrder = 'Asc' | 'Desc'
  
  export function sortBy<T>(items: Array<T>, by: keyof T | ((item: T) => number), sortIn: SortOrder = 'Asc'): T[] {
    const sortFn = (a: number, b: number) => sortIn === 'Asc' ? a - b : b - a;
    const isFunction = typeof by === 'function';
    return isFunction ?
      items.sort((a, b) => sortFn(by(a), by(b))) :
      items.sort((a, b) => sortFn(a[by] as number, b[by] as number));
  }