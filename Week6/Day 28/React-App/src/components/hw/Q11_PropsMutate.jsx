import { useState } from "react";

// Q11: Explanation of why mutating props is a bug
// Bug: props.count = props.count + 1
// Props are READ-ONLY in React. Mutating props directly:
// 1. Violates React's unidirectional data flow
// 2. Does NOT trigger a re-render
// 3. Causes unpredictable behavior since the parent still owns that data
//
// The correct approach: the parent manages the count state and passes
// both the value and an updater function (like setCount) as props.

function Child({ count, onIncrement }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>+1</button>
    </div>
  );
}

function Q11_PropsMutate() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p style={{ background: "#fff3cd", padding: "8px" }}>
        <strong>Bug:</strong> A child should never do <code>props.count = props.count + 1</code>.
        Props are read-only — mutating them doesn't trigger re-renders and breaks unidirectional flow.
        Instead, the parent owns state and passes down value + setter as props.
      </p>
      <Child
        count={count}
        onIncrement={() => setCount((c) => c + 1)}
      />
    </div>
  );
}

export default Q11_PropsMutate;
