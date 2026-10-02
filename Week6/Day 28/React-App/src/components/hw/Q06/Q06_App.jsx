// Q6: App renders Page, which renders Card (3-level component tree)
import Page from "./Page";

function Q06_App() {
  return (
    <div>
      <h2>App Component (root)</h2>
      <Page />
    </div>
  );
}

export default Q06_App;
