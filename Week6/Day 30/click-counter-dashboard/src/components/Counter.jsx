import { useState } from "react";
import "./Counter.css";

function Counter({ label, step = 1 }) {

    const [count, setCount] = useState(0);

    function increase() {
        setCount(count + step);
    }

    function decrease() {

        if (count > 0) {
            setCount(count - step);
        }

    }

    function reset() {
        setCount(0);
    }

    return (

        <div className="counter">

            <h2>{label}</h2>

            <h1>{count}</h1>

            <button onClick={increase}>+{step}</button>

            <button onClick={decrease}>-{step}</button>

            <button onClick={reset}>Reset</button>

        </div>

    );

}

export default Counter;