function updateClock(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    document.getElementById("time").textContent =
    `${hours}:${minutes}:${seconds}`;

    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    };

    document.getElementById("date").textContent =
    now.toLocaleDateString("en-US", options);

}

setInterval(updateClock,1000);

updateClock();