// Q15: ToggleSwitch with functional update form
import { useState } from "react";

function Q15_ToggleSwitch() {
  const [on, setOn] = useState(false);

  // Using functional update setOn(prev => !prev) instead of setOn(!on)
  // because functional form always uses the latest state value, avoiding
  // stale-closure bugs when multiple updates are batched together.
  const toggle = () => setOn((prev) => !prev);

  return (
    <div
      onClick={toggle}
      style={{
        display: "inline-block",
        padding: "10px 20px",
        background: on ? "#28a745" : "#6c757d",
        color: "white",
        cursor: "pointer",
        borderRadius: "20px",
        userSelect: "none",
      }}
    >
      {on ? "ON" : "OFF"}
    </div>
  );
}

export default Q15_ToggleSwitch;
