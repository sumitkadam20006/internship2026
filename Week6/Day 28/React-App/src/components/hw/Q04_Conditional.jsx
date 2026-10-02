// Q4: Conditional rendering with ternary operator inside JSX
const isLoggedIn = true;

function Q04_Conditional() {
  return (
    <div>{isLoggedIn ? "Logged in" : "Logged out"}</div>
  );
}

export default Q04_Conditional;
