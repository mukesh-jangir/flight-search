import { FlightInfo, FlightSearchInfo } from "../../models/flight-parameters";

export interface SortingTestData {
  initialData: Partial<FlightSearchInfo>[];
  departureAsc: Partial<FlightSearchInfo>[];
  departureDesc: Partial<FlightSearchInfo>[];
  arrivalAsc: Partial<FlightSearchInfo>[];
  arrivalDesc: Partial<FlightSearchInfo>[];
  durationAsc: Partial<FlightSearchInfo>[];
  durationDesc: Partial<FlightSearchInfo>[];
  priceAsc: Partial<FlightSearchInfo>[];
  priceDesc: Partial<FlightSearchInfo>[];
}

export interface FilterTestData {
  initialData: Partial<FlightSearchInfo>[];
  byNonStop: Partial<FlightSearchInfo>[];
  byOneStop: Partial<FlightSearchInfo>[];
  byMultiStop: Partial<FlightSearchInfo>[];
  byPrice: {
    testPrice: number;
    filteredData: Partial<FlightSearchInfo>[];
  }
};

export function getSortingTestData(): SortingTestData {
  const firstItenary: Partial<FlightSearchInfo> = {
    airline_logo: 'first logo',
    flights: [
      { departure_airport: { time: 'date 21:30' } as any },
      {},
      { arrival_airport: { time: 'date 04:20' } as any }
    ] as any,
    price: 20, total_duration: 30
  };
  const secondItenary: Partial<FlightSearchInfo> = {
    airline_logo: 'secong logo',
    flights: [
      { departure_airport: { time: 'date 20:30' } },
      { arrival_airport: { time: 'date 07:20' } }
    ] as any,
    price: 10, total_duration: 20
  };
  const thirdItenary: Partial<FlightSearchInfo> = {
    airline_logo: 'third logo',
    flights: [
      {
        departure_airport: { time: 'date 04:20' },
        arrival_airport: { time: 'date 21:30' }
      }
    ] as any,
    price: 30, total_duration: 10
  }

  return {
    initialData: [firstItenary, secondItenary, thirdItenary],
    departureAsc: [thirdItenary, secondItenary, firstItenary],
    departureDesc: [firstItenary, secondItenary, thirdItenary],
    arrivalAsc: [firstItenary, secondItenary, thirdItenary],
    arrivalDesc: [thirdItenary, secondItenary, firstItenary],
    durationAsc: [thirdItenary, secondItenary, firstItenary],
    durationDesc: [firstItenary, secondItenary, thirdItenary],
    priceAsc: [secondItenary, firstItenary, thirdItenary],
    priceDesc: [thirdItenary, firstItenary, secondItenary]
  }
}

export function getFilterTestData(): FilterTestData {
  const firstItenary: Partial<FlightSearchInfo> = {
    airline_logo: 'first logo', flights: [1, 2, 3] as any, price: 10
  };
  const secondItenary: Partial<FlightSearchInfo> = {
    airline_logo: 'B', flights: [1, 2] as any, price: 20
  };
  const thirdItenary: Partial<FlightSearchInfo> = {
    airline_logo: 'C', flights: [1] as any, price: 30
  };

  return {
    initialData: [firstItenary, secondItenary, thirdItenary],
    byNonStop: [thirdItenary],
    byOneStop: [secondItenary],
    byMultiStop: [firstItenary],
    byPrice: {
      testPrice: 20,
      filteredData: [secondItenary, thirdItenary]
    }
  }
}