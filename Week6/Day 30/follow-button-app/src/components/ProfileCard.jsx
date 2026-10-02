import { useState } from "react";
import "./ProfileCard.css";

function ProfileCard({

    name,
    role,
    initials,
    isVerified,
    initialFollowers

}){

    const [follow,setFollow]=useState(false);

    const [followers,setFollowers]=useState(initialFollowers);

    function handleFollow(){

        if(follow){

            setFollow(false);
            setFollowers(followers-1);

        }

        else{

            setFollow(true);
            setFollowers(followers+1);

        }

    }

    return(

        <div className="card">

            <div className="avatar">

                {initials}

            </div>

            <h2>

                {name}

                {isVerified && " ✔"}

            </h2>

            <p>{role}</p>

            <h3>{followers} Followers</h3>

            <button

                onClick={handleFollow}

                style={{
                    background:follow?"green":"blue"
                }}

            >

                {follow?"Following":"Follow"}

            </button>

        </div>

    );

}

export default ProfileCard;