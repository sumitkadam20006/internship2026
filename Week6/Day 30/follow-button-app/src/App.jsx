import ProfileCard from "./components/ProfileCard";

function App() {

  const users = [

    {
      id:1,
      name:"Atharv",
      role:"Frontend Developer",
      initials:"AP",
      isVerified:true,
      initialFollowers:120
    },

    {
      id:2,
      name:"Sagar",
      role:"UI Designer",
      initials:"SG",
      isVerified:false,
      initialFollowers:80
    },

    {
      id:3,
      name:"Rahul",
      role:"React Developer",
      initials:"RK",
      isVerified:true,
      initialFollowers:250
    },

    {
      id:4,
      name:"Priya",
      role:"Backend Developer",
      initials:"PR",
      isVerified:false,
      initialFollowers:150
    },

    {
      id:5,
      name:"Neha",
      role:"Tester",
      initials:"NH",
      isVerified:true,
      initialFollowers:90
    }

  ];

  return (

    <div className="container">

      {
        users.map(user=>

          <ProfileCard
            key={user.id}
            {...user}
          />

        )
      }

    </div>

  );

}

export default App;