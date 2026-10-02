import { useState } from "react";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {
        loggedIn
          ? <UserList />
          : <LoginForm onLogin={() => setLoggedIn(true)} />
      }
    </>
  );

}

export default App;