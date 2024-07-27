import { fireEvent, render, screen } from "@testing-library/react";
import { FlightsStateProps, TravelType } from "../../models/flight-parameters";
import Search from "./search";
import { FlightsContext } from "../../contexts/flights-context";

const routerMock = {
  push: jest.fn()
};

const flightStateMock: FlightsStateProps = {
  flights: [],
  isLoading: false,
  airports: [],
  parameters: {},
  fetchFlights: jest.fn(),
  setFlightParameters: jest.fn()
}

jest.mock('next/navigation', () => ({
  useRouter: () => (routerMock)
}));
jest.mock('../../../components/ui/card', () => ({
  Card: ({ children }: any) => <div>{...children}</div>
}));
jest.mock('../../../components/ui/radio-group', () => ({
  RadioGroup: ({ children, ...props }: any) => <div {...props}>{...children}</div>,
  RadioGroupItem: ({ ...props }: any) => <div {...props}></div>
}));
jest.mock('../combo-box', () => ({
  Combobox: ({  setValue, ...props }: any) => <div onClick={() => setValue('CHANGED')} {...props}></div>
}));
jest.mock('../date-picker', () => ({
  DatePicker: ({setDate,  ...props }: any) => <div onClick={() => setDate(new Date(2024, 1, 1))} {...props}></div>
}));
jest.mock('../travellers/travellers', () => ({
  Travellers: ({ setInfo, ...props }: any) => <div onClick={() => setInfo({ adults: 7 })}  {...props}></div>
}));
jest.mock('../../../components/ui/button', () => ({
  Button: ({children, ...props}: any) => {
    return <button {...props}>{ ...children }</button>;
  }
}));

const renderSearchComponentFn = (contextValue: FlightsStateProps, route?: string) => {
  return render(
    <FlightsContext.Provider value={contextValue}>
      <Search route={route}></Search>
    </FlightsContext.Provider>
  )
}

describe(Search.name, () => {
  let contextMock: FlightsStateProps;
  beforeEach(() => {
    contextMock = {
      ...flightStateMock,
      parameters: {
        travelType: TravelType.OneWay,
        from: 'FROM',
        to: 'TO',
        departureDate: new Date(),
        adults: 1,
      }
    };

    jest.clearAllMocks();
  });

  describe('Search Button', () => {
    it('should not be disabled if all required fields are set', () => {
      renderSearchComponentFn({...contextMock});

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.attributes).not.toContain('disabled');
    });
    it('should be disabled when from value is not set', () => {
      renderSearchComponentFn({
        ...contextMock,
        parameters: {
          ...contextMock.parameters,
          from: undefined
        }
      });

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.getAttribute('disabled')).not.toBeNull();
    });

    it('should be disabled when to value is not set', () => {
      renderSearchComponentFn({
        ...contextMock,
        parameters: {
          ...contextMock.parameters,
          to: undefined
        }
      });

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.getAttribute('disabled')).not.toBeNull();
    });

    it('should be disabled when departure value is not set', () => {
      renderSearchComponentFn({
        ...contextMock,
        parameters: {
          ...contextMock.parameters,
          departureDate: undefined
        }
      });

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.getAttribute('disabled')).not.toBeNull();
    });

    it('should be disabled when travel type value is not set', () => {
      renderSearchComponentFn({
        ...contextMock,
        parameters: {
          ...contextMock.parameters,
          travelType: undefined
        }
      });

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.getAttribute('disabled')).not.toBeNull();
    });

    it('should be disabled when number of adults is not set', () => {
      renderSearchComponentFn({
        ...contextMock,
        parameters: {
          ...contextMock.parameters,
          adults: undefined
        }
      });

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.getAttribute('disabled')).not.toBeNull();
    });

    it('should be disabled when travel type is return and return date is not set', () => {
      renderSearchComponentFn({
        ...contextMock,
        parameters: {
          ...contextMock.parameters,
          travelType: TravelType.RoundTrip,
          returnDate: undefined
        }
      });

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      expect(searchButton.getAttribute('disabled')).not.toBeNull();
    });

    it('should make a call to fetch data when clicked', () => {
      renderSearchComponentFn(contextMock);

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      fireEvent.click(searchButton);

      expect(contextMock.fetchFlights).toHaveBeenCalled();
    });

    it('should navigate to a route if route is provided', () => {
      renderSearchComponentFn(contextMock, 'routePath');

      const searchButton = screen.getByRole('button', {
        name: 'Search'
      });
      fireEvent.click(searchButton);

      expect(routerMock.push).toHaveBeenCalledWith('routePath');
    });
  });

  it('should only update the "from" parameter when from value is changed', () => {
    renderSearchComponentFn({...contextMock});

    const element = screen.getByTestId('from');
    fireEvent.click(element);

    expect(contextMock.setFlightParameters).toHaveBeenCalledWith({ from: 'CHANGED' });
  });

  it('should only update the "to" parameter when to value is changed', () => {
    renderSearchComponentFn({...contextMock});

    const element = screen.getByTestId('to');
    fireEvent.click(element);

    expect(contextMock.setFlightParameters).toHaveBeenCalledWith({ to: 'CHANGED' });
  });

  it('should only update the departure parameter when departure value is changed', () => {
    renderSearchComponentFn({...contextMock});

    const element = screen.getByTestId('departure');
    fireEvent.click(element);

    expect(contextMock.setFlightParameters).toHaveBeenCalledWith({ departureDate: new Date(2024,1,1) });
  });

  it('should only update the return parameter when return value is changed', () => {
    renderSearchComponentFn({...contextMock});

    const element = screen.getByTestId('return');
    fireEvent.click(element);

    expect(contextMock.setFlightParameters).toHaveBeenCalledWith({ returnDate: new Date(2024,1,1) });
  });

  it('should only update the travellers parameter when travellers value is changed', () => {
    renderSearchComponentFn({...contextMock});

    const element = screen.getByTestId('travellers');
    fireEvent.click(element);

    expect(contextMock.setFlightParameters).toHaveBeenCalledWith({ adults: 7 });
  });
});