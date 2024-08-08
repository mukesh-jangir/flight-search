export interface CurrencyProps {
    className?: string;
    amount?: number;
    fallbackValue?: string;
}

export default function Currency({ className, amount, fallbackValue = '' }: CurrencyProps) {
    const currencyText = amount ? getAmountInINR(amount) : fallbackValue;
    return <span data-testid="currency-text" className={className}>{currencyText}</span>;
}

export function getAmountInINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}