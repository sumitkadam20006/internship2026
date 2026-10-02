// Q8: ProductCard with title, price (formatted as currency), inStock
function ProductCard({ title, price, inStock }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", margin: "8px", borderRadius: "8px", display: "inline-block" }}>
      <h3>{title}</h3>
      <p>₹{price.toFixed(2)}</p>
      {!inStock && <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>}
    </div>
  );
}

function Q08_ProductCard() {
  return (
    <div>
      <ProductCard title="Wireless Mouse" price={499.0} inStock={true} />
      <ProductCard title="USB Hub" price={1299.0} inStock={false} />
      <ProductCard title="Keyboard" price={2499.0} inStock={true} />
    </div>
  );
}

export default Q08_ProductCard;
