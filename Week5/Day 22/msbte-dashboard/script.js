const students = [
    {
        id:101,
        name:"Atharv",
        courses:["HTML","JavaScript","CSS","React"],
        announcements:["Exam Next Week","Project Deadline Friday"]
    },
    {
        id:102,
        name:"Sagar",
        courses:["HTML","CSS","Bootstrap","JavaScript"],
        announcements:["Assignment Due Monday","Lab Test Tomorrow"]
    },
    {
        id:103,
        name:"Rahul",
        courses:["Python","Java","DBMS","React"],
        announcements:["Holiday on Friday","Seminar at 2 PM"]
    },
    {
        id:104,
        name:"Priya",
        courses:["HTML","CSS","C++","NodeJS"],
        announcements:["Internal Exam","Submit Mini Project"]
    },
    {
        id:105,
        name:"Neha",
        courses:["Java","SQL","React","Git"],
        announcements:["Workshop Saturday","Attendance Updated"]
    }
];

function fakeAPI(data,time){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(data);
        },time);
    });
}

async function loadDashboard(){

    const id = Number(document.getElementById("studentId").value);

    const student = students.find(s=>s.id===id);

    if(!student){
        alert("Student Not Found");
        return;
    }

    const details = await fakeAPI(student,1000);

    document.getElementById("studentName").innerText =
        "Welcome " + details.name + "!";

    const courseList = document.getElementById("courseList");
    courseList.innerHTML="";

    details.courses.forEach(course=>{
        courseList.innerHTML += `<li>${course}</li>`;
    });

    const announcementList =
        document.getElementById("announcementList");

    announcementList.innerHTML="";
    
    details.announcements.forEach(item=>{
        announcementList.innerHTML += `<li>${item}</li>`;
    });

}