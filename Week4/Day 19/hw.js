// B1
const student = {
    name: "Atharv Pote",
    course: "Computer Science & IT",
    batch: 2026,
    isEnrolled: true,
    academicRecords: {
        attendance: "94%",
        marks: 86
    },
    skills: ["JavaScript", "C++", "DBMS"],
};
const studentJSON = JSON.stringify(student);
console.log("\nJSON String:\n", studentJSON);

// B2

function populateStudentCard() {
  const nameEl = document.getElementById("student-name");
  const courseEl = document.getElementById("student-course");
  const batchEl = document.getElementById("student-batch");
  const cardEl = document.getElementById("student-card");
  const toggleBtn = document.getElementById("toggle-highlight-btn");

  if (nameEl && courseEl && batchEl && cardEl && toggleBtn) {
    nameEl.textContent = student.name;
    courseEl.textContent = student.course;
    batchEl.textContent = `Batch: ${student.batch}`;

    toggleBtn.addEventListener("click", () => {
      cardEl.classList.toggle("highlight-card");
    });
  }
}
populateStudentCard();

//B3
const additionalStudents = [
    { name: "Sagar Pawar", course: "Information Technology", batch: "2026-B" },
    { name: "Rohit Sharma", course: "Computer Engineering", batch: "2026-A" },
    { name: "Atharv Pote", course: "Data Science", batch: "2026-C" }
];

function renderAllStudentCards() {
    const container = document.querySelector(".students-container");
    if (!container) return;

    const completeRegistry = [student, ...additionalStudents];
    
    let htmlContent = "";
    for (let i = 0; i < completeRegistry.length; i++) {
        const s = completeRegistry[i];
        htmlContent += `
            <div class="dynamic-student-card">
                <h3>${s.name}</h3>
                <p>Course: ${s.course}</p>
                <p>Batch: ${s.batch}</p>
            </div>
        `;
    }
    container.innerHTML = htmlContent;
}


