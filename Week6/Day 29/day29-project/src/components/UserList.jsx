import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import "./UserList.css";

function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")

            .then((response) => response.json())

            .then((data) => {

                setUsers(data);
                setLoading(false);

            })

            .catch(() => {

                setError("Failed to Load");
                setLoading(false);

            });

    }, []);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="users">

            {
                users.map((user) => (

                    <UserCard key={user.id} user={user} />

                ))
            }

        </div>

    );

}

export default UserList;