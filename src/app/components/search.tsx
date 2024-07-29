"use client"
import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import Combobox from "./combo-box";
import DatePicker from "./date-picker";
import Travellers from "./travellers";
import { FlightParameters, FlightSearchInfo, FlightTravellersParameters, TravelType } from "../models/flight-parameters";
import { DropdownItem } from "../models/dropdown-item";
import { AirportCodes } from "../models/airport-codes.enum";
import { Button } from "../../components/ui/button";
import { getFlights } from "../services/flights-search-service";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import FlightRow from "./flight-row";
import { Skeleton } from "../../components/ui/skeleton";

export default function Search() {
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

  const disableSearchButton = !(parameters.from && parameters.to && parameters.travelType && parameters.departureDate && parameters.adults)

  const setFrom = (from: string) => setParameters((current) => ({ ...current, from }));
  const setTo = (to: string) => setParameters((current) => ({ ...current, to }));
  const setDepartureDate = (departureDate: Date) => setParameters((current) => ({ ...current, departureDate }));
  const setReturnDate = (returnDate: Date) => setParameters((current) => ({ ...current, returnDate }));
  const setTravelType = (travelType: TravelType) => setParameters((current) => ({ ...current, travelType }));
  const setTravellersIfo = (travelInfo: FlightTravellersParameters) => setParameters((current) => ({ ...current, ...travelInfo }));
  const handleSearchClick = async () => {
    if (!disableSearchButton) {
      setIsLoading(true);
      const response = await getFlights(parameters);
      console.log(response);
      setFlights((response.bestFlights ?? [] ).concat(response.otherFlights ?? []));
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="grid grid-rows-2 grid-cols-[2fr_2fr_1fr_1fr_2fr] gap-2 items-center p-4 min-h-32 sticky top-0">
        <RadioGroup className="col-span-5 flex gap-3" value={parameters.travelType} onValueChange={(e) => setTravelType(e as TravelType)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={TravelType.OneWay} id="one-way"></RadioGroupItem>
            <label htmlFor="one-way">One-Way</label>
          </div>
          <div className="flex items-center space-x-2">
          <RadioGroupItem value={TravelType.RoundTrip} id="round-trip"></RadioGroupItem>
            <label htmlFor="round-trip">Round Trip</label>
          </div>
        </RadioGroup>
        <Combobox<string> label="From" items={items} setValue={setFrom} value={parameters.from}></Combobox>
        <Combobox<string> label="To" items={items} setValue={setTo} value={parameters.to}></Combobox>
        <DatePicker setDate={setDepartureDate} date={parameters.departureDate}></DatePicker>
        <DatePicker isDisabled={parameters.travelType === TravelType.OneWay} setDate={setReturnDate} date={parameters.returnDate}></DatePicker>
        <Travellers setInfo={setTravellersIfo}
          adults={parameters.adults}
          childCount={parameters.childCount}
          infants={parameters.infants}
          travelClass={parameters.travelClass}></Travellers>
        <Button variant="outline"
          disabled={disableSearchButton}
          size="lg"
          className="text-white hover:text-white hover:bg-amber-400 bg-amber-400  min-w-24 col-span-5 self-center max-w-10 justify-self-center"
          onClick={() => handleSearchClick()}>Search</Button>
      </Card>
      
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
    </>
  );
}
