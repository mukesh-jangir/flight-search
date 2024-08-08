import { AdditionalFilters, Stops } from "../../models/flight-parameters";
import Filters, { FiltersProps } from "./filters";
import { PriceRangeFilterProps } from "./price-range-filter/price-range-filter";
import { StopsFilterProps } from "./stops-filter/stops-filter";
import { fireEvent, render, screen } from "@testing-library/react";

enum MockedComponentTestIds {
  StopsFilter = 'stops-filter',
  PriceRangeFilterProps = 'price-range-filter'
}

jest.mock('../../../components/ui/card', () => ({
  Card: ({ children }: any) => <div>{...children}</div>
}));

jest.mock('./stops-filter/stops-filter', () => ({
  StopsFilter: ({ activeFilter, setActiveFilter }: StopsFilterProps) => {
    return <button data-testid={MockedComponentTestIds.StopsFilter}
      onClick={() => setActiveFilter(Stops.NonStop)}>{activeFilter}</button>
  }
}));

jest.mock('./price-range-filter/price-range-filter', () => ({
  PriceRangeFilter: (props: PriceRangeFilterProps) => {
    return <button data-testid={MockedComponentTestIds.PriceRangeFilterProps}
      onClick={() => props.setSelectedRange({ min: props.minOnScale + 5, max: props.maxOnScale })}></button>
  }
}))

describe(Filters.name, () => {
  let props: FiltersProps;
  beforeEach(() => {
    props = {
      min: 200,
      max: 300,
      setFilters: jest.fn()
    };

    jest.clearAllMocks();
  });

  it('should not render PriceRange filter component if min is not defined', () => {
    const propsWithMinUndefined = { ...props, min: undefined };

    render(<Filters {...propsWithMinUndefined}></Filters>);

    const priceRangeFilterComponent = screen.queryByTestId(MockedComponentTestIds.PriceRangeFilterProps);
    expect(priceRangeFilterComponent).toBeNull();
  });

  it('should not render PriceRange filter component if max is not defined', () => {
    const propsWithMaxUndefined = { ...props, max: undefined };

    render(<Filters {...propsWithMaxUndefined}></Filters>);

    const priceRangeFilterComponent = screen.queryByTestId(MockedComponentTestIds.PriceRangeFilterProps);
    expect(priceRangeFilterComponent).toBeNull();
  });

  it('should render PriceRange filter component if min and max are defined', () => {
    render(<Filters {...props}></Filters>);

    const priceRangeFilterComponent = screen.queryByTestId(MockedComponentTestIds.PriceRangeFilterProps);
    expect(priceRangeFilterComponent).not.toBeNull();
  });

  it('should call the set filters with just the stops value changed when Stop filter is clicked', () => {
    const propsToSet: FiltersProps = {...props, priceRange: { min: 20, max: 100 }, stops: Stops.MultipleStops };
    render(<Filters {...propsToSet }></Filters>);

    const StopsFilterMock = screen.getByTestId(MockedComponentTestIds.StopsFilter);
    fireEvent.click(StopsFilterMock);

    const expectedCallParams: AdditionalFilters = {
        priceRange: propsToSet.priceRange,
        stops: Stops.NonStop
    };
    expect(props.setFilters).toHaveBeenCalledWith(expectedCallParams);
  });

  it('should call the set filters with just the price range value changed when price range filter is clicked', () => {
    const propsToSet: FiltersProps = {...props, priceRange: { min: 20, max: 100 }, stops: Stops.MultipleStops };
    render(<Filters {...propsToSet }></Filters>);

    const priceRangeFilterMock = screen.getByTestId(MockedComponentTestIds.PriceRangeFilterProps);
    fireEvent.click(priceRangeFilterMock);

    const expectedCallParams: AdditionalFilters = {
        priceRange: { min: 205, max: 300 },
        stops: Stops.MultipleStops
    };
    expect(props.setFilters).toHaveBeenCalledWith(expectedCallParams);
  });
});