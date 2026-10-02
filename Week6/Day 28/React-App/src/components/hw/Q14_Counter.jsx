// Q14: Counter with +1 and -1, minimum 0
import { useState } from "react";

function Q14_Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => Math.max(0, c - 1))} disabled={count === 0}>
        -1
      </button>
    </div>
  );
}

export default Q14_Counter;
