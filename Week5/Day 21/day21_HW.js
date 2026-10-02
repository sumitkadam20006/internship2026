// B1: Creating a basic Promise that resolves after 2 seconds
const modernPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success! Data fetched.");
    }, 2000);
});

modernPromise.then((message) => {
    console.log("B1 Output:", message);
});


// B2: Simulating random failure logic inside a Promise
function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dynamicChance = Math.random();
            if (dynamicChance > 0.5) {
                resolve({ id: 101, status: "Active Profile" });
            } else {
                reject("Network Timeout Error");
            }
        }, 1500);
    });
}

fetchUserData()
    .then((data) => {
        console.log("B2 Output (Success Case):", data);
    })
    .catch((error) => {
        console.error("B2 Output (Failure Case):", error);
    });


// B3: Chaining Promises sequentially to process data operations
function verifyUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, username: "Atharv Pote", role: "Developer" });
        }, 1000);
    });
}

function fetchUserPermissions(userObj) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...userObj, accessLevel: "Root/Admin", operations: ["READ", "WRITE"] });
        }, 1000);
    });
}

verifyUser(504)
    .then((user) => {
        console.log("B3 Step 1 - User Verified:", user);
        return fetchUserPermissions(user);
    })
    .then((finalProfile) => {
        console.log("B3 Step 2 - Complete Access Profile:", finalProfile);
    });


// C1: Implementing a standard Mock REST API Fetch Interface
function mockFetchAPI(endpointUrl) {
    return new Promise((resolve, reject) => {
        console.log(`\nC1: Establishing connection route to: ${endpointUrl}...`);
        setTimeout(() => {
            if (endpointUrl.includes("/valid-route")) {
                resolve({
                    status: 200,
                    payload: { data: "Target resource loaded safely" }
                });
            } else {
                reject({
                    status: 404,
                    message: "The requested endpoint resource could not be found."
                });
            }
        }, 2000);
    });
}

// Testing valid endpoint path
mockFetchAPI("https://api.proazure.local/v1/valid-route")
    .then((res) => console.log("C1 Valid Path Response:", res))
    .catch((err) => console.error("C1 Valid Path Exception:", err));

// Testing invalid fallback path
mockFetchAPI("https://api.proazure.local/v1/missing-route")
    .then((res) => console.log("C1 Invalid Path Response:", res))
    .catch((err) => console.error("C1 Invalid Path Exception:", err));


// C2: Conceptual Explanations regarding Microtask Priority Layout
/**
 * Q: Explain why .then() callbacks (Promises) print before setTimeout callbacks 
 * even if setTimeout is set to 0 milliseconds.
 * * A: JavaScript processes asynchronous behaviors using two distinct queues within the execution loop:
 * the Microtask Queue and the Macrotask (Callback) Queue. 
 * * - Promise `.then()` settlements, mutations, and structural resolution queues step into the Microtask Queue.
 * - Timers such as `setTimeout()` and `setInterval()` step into the Macrotask Queue.
 * * The Event Loop is explicitly engineered to fully drain and process the entire Microtask Queue 
 * before picking up the next batch of actions waiting in the Macrotask Queue. Therefore, microtask 
 * operations take priority over standard macro-timers regardless of a 0ms duration setting.
 */