"use client"
import { Card } from "../../components/ui/card";
import Combobox from "./combo-box";
import DatePicker from "./date-picker";
import Travellers from "./travellers";
import { TravelType } from "../models/flight-parameters";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useContext } from "react";
import { FlightsContext } from "../contexts/flights-context";
import { useRouter } from "next/navigation";

export default function Search({ route }: { route?: string  }) {
  const router = useRouter();
  const { items,
    parameters,
    setFrom,
    setTo,
    setDepartureDate,
    setReturnDate,
    setTravelType,
    setTravellersIfo,
    fetchFlights } = useContext(FlightsContext);

  const handleSearchClick = () => {
    fetchFlights();
    if (route) {
      router.push(route);
    }
  }

  const disableSearchButton = !(parameters.from && parameters.to && parameters.travelType && parameters.departureDate && parameters.adults);

  return (
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
      <div className="flex flex-col">
        <span className="text-xs font-semibold">From</span>
        <Combobox<string> items={items} setValue={setFrom} value={parameters.from}></Combobox>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">To</span>
        <Combobox<string> items={items} setValue={setTo} value={parameters.to}></Combobox>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">Departure</span>
        <DatePicker setDate={setDepartureDate} date={parameters.departureDate}></DatePicker>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">Return</span>
        <DatePicker isDisabled={parameters.travelType === TravelType.OneWay} setDate={setReturnDate} date={parameters.returnDate}></DatePicker>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">Travellers</span>
        <Travellers setInfo={setTravellersIfo}
          adults={parameters.adults}
          childCount={parameters.childCount}
          infants={parameters.infants}
          travelClass={parameters.travelClass}></Travellers>
      </div>
      
      <Button variant="outline"
        disabled={disableSearchButton}
        size="lg"
        className="text-white hover:text-white hover:bg-amber-400 bg-amber-400  min-w-24 col-span-5 self-center max-w-10 justify-self-center"
        onClick={() => handleSearchClick()}>Search</Button>
    </Card>
  );
}
