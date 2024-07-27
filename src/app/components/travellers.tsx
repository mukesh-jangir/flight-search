import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../../components/ui/button";
import { Popover, PopoverTrigger } from "../../components/ui/popover";
import { Card } from "../../components/ui/card";
import NumberComponent from "./number";
import { FlightTravellersParameters, TravelClass } from "../models/flight-parameters";

interface TravellerLabelProps {
  primary: string;
  secondary?: string;
}

function TravellerLabel({ primary, secondary }: TravellerLabelProps) {
  return (
    <div className="flex flex-col justify-items-center text-center">
      <span className="text-lg font-bold">{primary}</span>
      { secondary && <span className="text-xs">{secondary}</span> }
    </div>
  )
}

export interface TravellersProps extends FlightTravellersParameters {
  setInfo: (info: FlightTravellersParameters) => void;
}

export default function Travellers({ setInfo, ...params }: TravellersProps) {
  const travellersText = getTravellersText(params);
  const travellerClassText = getTravellerClassText(params.travelClass);
  const setAdults = (adults: number) => setInfo({ ...params, adults });
  const setChildren = (children: number) => setInfo({ ...params, childCount: children });
  const setInfants = (infants: number) => setInfo({ ...params, infants });
  const setTravelClass = (travelClass?: TravelClass) => setInfo({ ...params, travelClass });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex flex-col h-auto">
          <span className="text-m font-bold text-black">{travellersText}</span>
          {travellerClassText && <span className="text-xs text-gray-500">{travellerClassText}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Card className="p-3">
          <section className="grid grid-cols-3 justify-items-center">
            <div className="flex flex-col gap-3 justify-items-center">
              <TravellerLabel primary="Adults" secondary="(Aged 12+ yrs)"></TravellerLabel>
              <NumberComponent value={params.adults ?? 0} startRange={1} setValue={setAdults}></NumberComponent>
            </div>
            <div className="flex flex-col gap-3 justify-items-center">
              <TravellerLabel primary="Children" secondary="(Aged 2-12 yrs)"></TravellerLabel>
              <NumberComponent value={params.childCount ?? 0} startRange={0} setValue={setChildren}></NumberComponent>
            </div>
            <div className="flex flex-col gap-3 justify-items-center">
              <TravellerLabel primary="Infants" secondary="(Below 2 yrs)"></TravellerLabel>
              <NumberComponent value={params.infants ?? 0} startRange={0} setValue={setInfants}></NumberComponent>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-3 justify-items-center">
            <span className="text-lg font-bold">Travel Class</span>
            <div className="grid grid-cols-4 gap-2">
              {
                Object.values(TravelClass).map(travelClass => (
                  <Button variant="outline" key={travelClass} className={params.travelClass === travelClass ? 'bg-blue-100 text-blue-300' : ''}
                    onClick={() => setTravelClass(travelClass)}>{getTravellerClassText(travelClass)}</Button>
                ))
              }
            </div>
          </section>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

function getTravellersText(info: FlightTravellersParameters): string {
  if (info.adults === undefined) return '';
  
  const adultText = `${info.adults} Adult${info.adults > 1 ? 's' : ''}`;
  const childrenText = info.childCount ? `, ${info.childCount} ${info.childCount > 1 ? 'Children' : 'Child'}` : '';
  const infantText = info.infants ? `, ${info.infants} Infant${info.infants > 1 ? 's' : ''}`: '';

  return adultText + childrenText + infantText;
}

function getTravellerClassText(travelClass?: TravelClass): string {
  switch (travelClass) {
    case TravelClass.Business: return 'Business';
    case TravelClass.PremiumEconomy: return 'Premium Economy';
    case TravelClass.Economy: return 'Economy';
    case TravelClass.First: return 'First';
    default: return '';
  }
}