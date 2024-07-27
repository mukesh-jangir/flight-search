import { fireEvent, render, screen } from "@testing-library/react";
import {PriceRangeFilter, PriceRangeFilterProps, PriceRangeValidationMessages } from "./price-range-filter";

jest.mock('../../../../components/ui/slider', () => ({
  Slider: ({ ...props }: any) => {
    return <span {...props}></span>;
  }
}));

describe(PriceRangeFilter.name, () => {
  let props: PriceRangeFilterProps;

  beforeEach(() => {
    props = {
      minOnScale: 200,
      maxOnScale: 300,
      setSelectedRange: jest.fn()
    };
  });

  describe('Validations', () => {
    it('should throw an error when the minimum in the selected range is lower than the minimum boundary', () => {
      const propsWithRangeMinLowerThanPossibleMin: PriceRangeFilterProps = {
        ...props,
        selectedRange: { min: props.minOnScale - 1, max: props.maxOnScale }
      };

      expect(() => render(<PriceRangeFilter {...propsWithRangeMinLowerThanPossibleMin}></PriceRangeFilter>))
        .toThrow(PriceRangeValidationMessages.MinimumOutOfBoundary);
    });

    it('should throw an error when the minimum in the selected range is higher than the maximum boundary', () => {
      const propsWithRangeMinGreaterThanPossibleMin: PriceRangeFilterProps = {
        ...props,
        selectedRange: { min: props.maxOnScale + 1, max: props.maxOnScale }
      };

      expect(() => render(<PriceRangeFilter {...propsWithRangeMinGreaterThanPossibleMin}></PriceRangeFilter>))
        .toThrow(PriceRangeValidationMessages.MinimumOutOfBoundary);
    });

    it('should throw an error when the maximum in the selected range is lower than the minimum boundary', () => {
      const propsWithRangeMaxLowerThanPossibleMin: PriceRangeFilterProps = {
        ...props,
        selectedRange: { max: props.minOnScale - 1, min: props.minOnScale }
      };

      expect(() => render(<PriceRangeFilter {...propsWithRangeMaxLowerThanPossibleMin}></PriceRangeFilter>))
        .toThrow(PriceRangeValidationMessages.MaximumOutOfBoundary);
    });

    it('should throw an error when the maximum in the selected range is higher than the maximum boundary', () => {
      const propsWithRangeMaxGreaterThanPossibleMin: PriceRangeFilterProps = {
        ...props,
        selectedRange: { max: props.maxOnScale + 1, min: props.minOnScale }
      };

      expect(() => render(<PriceRangeFilter {...propsWithRangeMaxGreaterThanPossibleMin}></PriceRangeFilter>))
        .toThrow(PriceRangeValidationMessages.MaximumOutOfBoundary);
    });

    it('should throw an error when the min in the selected range is higher than the max in the selected range', () => {
      const propsWithRangeMinGreaterThanRangeMax: PriceRangeFilterProps = {
        ...props,
        selectedRange: { min: props.maxOnScale - 1, max: props.maxOnScale - 2 }
      };

      expect(() => render(<PriceRangeFilter {...propsWithRangeMinGreaterThanRangeMax}></PriceRangeFilter>))
        .toThrow(PriceRangeValidationMessages.MinimumGreaterThanMaximum);
    });
  });

  it(`should call the setSelectedPriceRange function without parameters, when reset is clicked`, () => {
    render(<PriceRangeFilter {...props}></PriceRangeFilter>);

    const resetElement = screen.getByText('Reset');
    fireEvent.click(resetElement);

    expect(props.setSelectedRange).toHaveBeenCalledWith();
  });
});