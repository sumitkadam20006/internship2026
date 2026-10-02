import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, CheckSquare, Flame, Target, WalletCards, BookOpen, Timer,
  BarChart3, Settings, LogOut, Bell, Search, Sun, Moon, Plus, Pencil, Trash2,
  Check, X, ChevronRight, CalendarDays, Clock3, CircleDollarSign, Sparkles,
  Menu, UserRound, TrendingUp, ShieldCheck, Smile, Meh, Frown
} from "lucide-react";
import api from "./api";

const nav = [
  ["/", "Dashboard", LayoutDashboard],
  ["/tasks", "Tasks", CheckSquare],
  ["/habits", "Habits", Flame],
  ["/goals", "Goals", Target],
  ["/expenses", "Expenses", WalletCards],
  ["/journal", "Journal", BookOpen],
  ["/focus", "Focus Timer", Timer],
  ["/analytics", "Analytics", BarChart3]
];

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("dr_token")) { setLoading(false); return; }
    api.get("/auth/me").then(r => setUser(r.data.user)).catch(() => {
      localStorage.removeItem("dr_token");
    }).finally(() => setLoading(false));
  }, []);
  return { user, setUser, loading };
}

function Toast({ message, type="success", onClose }) {
  if (!message) return null;
  return <div className={`toast ${type}`} onClick={onClose}>{type === "success" ? <Check size={16}/> : <X size={16}/>} {message}</div>;
}

function App() {
  const auth = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("dr_theme") || "dark");
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("dr_theme", theme); }, [theme]);
  if (auth.loading) return <div className="splash"><div className="brand">Daily<span>Routine</span></div><div className="spinner"/></div>;
  if (!auth.user) return <Auth onLogin={auth.setUser}/>;
  return <Shell user={auth.user} onLogout={() => { localStorage.removeItem("dr_token"); auth.setUser(null); }} theme={theme} setTheme={setTheme}/>;
}

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({name:"",email:"",password:""});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const r = await api.post(`/auth/${mode}`, form);
      localStorage.setItem("dr_token", r.data.token); onLogin(r.data.user);
    } catch(e) { setError(e.response?.data?.message || "Something went wrong"); }
    finally { setBusy(false); }
  };
  return <div className="auth-page">
    <div className="auth-glow glow-one"/><div className="auth-glow glow-two"/>
    <div className="auth-card">
      <div className="brand big">Daily<span>Routine</span><i>PRO</i></div>
      <div className="auth-badge"><Sparkles size={15}/> Personal productivity workspace</div>
      <h1>{mode === "login" ? "Welcome back" : "Build better days"}</h1>
      <p className="muted">{mode === "login" ? "Sign in to continue your routine." : "Plan, track and improve your everyday life."}</p>
      {error && <div className="error-box">{error}</div>}
      <form onSubmit={submit} className="stack">
        {mode === "register" && <Field label="Full name" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Sumit Kadam" required/>}
        <Field label="Email" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="you@example.com" required/>
        <Field label="Password" type="password" value={form.password} onChange={v=>setForm({...form,password:v})} placeholder="Minimum 6 characters" required/>
        <button className="primary big-btn" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Sign in →" : "Create account →"}</button>
      </form>
      <button className="switch-btn" onClick={()=>{setMode(mode==="login"?"register":"login");setError("")}}>
        {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  </div>;
}

function Field({label,value,onChange,type="text",placeholder,required=false}) {
  return <label className="field"><span>{label}</span><input required={required} type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></label>;
}

function Shell({user,onLogout,theme,setTheme}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen,setMobileOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [toast,setToast]=useState("");
  const current = nav.find(n => n[0] === location.pathname)?.[1] || "Dashboard";
  const notify = msg => { setToast(msg); setTimeout(()=>setToast(""),2800); };
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen?"open":""}`}>
      <div className="side-brand"><div className="brand">Daily<span>Routine</span></div><small>PERSONAL OS</small></div>
      <div className="side-section">WORKSPACE</div>
      <nav>{nav.map(([path,label,Icon])=><Link key={path} to={path} onClick={()=>setMobileOpen(false)} className={location.pathname===path?"active":""}><Icon size={19}/><span>{label}</span></Link>)}</nav>
      <div className="sidebar-bottom">
        <button className="side-action" onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>} <span>{theme==="dark"?"Light mode":"Dark mode"}</span></button>
        <button className="side-action" onClick={onLogout}><LogOut size={18}/><span>Logout</span></button>
      </div>
    </aside>
    {mobileOpen && <div className="overlay" onClick={()=>setMobileOpen(false)}/>}
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button>
        <div className="top-title"><b>{current}</b><span>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"short"})}</span></div>
        <div className="top-actions">
          <div className="search"><Search size={17}/><input placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
          <button className="icon-btn"><Bell size={19}/><i/></button>
          <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
        </div>
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard user={user} notify={notify}/>}/>
          <Route path="/tasks" element={<Tasks notify={notify}/>}/>
          <Route path="/habits" element={<Habits notify={notify}/>}/>
          <Route path="/goals" element={<Goals notify={notify}/>}/>
          <Route path="/expenses" element={<Expenses notify={notify}/>}/>
          <Route path="/journal" element={<Journal notify={notify}/>}/>
          <Route path="/focus" element={<Focus notify={notify}/>}/>
          <Route path="/analytics" element={<Analytics/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </div>
    </main>
    <Toast message={toast} onClose={()=>setToast("")}/>
  </div>
}

function PageHead({eyebrow,title,subtitle,action}) {
  return <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>
}

function Dashboard({ user, notify }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const r = await api.get("/analytics");
      setData(r.data);
    } catch (error) {
      console.error("Dashboard analytics error:", error);
      notify?.("Unable to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="loading-box">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const c = data?.counts || {};

  return (
    <div>
      <PageHead
        eyebrow={`GOOD DAY, ${user?.name?.split(" ")[0]?.toUpperCase() || "USER"} 👋`}
        title="Your day, your system."
        subtitle="A clear view of what matters today."
        action={
          <Link className="primary compact" to="/tasks">
            <Plus size={17} />
            Add task
          </Link>
        }
      />

      {/* Hero Banner */}
      <div className="hero-banner">
        <div>
          <span className="banner-pill">
            <Sparkles size={14} />
            Daily momentum
          </span>

          <h2>
            Small actions. <span>Big progress.</span>
          </h2>

          <p>
            Stay consistent, complete your priorities and build a routine
            that works for you.
          </p>
        </div>

        <div className="banner-orb">
          <TrendingUp size={54} />
        </div>
      </div>

      {/* Statistics */}
      <div className="stat-grid">
        <Stat
          icon={CheckSquare}
          label="Completed"
          value={c.completedTasks || 0}
          note={`${c.tasks || 0} total tasks`}
        />

        <Stat
          icon={Clock3}
          label="Pending"
          value={c.pendingTasks || 0}
          note="Keep moving"
        />

        <Stat
          icon={Flame}
          label="Best streak"
          value={`${data?.habitStreak || 0}d`}
          note={`${c.habits || 0} habits`}
        />

        <Stat
          icon={Target}
          label="Goal progress"
          value={`${data?.goalProgress || 0}%`}
          note={`${c.goals || 0} active goals`}
        />

        <Stat
          icon={CircleDollarSign}
          label="Expenses"
          value={`₹${Math.round(data?.expenseTotal || 0)}`}
          note={`${c.expenses || 0} records`}
        />

        <Stat
          icon={Timer}
          label="Focus time"
          value={`${Math.floor((data?.focusMinutes || 0) / 60)}h`}
          note={`${data?.focusMinutes || 0} minutes`}
        />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">

        {/* Today's Tasks */}
        <section className="card wide">

          <div className="card-head">
            <div>
              <h3>Today's priorities</h3>
              <p>Recent work that needs your attention.</p>
            </div>

            <Link to="/tasks" className="text-link">
              View all
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="task-preview">

            {(data?.recentTasks || [])
              .slice(0, 5)
              .map((t) => (
                <TaskRow
                  key={t._id}
                  t={t}
                  onDone={async () => {
                    try {
                      await api.put(`/tasks/${t._id}`, {
                        status:
                          t.status === "completed"
                            ? "pending"
                            : "completed",
                      });

                      await load();
                    } catch (error) {
                      console.error(error);
                      notify?.("Unable to update task", "error");
                    }
                  }}
                />
              ))}

            {!data?.recentTasks?.length && (
              <Empty
                icon={CheckSquare}
                title="No tasks yet"
                text="Add your first task to start building momentum."
              />
            )}

          </div>
        </section>

        {/* Daily Focus */}
        <section className="card">

          <div className="card-head">
            <div>
              <h3>Daily focus</h3>
              <p>Productivity score</p>
            </div>

            <TrendingUp size={20} />
          </div>

          <div
            className="ring"
            style={{
              "--p": `${data?.productivity || 0}%`,
            }}
          >
            <div>
              {data?.productivity || 0}%
            </div>
          </div>

          <p className="center muted">
            Complete tasks regularly to improve your score.
          </p>

          <Link
            className="outline full"
            to="/focus"
          >
            Start focus session
          </Link>

        </section>

      </div>
    </div>
  );
}

function Stat({icon:Icon,label,value,note}) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={20}/></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>
}
function TaskRow({t,onDone}) {
  return <div className="task-row"><button className={`check ${t.status==="completed"?"done":""}`} onClick={onDone}>{t.status==="completed"&&<Check size={14}/>}</button><div className="task-main"><b className={t.status==="completed"?"strike":""}>{t.title}</b><span>{t.category} · {t.dueDate||"No due date"} {t.time&&`· ${t.time}`}</span></div><Badge text={t.priority}/></div>
}
function Badge({text}) { return <span className={`badge ${text}`}>{text}</span> }
function Empty({icon:Icon,title,text}) { return <div className="empty"><div className="empty-icon"><Icon/></div><b>{title}</b><p>{text}</p></div> }

const today=()=>new Date().toISOString().slice(0,10);

function Tasks({notify}) {
  const blank={title:"",description:"",category:"Study",priority:"medium",dueDate:today(),time:"",reminder:false,status:"pending"};
  return <CrudPage endpoint="tasks" title="Tasks" eyebrow="PLAN • PRIORITIZE • COMPLETE" subtitle="Turn your priorities into clear actions." notify={notify}
    fields={["title","description","category","priority","dueDate","time","reminder","status"]} initial={blank}
    form={<TaskForm initial={blank}/>} renderItem={(t,edit,del,reload)=><TaskCard t={t} edit={edit} del={del} reload={reload}/>}
    emptyText="No tasks yet. Add your first priority."/>
}
function TaskForm({initial,onChange}) {
  const [v,setV]=useState(initial);
  useEffect(()=>onChange?.(v),[v]);
  const set=(k,x)=>setV(s=>({...s,[k]:x}));
  return <div className="form-grid">
    <Field label="Task title" value={v.title} onChange={x=>set("title",x)} placeholder="e.g. Complete MERN project" required/>
    <Field label="Category" value={v.category} onChange={x=>set("category",x)} placeholder="Study / Work / Fitness"/>
    <label className="field"><span>Description</span><textarea value={v.description} onChange={e=>set("description",e.target.value)} placeholder="What exactly needs to be done?"/></label>
    <Select label="Priority" value={v.priority} onChange={x=>set("priority",x)} options={[["low","Low"],["medium","Medium"],["high","High"]]}/>
    <Field label="Due date" type="date" value={v.dueDate} onChange={x=>set("dueDate",x)} />
    <Field label="Time" type="time" value={v.time} onChange={x=>set("time",x)} />
    <Select label="Status" value={v.status} onChange={x=>set("status",x)} options={[["pending","Pending"],["in-progress","In Progress"],["completed","Completed"]]}/>
    <label className="toggle-field"><input type="checkbox" checked={v.reminder} onChange={e=>set("reminder",e.target.checked)}/><span><Bell size={17}/> Reminder</span><small>Notify me for this task</small></label>
    <button className="primary form-submit" type="submit"><Plus size={17}/> Add task</button>
  </div>
}
function Select({label,value,onChange,options}) { return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o[0]} value={o[0]}>{o[1]}</option>)}</select></label> }

function TaskCard({t,edit,del,reload}) {
  return <div className="item-card"><div className="item-top"><div className={`priority-dot ${t.priority}`}/><div className="item-title"><b className={t.status==="completed"?"strike":""}>{t.title}</b><div className="chips"><Badge text={t.priority}/><span className="chip">{t.category}</span>{t.reminder&&<span className="chip"><Bell size={13}/> Reminder</span>}</div></div><div className="item-actions"><button onClick={()=>edit(t)}><Pencil size={16}/></button><button onClick={()=>del(t._id)}><Trash2 size={16}/></button></div></div><p>{t.description||"No description added."}</p><div className="item-meta"><span><CalendarDays size={14}/>{t.dueDate||"No due date"}</span>{t.time&&<span><Clock3 size={14}/>{t.time}</span>}<select value={t.status} onChange={e=>api.put(`/tasks/${t._id}`,{status:e.target.value}).then(reload)}><option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select></div></div>
}

function CrudPage({endpoint,title,eyebrow,subtitle,initial,fields,form,renderItem,emptyText,notify}) {
  const [items,setItems]=useState([]); const [editing,setEditing]=useState(null); const [formValue,setFormValue]=useState(initial);
  const [show,setShow]=useState(false); const [loading,setLoading]=useState(true);
  const load=()=>{setLoading(true);api.get(`/${endpoint}`).then(r=>setItems(r.data)).finally(()=>setLoading(false))};
  useEffect(load,[]);
  const submit=async e=>{e.preventDefault();try{if(editing) await api.put(`/${endpoint}/${editing._id}`,formValue);else await api.post(`/${endpoint}`,formValue);notify(editing?"Updated successfully":"Added successfully");setEditing(null);setShow(false);setFormValue(initial);load()}catch(e){notify(e.response?.data?.message||"Save failed","error")}};
  const del=async id=>{if(!confirm("Delete this item?"))return;await api.delete(`/${endpoint}/${id}`);notify("Deleted");load()};
  const edit=item=>{setEditing(item);setFormValue(item);setShow(true)};
  const formNode = React.cloneElement(form,{initial:formValue,onChange:setFormValue});
  return <div><PageHead eyebrow={eyebrow} title={title} subtitle={subtitle} action={<button className="primary compact" onClick={()=>{setEditing(null);setFormValue(initial);setShow(true)}}><Plus size={17}/> Add {title.slice(0,-1)}</button>}/>
    {show && <div className="modal-backdrop"><form className="modal card" onSubmit={submit}><div className="modal-head"><div><h2>{editing?`Edit ${title.slice(0,-1)}`:`Add ${title.slice(0,-1)}`}</h2><p className="muted">Save it to your personal workspace.</p></div><button type="button" className="icon-btn" onClick={()=>setShow(false)}><X/></button></div>{formNode}<div className="modal-actions"><button type="button" className="outline" onClick={()=>setShow(false)}>Cancel</button><button className="primary" type="submit">{editing?"Save changes":"Add"}</button></div></form></div>}
    <div className="items-grid">{loading?<div className="card loading-box">Loading...</div>:items.map(i=>renderItem(i,edit,del,load))}</div>
    {!loading&&!items.length&&<div className="card"><Empty title={emptyText} text="Use the Add button above to create your first record." icon={Plus}/></div>}
  </div>
}

function Habits({notify}) {
  const initial={name:"",category:"Health",frequency:"daily",streak:0,lastCompleted:"",color:"#7c5cff"};
  const form=<HabitForm initial={initial}/>;
  return <CrudPage endpoint="habits" title="Habits" eyebrow="CONSISTENCY • STREAKS • GROWTH" subtitle="Build routines that become second nature." initial={initial} form={form} notify={notify}
    renderItem={(h,edit,del,reload)=><div className="item-card habit-card"><div className="habit-color" style={{background:h.color}}/><div className="item-top"><div className="item-title"><b>{h.name}</b><div className="chips"><span className="chip">{h.category}</span><span className="chip">{h.frequency}</span></div></div><div className="item-actions"><button onClick={()=>edit(h)}><Pencil size={16}/></button><button onClick={()=>del(h._id)}><Trash2 size={16}/></button></div></div><div className="streak-line"><span>🔥 {h.streak} day streak</span><button className="small-primary" onClick={()=>api.put(`/habits/${h._id}`,{streak:(h.streak||0)+1,lastCompleted:today()}).then(reload).then(()=>notify("Habit completed 🔥"))}><Check size={14}/> Done today</button></div></div>}/>
}
function HabitForm({initial,onChange}){const[v,setV]=useState(initial);useEffect(()=>onChange?.(v),[v]);const s=(k,x)=>setV(a=>({...a,[k]:x}));return <div className="form-grid"><Field label="Habit name" value={v.name} onChange={x=>s("name",x)} placeholder="e.g. Workout 60 minutes" required/><Field label="Category" value={v.category} onChange={x=>s("category",x)} placeholder="Health / Study"/><Select label="Frequency" value={v.frequency} onChange={x=>s("frequency",x)} options={[["daily","Daily"],["weekdays","Weekdays"],["weekly","Weekly"]]}/><Field label="Color" type="color" value={v.color} onChange={x=>s("color",x)}/></div>}

function Goals({notify}) {
  const initial={title:"",description:"",category:"Career",targetDate:"",progress:0,status:"active"};
  return <CrudPage endpoint="goals" title="Goals" eyebrow="VISION • MILESTONES • PROGRESS" subtitle="Turn ambitions into measurable progress." initial={initial} form={<GoalForm initial={initial}/>} notify={notify}
    renderItem={(g,edit,del,reload)=><div className="item-card"><div className="item-top"><div className="item-title"><b>{g.title}</b><div className="chips"><span className="chip">{g.category}</span><span className="chip">{g.targetDate||"No target date"}</span></div></div><div className="item-actions"><button onClick={()=>edit(g)}><Pencil size={16}/></button><button onClick={()=>del(g._id)}><Trash2 size={16}/></button></div></div><p>{g.description||"No description added."}</p><div className="progress-head"><span>Progress</span><b>{g.progress}%</b></div><div className="progress"><i style={{width:`${g.progress}%`}}/></div><div className="goal-controls"><input type="range" min="0" max="100" value={g.progress} onChange={e=>api.put(`/goals/${g._id}`,{progress:Number(e.target.value)}).then(reload)}/><Badge text={g.status}/></div></div>}/>
}
function GoalForm({initial,onChange}){const[v,setV]=useState(initial);useEffect(()=>onChange?.(v),[v]);const s=(k,x)=>setV(a=>({...a,[k]:x}));return <div className="form-grid"><Field label="Goal title" value={v.title} onChange={x=>s("title",x)} placeholder="e.g. Finish MERN project" required/><Field label="Category" value={v.category} onChange={x=>s("category",x)} placeholder="Career"/><label className="field"><span>Description</span><textarea value={v.description} onChange={e=>s("description",e.target.value)} placeholder="Define the outcome."/></label><Field label="Target date" type="date" value={v.targetDate} onChange={x=>s("targetDate",x)}/><Field label="Progress %" type="number" min="0" max="100" value={v.progress} onChange={x=>s("progress",Number(x))}/><Select label="Status" value={v.status} onChange={x=>s("status",x)} options={[["active","Active"],["completed","Completed"],["paused","Paused"]]}/></div>}

function Expenses({notify}) {
  const initial={title:"",category:"Food",amount:"",date:today(),note:""};
  return <CrudPage endpoint="expenses" title="Expenses" eyebrow="SPEND • TRACK • UNDERSTAND" subtitle="Keep your daily spending visible and intentional." initial={initial} form={<ExpenseForm initial={initial}/>} notify={notify}
    renderItem={(e,edit,del)=><div className="item-card expense-card"><div><div className="item-title"><b>{e.title}</b><span>{e.category} · {e.date}</span></div><p>{e.note||"No note"}</p></div><strong className="money">₹{Number(e.amount).toLocaleString("en-IN")}</strong><div className="item-actions"><button onClick={()=>edit(e)}><Pencil size={16}/></button><button onClick={()=>del(e._id)}><Trash2 size={16}/></button></div></div>}/>
}
function ExpenseForm({initial,onChange}){const[v,setV]=useState(initial);useEffect(()=>onChange?.(v),[v]);const s=(k,x)=>setV(a=>({...a,[k]:x}));return <div className="form-grid"><Field label="Expense title" value={v.title} onChange={x=>s("title",x)} placeholder="e.g. Lunch" required/><Select label="Category" value={v.category} onChange={x=>s("category",x)} options={["Food","Travel","Education","Bills","Fitness","Shopping","Other"].map(x=>[x,x])}/><Field label="Amount (₹)" type="number" min="0" value={v.amount} onChange={x=>s("amount",x)} placeholder="120" required/><Field label="Date" type="date" value={v.date} onChange={x=>s("date",x)} required/><Field label="Note" value={v.note} onChange={x=>s("note",x)} placeholder="Optional note"/></div>}

function Journal({notify}) {
  const initial={title:"",mood:"good",entry:"",date:today()};
  return <CrudPage endpoint="journal" title="Journal" eyebrow="REFLECT • RESET • REMEMBER" subtitle="Capture thoughts, wins and lessons from your day." initial={initial} form={<JournalForm initial={initial}/>} notify={notify}
    renderItem={(j,edit,del)=><div className="item-card journal-card"><div className="journal-mood">{j.mood==="great"?<Sparkles/>:j.mood==="good"?<Smile/>:j.mood==="okay"?<Meh/>:<Frown/>}</div><div className="journal-content"><div className="item-top"><div className="item-title"><b>{j.title}</b><span>{j.date} · {j.mood}</span></div><div className="item-actions"><button onClick={()=>edit(j)}><Pencil size={16}/></button><button onClick={()=>del(j._id)}><Trash2 size={16}/></button></div></div><p>{j.entry}</p></div></div>}/>
}
function JournalForm({initial,onChange}){const[v,setV]=useState(initial);useEffect(()=>onChange?.(v),[v]);const s=(k,x)=>setV(a=>({...a,[k]:x}));return <div className="form-grid"><Field label="Title" value={v.title} onChange={x=>s("title",x)} placeholder="A productive day" required/><Field label="Date" type="date" value={v.date} onChange={x=>s("date",x)} required/><Select label="Mood" value={v.mood} onChange={x=>s("mood",x)} options={[["great","✨ Great"],["good","😊 Good"],["okay","😐 Okay"],["low","😕 Low"],["bad","😞 Bad"]]}/><label className="field full-field"><span>Journal entry</span><textarea className="big-text" value={v.entry} onChange={e=>s("entry",e.target.value)} placeholder="What happened today? What did you learn?" required/></label></div>}

function Focus({notify}) {
  const [minutes,setMinutes]=useState(25),[seconds,setSeconds]=useState(0),[running,setRunning]=useState(false),[mode,setMode]=useState("focus"),[label,setLabel]=useState("Deep work");
  const total=minutes*60+seconds;
  useEffect(()=>{if(!running)return;const id=setInterval(()=>{setSeconds(s=>{if(s===0){if(minutes===0){setRunning(false);api.post("/focus",{minutes:25,mode,label,date:today()}).then(()=>notify("Focus session saved 🎯"));return 0}setMinutes(m=>m-1);return 59}return s-1})},1000);return()=>clearInterval(id)},[running,minutes,mode,label]);
  const reset=()=>{setRunning(false);setMinutes(25);setSeconds(0)};
  return <div><PageHead eyebrow="DEEP WORK • REST • REPEAT" title="Focus Timer" subtitle="Protect your attention and make focused time count."/>
    <div className="focus-layout"><section className="card timer-card"><div className="timer-mode"><button className={mode==="focus"?"active":""} onClick={()=>{setMode("focus");reset()}}>Focus</button><button className={mode==="break"?"active":""} onClick={()=>{setMode("break");reset()}}>Break</button></div><div className="timer-ring"><div><span>{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}</span><small>{mode==="focus"?"Stay in the zone":"Recharge"}</small></div></div><input className="timer-label" value={label} onChange={e=>setLabel(e.target.value)} placeholder="Session label"/><div className="timer-buttons"><button className="primary big-btn" onClick={()=>setRunning(!running)}>{running?"Pause":"Start session"}</button><button className="outline" onClick={reset}>Reset</button></div></section>
      <section className="card"><h3>Focus routine</h3><p className="muted">A simple rhythm for consistent deep work.</p><div className="routine"><div><b>25 min</b><span>Focus</span></div><ChevronRight/><div><b>5 min</b><span>Break</span></div><ChevronRight/><div><b>25 min</b><span>Focus</span></div></div><div className="tip"><ShieldCheck size={20}/><div><b>Protect your focus</b><p>Silence notifications and work on one clear outcome at a time.</p></div></div></section></div>
  </div>
}

function Analytics() {
  const [d,setD]=useState(null);

  useEffect(()=>{
    api.get("/analytics").then(r=>setD(r.data));
  },[]);

  if(!d) return <div className="loading-box">Loading analytics...</div>;

  const metrics=[
    ["Tasks completed",d.counts.completedTasks,"/ tasks",d.counts.tasks],
    ["Productivity",d.productivity,"% score",100],
    ["Goal progress",d.goalProgress,"% average",100],
    ["Focus time",Math.round(d.focusMinutes/60*10)/10,"hours",null]
  ];

  return (
    <div>
      <PageHead
        eyebrow="INSIGHTS • TRENDS • PERFORMANCE"
        title="Analytics"
        subtitle="Understand your patterns and keep improving."
      />

      <div className="analytics-grid">
        {metrics.map((m,i)=>(
          <div className="metric-card" key={i}>
            <span>{m[0]}</span>
            <strong>{m[1]}{m[2]}</strong>

            {m[3]!=null && (
              <div className="progress">
                <i style={{
                  width:`${Math.min(100,(m[1]/m[3])*100)}%`
                }}/>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="card wide">
          <h3>Productivity snapshot</h3>
          <div className="big-score">{d.productivity}%</div>
          <p className="muted">
            Based on completed tasks out of all tasks.
          </p>

          <div className="progress xl">
            <i style={{width:`${d.productivity}%`}}/>
          </div>
        </section>

        <section className="card">
          <h3>Financial snapshot</h3>

          <div className="money-big">
            ₹{Math.round(d.expenseTotal).toLocaleString("en-IN")}
          </div>

          <p className="muted">
            Total recorded expenses
          </p>

          <Link className="outline full" to="/expenses">
            Manage expenses
          </Link>
        </section>
      </div>
    </div>
  );
}

export default App;