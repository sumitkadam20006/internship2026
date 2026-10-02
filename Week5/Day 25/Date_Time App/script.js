function showTime(){

    const now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    if(hour < 10){
        hour = "0" + hour;
    }

    if(minute < 10){
        minute = "0" + minute;
    }

    if(second < 10){
        second = "0" + second;
    }

    document.getElementById("time").innerHTML =
        hour + ":" + minute + ":" + second;

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const months = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];

    document.getElementById("date").innerHTML =
        days[now.getDay()] + ", " +
        now.getDate() + " " +
        months[now.getMonth()] + " " +
        now.getFullYear();

}

showTime();

setInterval(showTime,1000);