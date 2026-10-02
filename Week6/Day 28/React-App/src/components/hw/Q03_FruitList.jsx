// Q3: Render a list of 5 fruits using .map() with key prop
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

function Q03_FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
      {/* key helps React identify which items changed/added/removed for efficient DOM updates */}
    </ul>
  );
}

export default Q03_FruitList;
