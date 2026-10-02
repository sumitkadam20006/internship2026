const router = require("express").Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const Habit = require("../models/Habit");
const Goal = require("../models/Goal");
const Expense = require("../models/Expense");
const FocusSession = require("../models/FocusSession");
const Journal = require("../models/Journal");

router.get("/", auth, async (req, res) => {
  try {
    const user = { user: req.userId };
    const [tasks, habits, goals, expenses, focus, journal] = await Promise.all([
      Task.find(user), Habit.find(user), Goal.find(user), Expense.find(user), FocusSession.find(user), Journal.find(user)
    ]);
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const pendingTasks = tasks.filter(t => t.status !== "completed").length;
    const productivity = tasks.length ? Math.round(completedTasks / tasks.length * 100) : 0;
    const expenseTotal = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
    const focusMinutes = focus.filter(f => f.mode === "focus").reduce((s, f) => s + Number(f.minutes || 0), 0);
    const goalProgress = goals.length ? Math.round(goals.reduce((s,g)=>s+Number(g.progress||0),0)/goals.length) : 0;
    const habitStreak = habits.reduce((m,h)=>Math.max(m, Number(h.streak||0)), 0);
    const recentTasks = [...tasks].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6);
    res.json({
      counts: { tasks: tasks.length, completedTasks, pendingTasks, habits: habits.length, goals: goals.length, expenses: expenses.length, journal: journal.length },
      productivity, expenseTotal, focusMinutes, goalProgress, habitStreak, recentTasks
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
