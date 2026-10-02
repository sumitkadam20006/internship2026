// Q7: Badge component with text prop, rendered 3 times from parent
function Badge({ text }) {
  return <span style={{ background: "#007bff", color: "white", padding: "4px 8px", borderRadius: "4px", margin: "4px" }}>{text}</span>;
}

function Q07_Badge() {
  return (
    <div>
      <Badge text="Alpha" />
      <Badge text="Beta" />
      <Badge text="Gamma" />
    </div>
  );
}

export default Q07_Badge;
