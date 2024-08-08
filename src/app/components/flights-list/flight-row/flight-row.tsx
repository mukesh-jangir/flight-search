import { AirportDepartArrival, FlightInfo, FlightSearchInfo } from "../../../models/flight-parameters";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import './flight-row.css';
import Currency from "../../currency/currency";

export function FlightRow(props: FlightSearchInfo) {
  const airlines = props.flights.map(x => x.airline);
  const uniqueAirlines = Array.from(new Set(airlines));
  const isMultiAirline = uniqueAirlines.length > 1;

  return (
    <Card className="p-3 grid gap-3">
      <section className="flex gap-2">
        { isMultiAirline ?
          (
            <>
              <div className="flex gap-1">
                {
                  uniqueAirlines.map(x => {
                    const airlineInfo = props.flights.find(flight => flight.airline === x)!;

                    return (
                      <img key={x} src={airlineInfo.airline_logo} className="w-8 h-8"></img>
                    );
                  })
                }
              </div>
              <span>Multi-Airline</span>
            </>
          ) :
          (
            <>
              <img src={props.airline_logo} className="w-8 h-8"></img>
              <span>{props.flights[0].airline}</span>
            </>
          )
        }
      </section>
      <section className="grid gap-3 align-bottom grid-cols-5 items-end justify-items-center">
        {getAirpotInfo(props.flights[0].departure_airport)}

        <div className="header-value-container">
          <span>{props.flights.length > 1 && getMiddleAiportsInfoText(props.flights)}</span>
          <span>{getHourAndMinuteText(props.total_duration)}</span>
        </div>

        {getAirpotInfo(props.flights[props.flights.length - 1].arrival_airport)}

        <Currency className="text-lg font-bold" amount={props.price} fallbackValue="Unknown"></Currency>
        <Button variant="link" className="text-blue-600">Flight Details</Button>
      </section>
    </Card>
  )
}

function getAirpotInfo(airport: AirportDepartArrival) {
  return (
    <>
      <div className="header-value-container">
        <span>{airport.id} {airport.name}</span>
        <span>{airport.time.split(' ')[1]}</span>
      </div>
    </>
  )
}

function getMiddleAiportsInfoText(flights: FlightInfo[]): string {
  if (flights.length === 1) return '';

  const allArivalAirports = flights.map((flight) => flight.arrival_airport.id);
  allArivalAirports.pop();

  return `- ${allArivalAirports.join(' - ')} -`;
}

function getHourAndMinuteText(minutes: number): string {
  if (minutes <= 60) return `${minutes}m`;

  const hours = Math.floor(minutes/60);
  const mins = minutes - (hours * 60);
  return `${hours}h${mins === 0 ? '' : ` ${mins}m`}`;
}