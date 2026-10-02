// Q1: Component that renders <h1> with name and <p> with today's date using new Date()
function Q01_Welcome() {
  return (
    <div>
      <h1>Atharv Pote</h1>
      <p>{new Date().toDateString()}</p>
    </div>
  );
}

export default Q01_Welcome;
