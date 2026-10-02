async function loadUsers() {
    let isloading = false;

    try {
        console.log("Fetching Users...");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`Server returned ${response.status} : ${response.statusText}`);
        }

        const users = await response.json();
        console.log(`Got ${users.length} users`);
        return users;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Network Error: - are you offline?");
        } else {
            console.error("Error:", error.message);
        }
        return [];

    } finally {
        isloading = false;
        console.log("Done Loading (spinner hidden)");
    }
}

loadUsers();