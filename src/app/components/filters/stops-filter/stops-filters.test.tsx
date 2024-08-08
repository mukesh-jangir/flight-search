import { fireEvent, render, screen } from "@testing-library/react";
import { StopsFilterProps, StopsFilter } from "./stops-filter";
import { Stops } from "../../../models/flight-parameters";

// TODO discuss how this could be made better
// right now the mock recreates what external component might do
jest.mock('../../../../components/ui/button', () => ({
  Button: ({children, ...props}: any) => {
    return <button {...props}>{ ...children }</button>;
  }
}));

describe(StopsFilter.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validations', () => {
    it('should throw an error if setActiveFilter property is not sent', () => {
      const props: StopsFilterProps = {
        setActiveFilter: undefined as any
      };
      
      expect(() => render(<StopsFilter {...props}></StopsFilter>))
        .toThrow('setActiveFilter props is not supplied');
    });
  });

  describe('render', () => {
    let props: StopsFilterProps;

    beforeEach(() => {
      props = {
        setActiveFilter: jest.fn(),
        activeFilter: Stops.MultipleStops
      };
      render(<StopsFilter {...props}></StopsFilter>);
    });

    it('should render all the filter options', () => {
      const filterButtons = screen.getAllByRole('button');
      expect(filterButtons.length).toBe(3);
      expect(filterButtons.map(x => x.textContent))
        .toEqual([ Stops.NonStop, Stops.OneStop, Stops.MultipleStops ]);
    });
  
    it('clicking on filter options should call the setActiveFilters with expected filter value', () => {
      Object.values(Stops).forEach(filter => {
        jest.clearAllMocks();
        const button = screen.getByText(filter);
        
        fireEvent.click(button);
  
        expect(props.setActiveFilter).toHaveBeenCalledWith(filter);
      });
    });
  
    it('clicking on reset should call the setActiveFilters without any parameters', () => {
      const resetElement = screen.getByText('Reset');
      fireEvent.click(resetElement);
  
      expect(props.setActiveFilter).toHaveBeenCalledWith();
    });
  
    it('should apply active styles for button corresponding to the active filter', () => {
      const activeFilterButton = screen.getByText(props.activeFilter!);
  
      expect(activeFilterButton.className).toContain('bg-blue-100 text-blue-300');
    });
  });
})