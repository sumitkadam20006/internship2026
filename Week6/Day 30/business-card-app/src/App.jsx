import BusinessCard from "./components/BusinessCard";

function App() {

  return (

    <div>

      <BusinessCard
        name="Atharv Pote"
        title="Frontend Developer"
        email="atharv@gmail.com"
        phone="9876543210"
        avatarInitials="AP"
        theme="light"
      />

      <BusinessCard
        name="Sagar"
        title="UI Designer"
        email="sagar@gmail.com"
        phone="9999999999"
        avatarInitials="SG"
        theme="dark"
      />

      <BusinessCard
        name="Rahul"
        title="React Developer"
        avatarInitials="RK"
      />

    </div>

  );

}

export default App;