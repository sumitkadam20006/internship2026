// Q5: Lowercase 'footer' is treated as an HTML element by React, not a custom component.
// Using PascalCase 'Footer' tells React to treat it as a custom component.
// The fix: rename footer() → Footer()

function Footer() {
  return <footer>Correct PascalCase naming renders as a component</footer>;
}

function Q05_Naming() {
  return (
    <div>
      <h3>Rendering &lt;Footer /&gt; (PascalCase):</h3>
      <Footer />
      <p>React treats lowercase tags as HTML elements. So &lt;footer /&gt; would render the native &lt;footer&gt; HTML element instead of a component. Using PascalCase tells React this is a custom component.</p>
    </div>
  );
}

export default Q05_Naming;
