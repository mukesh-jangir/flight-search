import { fireEvent, render, screen } from "@testing-library/react";
import { FlightSearchInfo, FlightsStateProps, SortBy, Stops } from "../../models/flight-parameters";
import FlightsList from "./flights-list";
import { FlightsContext } from "../../contexts/flights-context";
import * as Filters from "../filters/filters";
import { FlightSortBy, FlightSortByProps } from "../sort-by/sort-by";

jest.mock('../filters/filters', () => ({
  __esModule: true,
  default: ({ ...props }: any) => <div {...props}></div>
}));

jest.mock('./flight-row/flight-row', () => ({
  __esModule: true,
  FlightRow: (flight: FlightSearchInfo) => <div className="row">{flight.airline_logo}</div>
}));

jest.mock('../../../components/ui/skeleton', () => ({
  Skeleton: ({...props }) => <div {...props} >Loading...</div>
}));

var mockedSortBy = jest.fn();
jest.mock('../sort-by/sort-by', () => ({
  FlightSortBy: ({...props}) => <div {...props}></div>
}));

describe(FlightsList.name, () => {
  let contextMock: FlightsStateProps;
  beforeEach(() => {
    contextMock = {
      flights: [],
      isLoading: false,
      airports: [],
      parameters: {},
      fetchFlights: jest.fn(),
      setFlightParameters: jest.fn()
    };

    jest.clearAllMocks();
  });
  describe('Sorting', () => {
    let contextValue: FlightsStateProps, container: HTMLElement;
    beforeEach(() => {
      contextValue = {
        ...contextMock,
        flights: [
          {
            airline_logo: 'A',
            flights: [
              { departure_airport: { time: 'date 21:30' } },
              {  },
              { arrival_airport: { time: 'date 04:20' } }
            ] as any,
            price: 20, total_duration: 30
          } as FlightSearchInfo,
          {
            airline_logo: 'B',
            flights: [
              { departure_airport: { time: 'date 20:30' } },
              { arrival_airport: { time: 'date 07:20' } }
            ] as any,
            price: 10, total_duration: 20
          } as FlightSearchInfo,
          {
            airline_logo: 'C',
            flights: [
              {
                departure_airport: { time: 'date 04:20' },
                arrival_airport: { time: 'date 21:30' }
              }
            ] as any,
            price: 30, total_duration: 10 } as FlightSearchInfo
        ]
      };

      (FlightSortBy as any)= ({ setSortByParams,  ascending }: FlightSortByProps) => (
        <>
        <button onClick={() => setSortByParams({ sortBy: SortBy.Price, ascending: !ascending })}>{SortBy.Price}</button>;
        <button onClick={() => setSortByParams({ sortBy: SortBy.Departure, ascending: !ascending })}>{SortBy.Departure}</button>;
        <button onClick={() => setSortByParams({ sortBy: SortBy.Arrival, ascending: !ascending })}>{SortBy.Arrival}</button>;
        <button onClick={() => setSortByParams({ sortBy: SortBy.Duration, ascending: !ascending })}>{SortBy.Duration}</button>;
        </>
      );

      const renderData = render(
        <FlightsContext.Provider value={contextValue}>
          <FlightsList></FlightsList>
        </FlightsContext.Provider>
      );

      container = renderData.container;
    })
    it('should retain the order if there is no sortBy value set', () => {
      const rows = container.querySelectorAll('.row');
      expect(Array.from(rows).map(x => x.textContent)).toEqual(['A', 'B', 'C']);
    });

    describe('By Departure', () => {
      it('should sort by departure time in ascending if ascending is true', () => {
        const element = screen.getByRole('button', { name: SortBy.Departure });
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['C', 'B', 'A']);
      });

      it('should sort by departure time in descending if ascending is false', () => {
        const element = screen.getByRole('button', { name: SortBy.Departure });
        fireEvent.click(element);
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['A', 'B', 'C']);
      });
    });

    describe('By Arrival', () => {
      it('should sort by arrival time in ascending if ascending is true', () => {
        const element = screen.getByRole('button', { name: SortBy.Arrival });
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['A', 'B', 'C']);
      });

      it('should sort by arrival time in descending if ascending is false', () => {
        const element = screen.getByRole('button', { name: SortBy.Arrival });
        fireEvent.click(element);
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['C', 'B', 'A']);
      });
    });

    describe('By Duration', () => {
      it('should sort by duration time in ascending if ascending is true', () => {
        const element = screen.getByRole('button', { name: SortBy.Duration });
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['C', 'B', 'A']);
      });

      it('should sort by duration time in descending if ascending is false', () => {
        const element = screen.getByRole('button', { name: SortBy.Duration });
        fireEvent.click(element);
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['A', 'B', 'C']);
      });
    });

    describe('By Price', () => {
      it('should sort by price in ascending if ascending is true', () => {
        const element = screen.getByRole('button', { name: SortBy.Price });
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['B', 'A', 'C']);
      });

      it('should sort by price in descending if ascending is false', () => {
        const element = screen.getByRole('button', { name: SortBy.Price });
        fireEvent.click(element);
        fireEvent.click(element);

        const rows = container.querySelectorAll('.row');
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['C', 'A', 'B']);
      });
    });
  });

  describe('Filtering', () => {
    let contextValue: FlightsStateProps, container: HTMLElement;
    beforeEach(() => {
      contextValue = {
        ...contextMock,
        flights: [
          { airline_logo: 'A', flights: [1, 2, 3] as any, price: 10 } as FlightSearchInfo,
          { airline_logo: 'B', flights: [1, 2] as any, price: 20 } as FlightSearchInfo,
          { airline_logo: 'C', flights: [1] as any, price: 30 } as FlightSearchInfo
        ]
      };

      (Filters.default as any)= ({ setFilters, ...props }: Filters.FiltersProps) => (
        <>
        <button onClick={() => setFilters({ priceRange: { min: 20, max: 100 } })}>Price Filter</button>;
        <button onClick={() => setFilters({ stops: Stops.NonStop })}>{Stops.NonStop}</button>;
        <button onClick={() => setFilters({ stops: Stops.OneStop })}>{Stops.OneStop}</button>;
        <button onClick={() => setFilters({ stops: Stops.MultipleStops })}>{Stops.MultipleStops}</button>;
        </>
      );

      const renderData = render(
        <FlightsContext.Provider value={contextValue}>
          <FlightsList></FlightsList>
        </FlightsContext.Provider>
      );

      container = renderData.container;
    })
    it('should show all results if filtering is not applied', () => {
      const rows = container.querySelectorAll('.row');
      expect(Array.from(rows).map(x => x.textContent)).toEqual(['A', 'B', 'C']);
    });

    describe('By Stops', () => {
      it('should show only non-stop flights if non-stop filter is applied', () => {
        const filterElement = screen.getByRole('button', { name: Stops.NonStop });
        fireEvent.click(filterElement);

        const rows = container.querySelectorAll('.row');
        expect(rows.length).toBe(1);
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['C']);
      });

      it('should show only flights with exactly one stop if One Stop filter is applied', () => {
        const filterElement = screen.getByRole('button', { name: Stops.OneStop });
        fireEvent.click(filterElement);

        const rows = container.querySelectorAll('.row');
        expect(rows.length).toBe(1);
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['B']);
      });

      it('should show only flights that have more than one stops if multi stops filter is applied', () => {
        const filterElement = screen.getByRole('button', { name: Stops.MultipleStops });
        fireEvent.click(filterElement);

        const rows = container.querySelectorAll('.row');
        expect(rows.length).toBe(1);
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['A']);
      });
    });

    describe('By Price', () => {
      it('should only show price within the set range', () => {
        const filterElement = screen.getByRole('button', { name: 'Price Filter' });
        fireEvent.click(filterElement);

        const rows = container.querySelectorAll('.row');
        expect(rows.length).toBe(2);
        expect(Array.from(rows).map(x => x.textContent)).toEqual(['B', 'C']);
      });
    });
  });
});