// Q12: Badge with default prop value "New" using destructured default syntax
function Badge({ text = "New" }) {
  return <span style={{ background: "#28a745", color: "white", padding: "4px 8px", borderRadius: "4px", margin: "4px" }}>{text}</span>;
}

function Q12_DefaultBadge() {
  return (
    <div>
      <Badge text="Sale" />
      <Badge text="Hot" />
      <Badge /> {/* No props — uses default "New" */}
    </div>
  );
}

export default Q12_DefaultBadge;
