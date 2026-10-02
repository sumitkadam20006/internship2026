import { useState } from "react";
import "./UserCard.css";

function UserCard({ user }) {

    const [show, setShow] = useState(false);

    return (

        <div className="card">

            <div className="avatar">

                {user.name.charAt(0)}

            </div>

            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <button
                onClick={() => setShow(!show)}
            >

                {show ? "Hide" : "More"}

            </button>

            {
                show && (

                    <div>

                        <p>{user.phone}</p>

                        <p>{user.website}</p>

                        <p>{user.company.name}</p>

                    </div>

                )
            }

        </div>

    );

}

export default UserCard;