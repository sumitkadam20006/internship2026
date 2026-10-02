// Q20: Demonstrating React's state batching — non-functional vs functional updater
import { useState } from "react";

function Q20_Batching() {
  const [count, setCount] = useState(0);

  const badBatch = () => {
    // All three use the same stale 'count' value from this render's closure,
    // so they all compute count + 1 from the same base → result is count + 1, not +3.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const goodBatch = () => {
    // Functional updater reads the latest pending state, so each call builds
    // on the previous one → correctly increments by 3.
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={badBatch}>Bad batch (+1 expected, not +3)</button>
      <button onClick={goodBatch} style={{ marginLeft: "8px" }}>
        Good batch (+3 correctly)
      </button>
    </div>
  );
}

export default Q20_Batching;
