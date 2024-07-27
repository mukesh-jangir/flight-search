"use client"
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../../components/ui/card";
import { Combobox } from "../combo-box";
import { DatePicker } from "../date-picker";
import { Travellers } from "../travellers/travellers";
import { TravelType } from "../../models/flight-parameters";
import { Button } from "../../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { FlightsContext } from "../../contexts/flights-context";

export default function Search({ route }: { route?: string  }) {
  const router = useRouter();
  const { airports: items,
    parameters,
    setFlightParameters,
    fetchFlights } = useContext(FlightsContext);

  const handleSearchClick = () => {
    fetchFlights();
    if (route) {
      router.push(route);
    }
  }

  const disableSearchButton = !(parameters.from && parameters.to && parameters.travelType && parameters.departureDate && parameters.adults && (parameters.travelType === TravelType.OneWay || parameters.returnDate));

  return (
    <Card className="grid grid-rows-2 grid-cols-[2fr_2fr_1fr_1fr_2fr] gap-2 items-center p-4 min-h-32 sticky top-0">
      <RadioGroup data-testid="travel-type" className="col-span-5 flex gap-3" value={parameters.travelType} onValueChange={(travelType: TravelType) => setFlightParameters({ travelType })}>
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
        <Combobox<string> data-testid="from"  items={items} setValue={(from) => setFlightParameters({from})} value={parameters.from}></Combobox>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">To</span>
        <Combobox<string> data-testid="to" items={items} setValue={(to) => setFlightParameters({to})} value={parameters.to}></Combobox>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">Departure</span>
        <DatePicker data-testid="departure" setDate={(departureDate) => setFlightParameters({departureDate})} date={parameters.departureDate}></DatePicker>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">Return</span>
        <DatePicker data-testid="return" isDisabled={parameters.travelType === TravelType.OneWay} setDate={(returnDate) => setFlightParameters({returnDate})} date={parameters.returnDate}></DatePicker>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">Travellers</span>
        <Travellers setInfo={(travellersIfo) => setFlightParameters({ ...travellersIfo })}
          adults={parameters.adults}
          childCount={parameters.childCount}
          infants={parameters.infants}
          travelClass={parameters.travelClass}
          data-testid="travellers"></Travellers>
      </div>
      
      <Button variant="outline"
        disabled={disableSearchButton}
        size="lg"
        className="text-white hover:text-white hover:bg-amber-400 bg-amber-400  min-w-24 col-span-5 self-center max-w-10 justify-self-center"
        onClick={() => handleSearchClick()}>Search</Button>
    </Card>
  );
}
