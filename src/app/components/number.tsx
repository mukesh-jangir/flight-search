export interface NumberProps {
  value: number;
  setValue: (value: number) => void; 
  startRange?: number;
  endRange?: number;
}

export default function NumberComponent({ value, setValue, startRange, endRange }: NumberProps) {
  const disableDecrement = startRange !== undefined ? value <= startRange : false;
  const disabeIncrement = endRange !== undefined ? value >= endRange : false;
  
  return (
    <div className="p-2 text-lg grid grid-cols-3 gap-2 w-20 bg-white rounded-lg">
      <button className="disabled:cursor-not-allowed" disabled={disableDecrement} onClick={() => setValue(value - 1)}>-</button>
      <span>{value}</span>
      <button className="disabled:cursor-not-allowed" disabled={disabeIncrement} onClick={() => setValue(value + 1)}>+</button>
    </div>
  );
}