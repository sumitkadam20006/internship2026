import Counter from "./components/Counter";

function App() {

  return (

    <div>

      <h1>Click Counter Dashboard</h1>

      <Counter label="Likes" />

      <Counter label="Shares" step={5} />

      <Counter label="Comments" />

    </div>

  );

}

export default App;