import StarRating from "./components/StarRating";

function App() {

  function handleRating(value){
    alert("You rated : " + value + " ⭐");
  }

  return (
    <div>
      <StarRating
        rating={0}
        onRate={handleRating}
      />
    </div>
  );

}

export default App;