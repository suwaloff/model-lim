import { useState } from 'react';
import styles from './Counter.module.scss';

export const Counter = () => {
  const [count, Setcount] = useState(0);

  function increment() {
    Setcount(count + 1);
  }
  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={increment}>increment</button>
        <button
          onClick={() => {
            Setcount(0);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
};
