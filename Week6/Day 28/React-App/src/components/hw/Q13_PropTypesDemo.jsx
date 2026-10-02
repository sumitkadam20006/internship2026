// Q13: PropTypes validation for ProductCard
import PropTypes from "prop-types";

function ProductCard({ title, price, inStock }) {
  const formattedPrice = typeof price === "number" ? `₹${price.toFixed(2)}` : `₹${price}`;
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", margin: "8px", borderRadius: "8px", display: "inline-block" }}>
      <h3>{title}</h3>
      <p>{formattedPrice}</p>
      {!inStock && <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>}
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  inStock: PropTypes.bool,
};

function Q13_PropTypesDemo() {
  return (
    <div>
      <ProductCard title="Valid Mouse" price={599} inStock={true} />
      {/* Deliberate wrong type: price="free" (string instead of number) — check console for PropTypes warning */}
      <ProductCard title="Wrong Type" price="free" inStock={false} />
    </div>
  );
}

export default Q13_PropTypesDemo;
