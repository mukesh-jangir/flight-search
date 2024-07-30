import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Slider } from "../../components/ui/slider";
import { AdditionalFilters, Stops } from "../models/flight-parameters";
import Currency from "./currency";
import './filters.css';

export interface FiltersProps extends AdditionalFilters {
  setFilters: (filters: AdditionalFilters) => void;
  min?: number;
  max?: number;
}

export default function Filters({ stops, priceRange, setFilters, min, max }: FiltersProps) {
  const onStopsClick = (value?: Stops) => setFilters({ priceRange, stops: value });
  const onPriceRangeChange = (range?: number[]) => {
    setFilters({ stops, priceRange: range })
  };

  const minPrice = priceRange ? priceRange[0] ?? min : min;
  const maxPrice = priceRange ? priceRange[1] ?? max : max;

  return (
    <Card className="p-3 grid gap-4 h-max">
      <h3 className="font-bold">Filters</h3>
      <div className="divider"></div>
      <section className="grid gap-2 w-full">
        <div className="flex justify-between">
          <h5 className="font-bold">Stops</h5>
          <span className="text-xs cursor-pointer" onClick={() => onStopsClick()}>Reset</span>
        </div>
        <div className="flex gap-3 flex-wrap w-full">
          {
            Object.values(Stops).map(x => (
              <Button variant="outline" key={x} className={x === stops ? 'w-24 h-8 bg-blue-100 text-blue-300' : 'w-24 h-8'} onClick={() => onStopsClick(x as Stops)}>
                {x}
              </Button>
            ))
          }
        </div>
      </section>
      
      {
        min && max &&
        <>
          <div className="divider"></div>
          <section className="grid gap-2 w-full">
            <div className="flex justify-between">
              <h5 className="font-bold">Price</h5>
              <span className="text-xs cursor-pointer" onClick={() => onPriceRangeChange()}>Reset</span>
            </div>
            <Slider
              min={min}
              max={max}
              step={500}
              value={priceRange ? [priceRange[0]] : [min]}
              onValueChange={(value) => onPriceRangeChange([value[0], maxPrice!])}
            ></Slider>
            <div className="flex justify-between">
              <Currency amount={minPrice}></Currency>
              <Currency amount={maxPrice}></Currency>
            </div>
          </section>
        </>
      }
      
    </Card>
  )
}

function getStopsText(stops: Stops): string {
  switch (stops) {
    case Stops.NonStop: return 'Non-Stop';
    case Stops.OneStop: return '1 Stop';
    case Stops.MultipleStops: return '2+ Stops';
    default: return ''
  }
}