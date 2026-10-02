// Q10: Child receives onButtonClick function prop, parent logs when clicked
function ChildButton({ onButtonClick }) {
  return <button onClick={onButtonClick}>Click me</button>;
}

function Q10_ButtonWithCallback() {
  const handleClick = () => {
    console.log("Button was clicked! (from parent)");
  };

  return (
    <div>
      <ChildButton onButtonClick={handleClick} />
      <p>Check the console when you click the button.</p>
    </div>
  );
}

export default Q10_ButtonWithCallback;
