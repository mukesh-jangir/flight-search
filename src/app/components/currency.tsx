export interface CurrencyProps {
    className?: string;
    amount?: number;
    fallbackValue?: string;
}

export default function Currency({ className, amount, fallbackValue = '' }: CurrencyProps) {
    const currencyText = amount ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount) : fallbackValue;
    return <span className={className}>{currencyText}</span>;
}