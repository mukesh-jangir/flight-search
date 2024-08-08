import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { SortBy, SortParameters } from "../../models/flight-parameters";

export interface FlightSortByProps extends SortParameters {
  setSortByParams: (params: SortParameters) => void;
}

export function FlightSortBy({ sortBy, ascending, setSortByParams }: FlightSortByProps) {
  const buttonClickHandler = (value?: SortBy) => {
    setSortByParams({
      sortBy: value,
      ascending: value === sortBy ? !ascending : true
    })
  }

  const icon = !ascending ? <ChevronDownIcon></ChevronDownIcon> : <ChevronUpIcon></ChevronUpIcon>;

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Sort By</h3>
        <span className="text-xs cursor-pointer" onClick={() => buttonClickHandler()}>Reset</span>
      </div>
      <section className="grid grid-cols-5">
        {
          Object.values(SortBy).map(x => (
            <Button key={x} variant="outline" onClick={() => buttonClickHandler(x)}>{x} {sortBy === x && icon}</Button>
          ))
        }
      </section>
    </>
  )
}