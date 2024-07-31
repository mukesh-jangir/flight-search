import { useEffect, useState } from "react";
import { DropdownItem } from "../models/dropdown-item";
import { FlightParameters, FlightSearchInfo, FlightsStateProps, FlightTravellersParameters, TravelType } from "../models/flight-parameters";
import { getFlights } from "../services/flights-search-service";
import getAirportCodes from "../services/get-airport-codes";

export default function useFlightsState(): FlightsStateProps {
  const [items, setItems] = useState<DropdownItem<string>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState<FlightParameters>({
    from: '',
    to: '',
    travelType: TravelType.OneWay,
    departureDate: new Date(),
    adults: 1
  });
  const [flights, setFlights] = useState<FlightSearchInfo[]>([]);

  useEffect(() => {
    const fetchAirports = async () => {
      const airports = await getAirportCodes();
      setItems(airports.map(x => ({ label: x.name, value: x.id })));
    }

    fetchAirports();
  }, []);

  const setFlightParameters = (data: Partial<FlightParameters>) => setParameters((current) => ({ ...current, ...data }));
  const handleSearchClick = async () => {
    setIsLoading(true);
    const response = await getFlights(parameters);
    setFlights((response.bestFlights ?? []).concat(response.otherFlights ?? []));
    setIsLoading(false);
  }

  return {
    items,
    isLoading,
    parameters,
    flights,
    fetchFlights: handleSearchClick,
    setFlightParameters
  }
}