import TeamMember from "./components/TeamMember";

function App() {

  const members = [

    {id:1,name:"Atharv",role:"Frontend Developer",initials:"AP"},
    {id:2,name:"Sagar",role:"UI Designer",initials:"SG"},
    {id:3,name:"Rahul",role:"React Developer",initials:"RK"},
    {id:4,name:"Priya",role:"Backend Developer",initials:"PR"},
    {id:5,name:"Neha",role:"Tester",initials:"NH"},
    {id:6,name:"Aman",role:"Full Stack Developer",initials:"AM"}

  ];

  return (

    <div>

      <h1>Team Roster</h1>

      <div className="grid">

        {members.map(member=>(
          <TeamMember
            key={member.id}
            name={member.name}
            role={member.role}
            initials={member.initials}
          />
        ))}

      </div>

    </div>

  );

}

export default App;