import { useEffect, useState } from "react";
import { DropdownItem } from "../models/dropdown-item";
import { FlightParameters, FlightSearchInfo, FlightsStateProps, FlightTravellersParameters, TravelType } from "../models/flight-parameters";
import { AirportCodes } from "../models/airport-codes.enum";
import { getFlights } from "../services/flights-search-service";

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
        setItems([
            { label: 'Chennai', value: AirportCodes.Chennai },
            { label: 'Jaipur', value: AirportCodes.Jaipur }
        ]);
    }, []);

    const setFrom = (from: string) => setParameters((current) => ({ ...current, from }));
    const setTo = (to: string) => setParameters((current) => ({ ...current, to }));
    const setDepartureDate = (departureDate: Date) => setParameters((current) => ({ ...current, departureDate }));
    const setReturnDate = (returnDate: Date) => setParameters((current) => ({ ...current, returnDate }));
    const setTravelType = (travelType: TravelType) => setParameters((current) => ({ ...current, travelType }));
    const setTravellersIfo = (travelInfo: FlightTravellersParameters) => setParameters((current) => ({ ...current, ...travelInfo }));
    const handleSearchClick = async () => {
        setIsLoading(true);
        const response = await getFlights(parameters);
        console.log(response);
        setFlights((response.bestFlights ?? []).concat(response.otherFlights ?? []));
        setIsLoading(false);
    }

    return {
        items,
        isLoading,
        parameters,
        flights,
        setFrom,
        setTo,
        setDepartureDate,
        setReturnDate,
        setTravelType,
        setTravellersIfo,
        fetchFlights: handleSearchClick
    }
}