import { fireEvent, render, screen } from "@testing-library/react";
import TravellerCount, { TravellerCountProps } from "./traveller-count";

describe(TravellerCount.name, () => {
  let props: TravellerCountProps;

  beforeEach(() => {
    props = {
      setValue: jest.fn(),
      value: 1,
      startRange: 1,
      endRange: 20
    }
  });

  it('should have decrement button disabled when value is equal to startRange', () => {
    const propsToSet = { ...props, value: 2, startRange: 2 };
    render(<TravellerCount {...propsToSet} ></TravellerCount>);

    const button = screen.getByRole('button', {
      name: '-'
    });

    expect(button.getAttribute('disabled')).not.toBeNull();
  });

  it('should NOT have decrement button disabled when value is greater than startRange', () => {
    const propsToSet = { ...props, value: 2 };
    render(<TravellerCount {...propsToSet} ></TravellerCount>);

    const button = screen.getByRole('button', {
      name: '-'
    });

    expect(button.getAttribute('disabled')).toBeNull();
  });

  it('should decrement the value by 1 when decrement button is clicked', () => {
    const propsToSet = { ...props, value: 3, startRange: 2 };
    render(<TravellerCount {...propsToSet} ></TravellerCount>);

    const button = screen.getByRole('button', {
      name: '-'
    });
    fireEvent.click(button);

    expect(propsToSet.setValue).toHaveBeenCalledWith(2);
  });

  it('should have increment button disabled when value is equal to endRange', () => {
    const propsToSet = { ...props, value: 2, endRange: 2 };
    render(<TravellerCount {...propsToSet} ></TravellerCount>);

    const button = screen.getByRole('button', {
      name: '+'
    });

    expect(button.getAttribute('disabled')).not.toBeNull();
  });

  it('should NOT have increment button disabled when value is grelesser than endRange', () => {
    const propsToSet = { ...props, value: 2, endRange: 3 };
    render(<TravellerCount {...propsToSet} ></TravellerCount>);

    const button = screen.getByRole('button', {
      name: '+'
    });

    expect(button.getAttribute('disabled')).toBeNull();
  });

  it('should increment the value by 1 when increment button is clicked', () => {
    const propsToSet = { ...props, value: 3, endRange: 20 };
    render(<TravellerCount {...propsToSet} ></TravellerCount>);

    const button = screen.getByRole('button', {
      name: '+'
    });
    fireEvent.click(button);

    expect(propsToSet.setValue).toHaveBeenCalledWith(4);
  });
});