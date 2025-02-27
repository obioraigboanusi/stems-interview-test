import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
  updateMaximum: (max: number) => void;
  setValue: (value: number) => void;
}

function useCounter(initialValue?: number, max?: number): ReturnType {
  const [count, setCount] = useState(initialValue || 0);
  const [maximum, setMaximum] = useState(max ?? 0);

  const increment = () =>
    setCount((x) => {
      if (x + 1 < maximum) {
        return x + 1;
      }
      return 0;
    });
  const decrement = () =>
    setCount((x) => {
      if (x - 1 >= 0) {
        return x - 1;
      }

      return maximum === 0 ? maximum : maximum - 1;
    });

  const reset = () => setCount(initialValue || 0);
  const updateMaximum = (max: number) => {
    setMaximum(max);
  };

  const setValue = (value: number) => {
    setCount(value);
  };

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
    updateMaximum,
    setValue,
  };
}

export default useCounter;
