import { fireEvent, render, screen } from "@testing-library/react";
import { FlightSortByProps, FlightSortBy } from "./sort-by";
import { SortBy, SortParameters } from "../../models/flight-parameters";

jest.mock('../../../components/ui/button', () => ({
  Button: ({ children, ...props }: any) => {
    return <button {...props}>{...children}</button>;
  }
}));

enum ChevronTexts {
  Down = 'ChevronDown',
  Up = 'ChevronUp'
}

jest.mock('lucide-react', () => ({
  ChevronDownIcon: () => <span>{ChevronTexts.Down}</span>,
  ChevronUpIcon: () => <span>{ChevronTexts.Up}</span>
}))

describe(FlightSortBy.name, () => {
  let props: FlightSortByProps;

  beforeEach(() => {
    props = {
      setSortByParams: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe('Reset', () => {
    it('should call reset params when clicked', () => {
      render(<FlightSortBy {...props}></FlightSortBy>);

      const resetElement = screen.getByText(/reset/i);
      fireEvent.click(resetElement);

      const params: SortParameters = { ascending: true, sortBy: undefined };
      expect(props.setSortByParams).toHaveBeenCalledWith(params);
    });
  });

  it('should render button corresponding to all possible sort options', () => {
    render(<FlightSortBy {...props}></FlightSortBy>);

    // don't have to use expect for these since getBy throws error unless there is specifically one matching element
    screen.getByRole('button', { name: /duration/i });
    screen.getByRole('button', { name: /departure/i });
    screen.getByRole('button', { name: /arrival/i });
    screen.getByRole('button', { name: /price/i });
  });

  Object.values(SortBy).forEach(item => {
    describe(`${item} button`, () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it(`should show chevron up icon if sortBy value is ${item} and sortOrder is ascending`, () => {
        const propsToSet: FlightSortByProps = {
          ...props,
          sortBy: item,
          ascending: true
        };
        render(<FlightSortBy {...propsToSet}></FlightSortBy>);

        screen.getByRole('button', {
          name: `${item} ${ChevronTexts.Up}`
        });
      });

      it(`should show chevron down icon if sortBy value is ${item} and sortOrder is descending`, () => {
        const propsToSet: FlightSortByProps = {
          ...props,
          sortBy: item,
          ascending: false
        };
        render(<FlightSortBy {...propsToSet}></FlightSortBy>);

        screen.getByRole('button', {
          name: `${item} ${ChevronTexts.Down}`
        });
      });

      it(`should toggle the sortOrder to descending, if initially the sortby value is ${item} and sort order is ascending,
        when button is clicked`, () => {
        const propsToSet: FlightSortByProps = {
          ...props,
          sortBy: item,
          ascending: true
        };
        render(<FlightSortBy { ...propsToSet }></FlightSortBy>);

        const button = screen.getByRole('button', {
          name: `${item} ${ChevronTexts.Up}`
        });
        fireEvent.click(button);

        const expectedParams: SortParameters = {
          ascending: false,
          sortBy: item
        };
        expect(propsToSet.setSortByParams).toHaveBeenCalledWith(expectedParams);
      });

      it(`should toggle the sortOrder to ascending, if initially the sortby value is ${item} and sort order is descending,
        when button is clicked`, () => {
        const propsToSet: FlightSortByProps = {
          ...props,
          sortBy: item,
          ascending: false
        };
        render(<FlightSortBy { ...propsToSet }></FlightSortBy>);

        const button = screen.getByRole('button', {
          name: `${item} ${ChevronTexts.Down}`
        });
        fireEvent.click(button);

        const expectedParams: SortParameters = {
          ascending: true,
          sortBy: item
        };
        expect(propsToSet.setSortByParams).toHaveBeenCalledWith(expectedParams);
      });

      it(`should set sortOrder to ascending, if initially the sortby value is not set,
        when button is clicked`, () => {
        const propsToSet: FlightSortByProps = {
          ...props,
          sortBy: undefined,
          ascending: true
        };
        render(<FlightSortBy { ...propsToSet }></FlightSortBy>);

        const button = screen.getByRole('button', {
          name: `${item}`
        });
        fireEvent.click(button);

        const expectedParams: SortParameters = {
          ascending: true,
          sortBy: item
        };
        expect(propsToSet.setSortByParams).toHaveBeenCalledWith(expectedParams);
      });
    });
  })
});