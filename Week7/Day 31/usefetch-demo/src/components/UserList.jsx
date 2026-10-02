import useFetch from "../hooks/useFetch";

function UserList() {

    const {

        data,
        loading,
        error,
        refetch

    } = useFetch("https://jsonplaceholder.typicode.com/users");

    return (

        <div>

            <h1>Users List</h1>

            <button onClick={refetch}>

                Reload

            </button>

            {loading && <h3>Loading...</h3>}

            {error && <h3>{error}</h3>}

            <ul>

                {

                    data.map(user => (

                        <li key={user.id}>

                            {user.name}

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default UserList;