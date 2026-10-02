// Q16: Controlled text input with live character count (red > 20)
import { useState } from "react";

function Q16_ControlledInput() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p style={{ color: text.length > 20 ? "red" : "inherit" }}>
        Character count: {text.length}
      </p>
    </div>
  );
}

export default Q16_ControlledInput;
