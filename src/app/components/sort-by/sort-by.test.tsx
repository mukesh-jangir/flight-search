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
    const sortByOptions = Object.values(SortBy);
    render(<FlightSortBy {...props}></FlightSortBy>);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(sortByOptions.length);
    expect(buttons.map(x => x.textContent)).toEqual(sortByOptions.map(x => `${x} `));
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

        const buttons = screen.getAllByRole('button');
        const buttonToTest = buttons.find(x => x.textContent?.includes(item));
        expect(buttonToTest).toBeDefined();
        expect(buttonToTest?.textContent).toBe(`${item} ${ChevronTexts.Up}`);
      });

      it(`should show chevron down icon if sortBy value is ${item} and sortOrder is descending`, () => {
        const propsToSet: FlightSortByProps = {
          ...props,
          sortBy: item,
          ascending: false
        };
        render(<FlightSortBy {...propsToSet}></FlightSortBy>);

        const buttons = screen.getAllByRole('button');
        const buttonToTest = buttons.find(x => x.textContent?.includes(item));
        expect(buttonToTest).toBeDefined();
        expect(buttonToTest?.textContent).toBe(`${item} ${ChevronTexts.Down}`);
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