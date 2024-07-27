import { render, screen } from '@testing-library/react';
import Currency, { CurrencyProps } from './currency';

describe(Currency.name, () => {
  test('should format the given amount in INR currency format', () => {
    const props: CurrencyProps = {
      amount: 12345
    };

    render(<Currency {...props}></Currency>);

    screen.getByText('₹12,345.00');
  });

  test('should set a span with empty text, if amount is not sent', () => {
    const props: CurrencyProps = {
    };

    const { container } = render(<Currency {...props}></Currency>);

    const emptySpan = container.querySelector('span');
    expect(emptySpan?.textContent).toBe('');
  });

  test('should set the fallback text if amount is not sent', () => {
    const props: CurrencyProps = {
      fallbackValue: 'I am important'
    };

    render(<Currency {...props}></Currency>);

    const span = screen.getByText('I am important');
  });
});