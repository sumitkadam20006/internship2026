/* ===========================
   STUDENT MANAGEMENT CRUD
   All API calls to http://localhost:3000
   =========================== */

// --- CONFIG ---
const API_BASE = 'http://localhost:3000';

// --- DOM REFS (grabbed once on startup) ---
const studentForm      = document.getElementById('studentForm');
const studentNameInput = document.getElementById('studentName');
const studentMarksInput= document.getElementById('studentMarks');
const editIdInput      = document.getElementById('editId');
const submitBtn        = document.getElementById('submitBtn');
const cancelBtn        = document.getElementById('cancelBtn');
const formTitle        = document.getElementById('formTitle');
const studentsTableBody= document.getElementById('studentsTableBody');
const searchInput      = document.getElementById('searchInput');
const sortSelect       = document.getElementById('sortSelect');
const loadingSpinner   = document.getElementById('loadingSpinner');
const emptyState       = document.getElementById('emptyState');
const tableWrapper     = document.getElementById('tableWrapper');
const notificationCont = document.getElementById('notificationContainer');

// --- STATE ---
let allStudents     = [];   // original data from API
let filteredStudents= [];   // data after search
let displayedStudents= [];  // data after search AND sort

/* ===========================
   NOTIFICATION SYSTEM
   =========================== */

/**
 * Shows a toast notification.
 * @param {string} message  - text to display
 * @param {'success'|'error'} type
 */
function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    notificationCont.appendChild(toast);

    // Automatically remove after animation ends (≈3.2 s)
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 3200);
}

/* ===========================
   API CALLS
   =========================== */

/** Fetch all students → GET /students */
async function fetchStudents() {
    const response = await fetch(`${API_BASE}/students`);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    return response.json();
}

/** Create a new student → POST /students */
async function createStudent(name, marks) {
    const response = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, marks: Number(marks) })
    });
    if (!response.ok) throw new Error(`Failed to create: ${response.status}`);
    return response.json();
}

/** Update an existing student → PUT /students/:id */
async function updateStudent(id, name, marks) {
    const response = await fetch(`${API_BASE}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, marks: Number(marks) })
    });
    if (!response.ok) throw new Error(`Failed to update: ${response.status}`);
    return response.json();
}

/** Delete a student → DELETE /students/:id */
async function deleteStudent(id) {
    const response = await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' });
    if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to delete: ${response.status}`);
    }
}

/* ===========================
   TABLE RENDERING
   =========================== */

/** Builds table rows from displayedStudents array */
function renderTable() {
    studentsTableBody.innerHTML = '';

    if (displayedStudents.length === 0) {
        // Show empty state, hide table
        emptyState.style.display = 'block';
        tableWrapper.style.display = 'none';
        return;
    }

    // Hide empty state, show table
    emptyState.style.display = 'none';
    tableWrapper.style.display = 'block';

    displayedStudents.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${escapeHtml(student.name)}</td>
            <td>${student.marks}</td>
            <td class="action-btns">
                <button class="btn btn-edit btn-edit-student" data-id="${student.id}">
                    ✏️ Edit
                </button>
                <button class="btn btn-danger btn-delete-student" data-id="${student.id}">
                    🗑️ Delete
                </button>
            </td>
        `;

        studentsTableBody.appendChild(row);
    });
}

/** Simple HTML escaping to prevent XSS */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* ===========================
   SEARCH & SORT FILTERS
   =========================== */

/** Filters by name (case-insensitive substring match) */
function applySearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        filteredStudents = [...allStudents];
    } else {
        filteredStudents = allStudents.filter(s =>
            s.name.toLowerCase().includes(query)
        );
    }

    applySort();
}

/** Sorts filteredStudents based on dropdown selection */
function applySort() {
    displayedStudents = [...filteredStudents];

    switch (sortSelect.value) {
        case 'marks-asc':
            displayedStudents.sort((a, b) => a.marks - b.marks);
            break;
        case 'marks-desc':
            displayedStudents.sort((a, b) => b.marks - a.marks);
            break;
        case 'default':
        default:
            displayedStudents.sort((a, b) => a.id - b.id);
            break;
    }

    renderTable();
}

/* ===========================
   LOADING / DATA FLOW
   =========================== */

/**
 * Core function: fetches backend, updates UI.
 * Called on page load and after every mutating operation.
 */
async function loadStudents() {
    // Show spinner, hide table & empty state while loading
    loadingSpinner.style.display = 'flex';
    emptyState.style.display = 'none';
    tableWrapper.style.display = 'none';

    try {
        allStudents = await fetchStudents();
        applySearch(); // resets filtered → search → sort → render
    } catch (err) {
        console.error(err);
        showNotification(err.message, 'error');
        allStudents = [];
        filteredStudents = [];
        displayedStudents = [];
        renderTable();
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

/* ===========================
   FORM MODE MANAGEMENT
   =========================== */

/** Switches form to Add mode */
function setAddMode() {
    formTitle.textContent    = 'Add New Student';
    submitBtn.textContent    = '➕ Add Student';
    editIdInput.value        = '';
    cancelBtn.style.display  = 'none';
    studentNameInput.value   = '';
    studentMarksInput.value  = '';
}

/** Switches form to Edit mode and fills with student data */
function setEditMode(student) {
    formTitle.textContent    = 'Edit Student';
    submitBtn.textContent    = '💾 Save Changes';
    editIdInput.value        = student.id;
    cancelBtn.style.display  = 'inline-block';
    studentNameInput.value   = student.name;
    studentMarksInput.value  = student.marks;
    // Scroll to form smoothly
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

/* ===========================
   FORM SUBMIT HANDLER
   =========================== */

studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name  = studentNameInput.value.trim();
    const marks = studentMarksInput.value.trim();
    const editId= editIdInput.value;

    // Quick client-side validation
    if (Number(marks) < 0 || Number(marks) > 100) {
        showNotification('Marks must be between 0 and 100', 'error');
        return;
    }

    try {
        if (editId) {
            // Update existing student
            await updateStudent(editId, name, marks);
            showNotification(`Student "${name}" updated successfully!`, 'success');
            setAddMode();
        } else {
            // Create new student
            const created = await createStudent(name, marks);
            showNotification(`Student "${created.name}" added successfully!`, 'success');
            studentForm.reset();
            setAddMode();
        }

        // Refresh table with latest data
        await loadStudents();
    } catch (err) {
        console.error(err);
        showNotification(err.message, 'error');
    }
});

/* ===========================
   CANCEL EDIT BUTTON
   =========================== */

cancelBtn.addEventListener('click', () => {
    setAddMode();
    studentForm.reset();
});

/* ===========================
   TABLE CLICKS (Edit & Delete)
   Uses event delegation for dynamic rows
   =========================== */

studentsTableBody.addEventListener('click', async (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const studentId = Number(target.getAttribute('data-id'));

    // --- EDIT ---
    if (target.classList.contains('btn-edit-student')) {
        const student = allStudents.find(s => s.id === studentId);
        if (student) setEditMode(student);
    }

    // --- DELETE ---
    if (target.classList.contains('btn-delete-student')) {
        // Confirmation dialog
        if (!confirm('⚠️ Are you sure you want to permanently delete this student?')) {
            return;
        }

        try {
            await deleteStudent(studentId);
            showNotification('Student deleted successfully!', 'success');
            await loadStudents();
        } catch (err) {
            console.error(err);
            showNotification(err.message, 'error');
        }
    }
});

/* ===========================
   SEARCH & SORT EVENT LISTENERS
   =========================== */

searchInput.addEventListener('input', () => {
    applySearch();
});

sortSelect.addEventListener('change', () => {
    applySort();
});

/* ===========================
   INITIAL LOAD
   Fires as soon as the script runs
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});