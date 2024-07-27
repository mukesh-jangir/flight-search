import { Card } from "../../../components/ui/card";
import { AdditionalFilters, PriceRange, Stops } from "../../models/flight-parameters";
import './filters.css';
import {PriceRangeFilter} from "./price-range-filter/price-range-filter";
import {StopsFilter} from "./stops-filter/stops-filter";

export interface FiltersProps extends AdditionalFilters {
  setFilters: (filters: AdditionalFilters) => void;
  min?: number;
  max?: number;
}

export default function Filters({ stops, priceRange, setFilters, min, max }: FiltersProps) {
  const onStopsClick = (value?: Stops) => setFilters({ priceRange, stops: value });
  const onPriceRangeChange = (priceRange?: PriceRange) => {
    setFilters({ stops, priceRange})
  };

  return (
    <Card className="p-3 grid gap-4 h-max">
      <h3 className="font-bold">Filters</h3>
      <div className="divider"></div>
      <StopsFilter activeFilter={stops} setActiveFilter={onStopsClick}></StopsFilter>
      {
        min && max &&
        <>
          <div className="divider"></div>
          <PriceRangeFilter
            minOnScale={min} maxOnScale={max}
            selectedRange={priceRange} setSelectedRange={onPriceRangeChange}></PriceRangeFilter>
        </>
      }
      
    </Card>
  )
}