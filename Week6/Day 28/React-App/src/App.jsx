import Q01_Welcome from './components/hw/Q01_Welcome';
import Q02_FixedJSX from './components/hw/Q02_FixedJSX';
import Q03_FruitList from './components/hw/Q03_FruitList';
import Q04_Conditional from './components/hw/Q04_Conditional';
import Q05_Naming from './components/hw/Q05_Naming';
import Q06_App from './components/hw/Q06/Q06_App';
import Q07_Badge from './components/hw/Q07_Badge';
import Q08_ProductCard from './components/hw/Q08_ProductCard';
import Q09_MovieList from './components/hw/Q09_MovieList';
import Q10_ButtonWithCallback from './components/hw/Q10_ButtonWithCallback';
import Q11_PropsMutate from './components/hw/Q11_PropsMutate';
import Q12_DefaultBadge from './components/hw/Q12_DefaultBadge';
import Q13_PropTypesDemo from './components/hw/Q13_PropTypesDemo';
import Q14_Counter from './components/hw/Q14_Counter';
import Q15_ToggleSwitch from './components/hw/Q15_ToggleSwitch';
import Q16_ControlledInput from './components/hw/Q16_ControlledInput';
import Q17_TaskList from './components/hw/Q17_TaskList';
import Q18_StarRating from './components/hw/Q18_StarRating';
import Q19_LikeableCard from './components/hw/Q19_LikeableCard';
import Q20_Batching from './components/hw/Q20_Batching';

function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '8px' }}>React Homework — All 20 Questions</h1>

      <section style={{ marginBottom: '32px' }}><h2>Q1 — Welcome</h2><Q01_Welcome /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q2 — Fixed JSX</h2><Q02_FixedJSX /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q3 — Fruit List</h2><Q03_FruitList /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q4 — Conditional</h2><Q04_Conditional /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q5 — Naming</h2><Q05_Naming /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q6 — 3-Level Component Tree</h2><Q06_App /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q7 — Badge</h2><Q07_Badge /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q8 — ProductCard</h2><Q08_ProductCard /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q9 — MovieList (spread)</h2><Q09_MovieList /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q10 — Callback Prop</h2><Q10_ButtonWithCallback /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q11 — Props Mutate Bug</h2><Q11_PropsMutate /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q12 — DefaultBadge</h2><Q12_DefaultBadge /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q13 — PropTypes</h2><Q13_PropTypesDemo /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q14 — Counter</h2><Q14_Counter /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q15 — ToggleSwitch</h2><Q15_ToggleSwitch /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q16 — ControlledInput</h2><Q16_ControlledInput /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q17 — TaskList</h2><Q17_TaskList /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q18 — StarRating</h2><Q18_StarRating /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q19 — LikeableCard</h2><Q19_LikeableCard /></section>
      <section style={{ marginBottom: '32px' }}><h2>Q20 — Batching</h2><Q20_Batching /></section>
    </div>
  );
}

export default App;
