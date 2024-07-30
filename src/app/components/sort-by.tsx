import { Button } from "../../components/ui/button";
import { SortBy, SortParameters } from "../models/flight-parameters";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface FlightSortByProps extends SortParameters {
  setSortByParams: (params: SortParameters) => void;
}

export default function FlightSortBy({ sortBy, ascending, setSortByParams }: FlightSortByProps) {
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
        <Button variant="outline" onClick={() => buttonClickHandler(SortBy.Departure)}>Departure {sortBy === SortBy.Departure && icon}</Button>
        <Button variant="outline" onClick={() => buttonClickHandler(SortBy.Duration)}>Duration {sortBy === SortBy.Duration && icon}</Button>
        <Button variant="outline" onClick={() => buttonClickHandler(SortBy.Arrival)}>Arrival {sortBy === SortBy.Arrival && icon}</Button>
        <Button variant="outline" onClick={() => buttonClickHandler(SortBy.Price)}>Price {sortBy === SortBy.Price && icon}</Button>
      </section>
    </>
  )
}