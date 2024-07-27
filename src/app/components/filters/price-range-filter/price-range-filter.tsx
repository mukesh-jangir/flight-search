import { Slider } from "../../../../components/ui/slider";
import { PriceRange } from "../../../models/flight-parameters";
import Currency from "../../currency/currency";

export enum PriceRangeValidationMessages {
  MinimumOutOfBoundary = 'Minimum value should be within the range boundary',
  MaximumOutOfBoundary = 'Maximum value should be within the range boundary',
  MinimumGreaterThanMaximum = 'Minimum value is greater than maximum value'
}

export interface PriceRangeFilterProps {
  minOnScale: number;
  maxOnScale: number;
  selectedRange?: PriceRange;
  setSelectedRange: (value?: PriceRange) => void;
}

export function PriceRangeFilter({ minOnScale, maxOnScale, selectedRange, setSelectedRange  }: PriceRangeFilterProps) {
  // TODO check if the validation logic is an overkill or not
  if (selectedRange?.min &&  (selectedRange.min < minOnScale || selectedRange.min > maxOnScale ) ) {
    throw new Error(PriceRangeValidationMessages.MinimumOutOfBoundary);
  }

  if (selectedRange?.max &&  (selectedRange.max < minOnScale || selectedRange.max > maxOnScale ) ) {
    throw new Error(PriceRangeValidationMessages.MaximumOutOfBoundary);
  }

  if ((selectedRange?.min ?? 0) > (selectedRange?.max ?? 0)) {
    throw new Error(PriceRangeValidationMessages.MinimumGreaterThanMaximum);
  }
  
  const minPrice = selectedRange?.min ?? minOnScale;
  const maxPrice = selectedRange?.max ?? maxOnScale;
  return (
    <section className="grid gap-2 w-full">
      <div className="flex justify-between">
        <h5 className="font-bold">Price</h5>
        <span className="text-xs cursor-pointer" onClick={() => setSelectedRange()}>Reset</span>
      </div>
      <Slider
        min={minOnScale}
        max={maxOnScale}
        step={500}
        value={[minPrice, maxPrice]}
        onValueChange={(value) => setSelectedRange({ min: (value[0] ?? 0), max: maxPrice })}
      ></Slider>
      <div className="flex justify-between">
        <Currency amount={minPrice}></Currency>
        <Currency amount={maxPrice}></Currency>
      </div>
    </section>
  )
}