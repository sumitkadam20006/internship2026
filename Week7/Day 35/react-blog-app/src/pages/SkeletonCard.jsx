function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ height: "auto", aspectRatio: "16 / 10", borderRadius: "0 0 0 0" }} />
      <div style={{ padding: "20px 20px 16px" }}>
        <div className="skeleton" style={{ width: 72, height: 22, borderRadius: 999, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 20, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 20, width: "68%", marginBottom: 14 }} />
        <div className="skeleton" style={{ height: 14, marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 14, marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "55%", marginBottom: 16 }} />

        <div className="skeleton" style={{ height: 1, marginBottom: 0, borderRadius: 0 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14 }}>
          <div className="skeleton" style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ height: 13, width: "45%", marginBottom: 4 }} />
            <div className="skeleton" style={{ height: 11, width: "60%" }} />
          </div>
        </div>

        <div className="skeleton" style={{ height: 1, marginTop: 14, marginBottom: 0, borderRadius: 0 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12 }}>
          <div className="skeleton" style={{ height: 14, width: 90 }} />
          <div style={{ display: "flex", gap: 2 }}>
            <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 8 }} />
            <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 8 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;