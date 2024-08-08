import { renderHook, waitFor } from "@testing-library/react";
import useFlightsState from "./flights-state";
import { getAirportCodes } from "../services/get-airport-codes";
import { act } from "react";
import { getFlights } from "../services/flights-search-service";

const getAirportCodesMock = jest.fn();
jest.mock('../services/get-airport-codes');

const getFlightsMock = jest.fn();
jest.mock('../services/flights-search-service');

describe(useFlightsState.name, () => {
  beforeEach(() => {
    (getAirportCodes as any) = getAirportCodesMock;
    getAirportCodesMock.mockResolvedValue([]);
    getAirportCodesMock.mockClear();

    (getFlights as any) = getFlightsMock;
  });
  
  it('should make a call to get airport codes', () => {
    const { result } = renderHook(useFlightsState);

    expect(getAirportCodesMock).toHaveBeenCalledTimes(1);
  });

  it('should not make a call to get airport codes multiple times', async () => {
    const { result } = renderHook(useFlightsState);

    // calling a set function to trigger the function again
    await act(() => {
      result.current.setFlightParameters({});
    });

    expect(getAirportCodesMock).toHaveBeenCalledTimes(1);
  });

  it('should make a call to fetch flights when fetchFlights is called', async () => {
    getFlightsMock.mockReturnValue(Promise.resolve({ bestFlights: [1,2], otherFlights: [3] }));
    const { result } = renderHook(useFlightsState);

    await act(() => result.current.fetchFlights());

    expect(getFlightsMock).toHaveBeenCalledTimes(1);
    expect(result.current.flights).toEqual([1,2,3]);
  });
});