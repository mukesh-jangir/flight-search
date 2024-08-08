import { render, screen } from '@testing-library/react';
import Currency, { CurrencyProps } from './currency';

describe(Currency.name, () => {
  const testid = 'currency-text';
  test('should format the given amount in INR currency format', () => {
    const props: CurrencyProps = {
      amount: 12345
    };

    render(<Currency {...props}></Currency>);

    const element = screen.getByTestId(testid);
    expect(element.textContent).toBe('₹12,345.00');
  });

  test('should set a span with empty text, if amount is not sent', () => {
    const props: CurrencyProps = {
    };

    render(<Currency {...props}></Currency>);

    const element = screen.getByTestId(testid);
    expect(element.textContent).toBe('');
  });

  test('should set the fallback text if amount is not sent', () => {
    const fallbackValue = 'I am important';
    const props: CurrencyProps = { fallbackValue };

    render(<Currency {...props}></Currency>);

    const element = screen.getByTestId(testid);
    expect(element.textContent).toBe(fallbackValue);
  });
});