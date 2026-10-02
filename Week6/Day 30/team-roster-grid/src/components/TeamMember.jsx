import { useState } from "react";
import "./TeamMember.css";

function TeamMember({name,role,initials}){

    const [online,setOnline] = useState(true);

    return(

        <div className="card">

            <div className="avatar">
                {initials}
            </div>

            <h2>{name}</h2>

            <p>{role}</p>

            <h4>
                {online ? "🟢 Online" : "🔴 Offline"}
            </h4>

            <button onClick={()=>setOnline(!online)}>
                Toggle Status
            </button>

        </div>

    );

}

export default TeamMember;