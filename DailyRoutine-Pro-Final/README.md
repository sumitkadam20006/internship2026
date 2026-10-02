# DailyRoutine Pro — Final Year Project

A full-stack personal productivity and daily routine management system built with React, Node.js, Express and MongoDB.

## Features
- JWT authentication: Register, Login, Logout, current-user session
- Premium responsive dashboard
- Tasks: title, description, category, priority, due date, time, reminder, status, edit, delete, complete
- Habits: frequency, streak, daily check-in, edit, delete
- Goals: target date, progress, status, edit, delete
- Expenses: amount, category, date, note, edit, delete
- Journal: mood, title, entry, date, edit, delete
- Focus Timer: customizable focus/break timer with session history
- Analytics: task completion, habit completion, goal progress, expense totals, focus time
- Search/filter/sort on task list
- Toast notifications
- Dark/light theme toggle
- Responsive mobile layout
- MongoDB persistence

## Folder structure
DailyRoutine-Pro-Final/
  frontend/
  backend/

## Setup

### Backend
1. Open `backend/.env.example`.
2. Create `backend/.env`.
3. Add your MongoDB URI and JWT secret.
4. Run:

```bash
cd backend
npm install
npm run dev
```

Backend runs on http://localhost:5000

### Frontend
In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Important
Do not commit `.env`. Never share your MongoDB password or JWT secret.
