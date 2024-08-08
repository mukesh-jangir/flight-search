import { Button } from "../../../../components/ui/button";
import { Stops } from "../../../models/flight-parameters";

export interface StopsFilterProps {
  activeFilter?: Stops,
  setActiveFilter: (value?: Stops) => void;
}

export function StopsFilter({ activeFilter, setActiveFilter }: StopsFilterProps) {
  if (setActiveFilter === undefined) {
    throw new Error('setActiveFilter props is not supplied');
  }

  const setCssClass = (stop: Stops) => `w-24 h-8 ${stop === activeFilter ? 'bg-blue-100 text-blue-300' : ''}`;
  
  return (
    <section className="grid gap-2 w-full">
      <div className="flex justify-between">
        <h5 className="font-bold">Stops</h5>
        <span className="text-xs cursor-pointer"
          onClick={() => setActiveFilter()}>Reset</span>
      </div>
      <div className="flex gap-3 flex-wrap w-full">
        {
          Object.values(Stops).map(x => (
            <Button
              variant="outline"
              key={x}
              className={setCssClass(x)}
              onClick={() => setActiveFilter(x)}>
              {x}
            </Button>
          ))
        }
      </div>
    </section>
  )
}