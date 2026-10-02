import { useState, useMemo } from "react";

function Review({ formData, onPrev, goToStep, onReset }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const regId = useMemo(
    () => `REG-${Date.now()}-${String(Math.random()).slice(2, 6)}`,
    []
  );

  function required(label, value) {
    if (!value || (Array.isArray(value) && value.length === 0)) return false;
    if (typeof value === "string" && !value.trim()) return false;
    return true;
  }

  function validateAll() {
    const missing = [];
    if (!required("Full Name", formData.fullName)) missing.push("Personal Info");
    if (!required("Address Line 1", formData.addressLine1)) missing.push("Address");
    if (!required("Highest Qualification", formData.highestQualification)) missing.push("Education");
    if (!required("Languages", formData.languagesKnown)) missing.push("Preferences - Languages");
    if (!required("Interests", formData.interests)) missing.push("Preferences - Interests");
    if (!required("Preferred Contact", formData.preferredContact)) missing.push("Preferences - Contact Method");
    return missing;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const missing = validateAll();
    if (missing.length > 0) {
      setError(`Please complete the following sections: ${missing.join(", ")}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitted(true);
    setError("");
  }

  function handlePrint() {
    window.print();
  }

  if (submitted) {
    return (
      <div className="success-screen">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Registration Successful</h2>
        <p className="success-subtitle">
          Thank you for registering, <strong>{formData.fullName || "User"}</strong>!
        </p>
        <div className="success-id">
          <span className="id-label">Registration ID</span>
          <span className="id-value">{regId}</span>
        </div>
        <div className="success-actions">
          <button className="btn-primary" onClick={onReset}>
            Register Another User
          </button>
          <button className="btn-secondary" onClick={() => goToStep(1)}>
            Go to Step 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Review & Submit</h2>
      <p className="step-desc">
        Please review all your information before submitting.
      </p>

      {error && <div className="review-error">{error}</div>}

      <section className="section-card summary-card">
        <h3 className="section-title">📊 Registration Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Completed Steps</span>
            <span className="summary-value">4 / 4</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Skills</span>
            <span className="summary-value">{(formData.skills || []).length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Languages</span>
            <span className="summary-value">{(formData.languagesKnown || []).length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Interests</span>
            <span className="summary-value">{(formData.interests || []).length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Certifications</span>
            <span className="summary-value">{(formData.certifications || []).length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Theme</span>
            <span className="summary-value">{formData.theme || "System"}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Contact Method</span>
            <span className="summary-value">{formData.preferredContact || "Not set"}</span>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="section-card review-card">
        <div className="review-header">
          <h3 className="section-title">👤 Personal Information</h3>
          <button type="button" className="edit-btn" onClick={() => goToStep(1)}>
            ✏ Edit
          </button>
        </div>
        <div className="review-grid">
          <Field label="Full Name" value={formData.fullName} />
          <Field label="Username" value={formData.username} />
          <Field label="Email" value={formData.email} />
          <Field label="Mobile Number" value={formData.mobileNumber} />
          <Field label="Alternate Mobile" value={formData.alternateMobile || "—"} />
          <Field label="Date of Birth" value={formData.dob} />
          <Field label="Gender" value={formData.gender} />
          <Field label="Blood Group" value={formData.bloodGroup || "—"} />
          <Field label="Nationality" value={formData.nationality} />
          <Field label="Marital Status" value={formData.maritalStatus} />
          <Field label="Aadhaar Number" value={formData.aadhaar} />
          <Field label="PAN Number" value={formData.pan} />
          <Field label="Website" value={formData.website || "—"} />
          <Field label="LinkedIn" value={formData.linkedin || "—"} />
          <Field label="Favorite Color" value={formData.favoriteColor} isColor />
          <Field label="Profile Picture" value={formData.profilePicture} isImage />
        </div>
        <div className="review-full">
          <span className="review-label">Short Bio</span>
          <p className="review-value bio-text">{formData.shortBio || "—"}</p>
        </div>
      </section>

      {/* Address */}
      <section className="section-card review-card">
        <div className="review-header">
          <h3 className="section-title">🏠 Address</h3>
          <button type="button" className="edit-btn" onClick={() => goToStep(2)}>
            ✏ Edit
          </button>
        </div>
        <div className="review-grid">
          <Field label="Address Line 1" value={formData.addressLine1} />
          <Field label="Address Line 2" value={formData.addressLine2 || "—"} />
          <Field label="Landmark" value={formData.landmark || "—"} />
          <Field label="City" value={formData.city} />
          <Field label="State" value={formData.state} />
          <Field label="Country" value={formData.country} />
          <Field label="Pincode" value={formData.pincode} />
          <Field label="Address Type" value={formData.addressType || "—"} />
        </div>
      </section>

      {/* Education */}
      <section className="section-card review-card">
        <div className="review-header">
          <h3 className="section-title">🎓 Education & Skills</h3>
          <button type="button" className="edit-btn" onClick={() => goToStep(3)}>
            ✏ Edit
          </button>
        </div>
        <div className="review-grid">
          <Field label="Highest Qualification" value={formData.highestQualification} />
          <Field label="College / University" value={formData.collegeName} />
          <Field label="Degree" value={formData.degree} />
          <Field label="Branch" value={formData.branch} />
          <Field label="Passing Year" value={formData.passingYear} />
          <Field label="CGPA / Percentage" value={formData.cgpa} />
          <Field label="Current Status" value={formData.currentStatus} />
        </div>
        <div className="review-section">
          <span className="review-label">Skills</span>
          <div className="skill-chips review-chips">
            {(formData.skills || []).length > 0
              ? formData.skills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
        <div className="review-section">
          <span className="review-label">Certifications</span>
          <div className="cert-cards">
            {(formData.certifications || []).length > 0
              ? formData.certifications.map((c, i) => (
                  <div key={i} className="cert-card">
                    <div className="cert-card-body">
                      <h4>{c.name}</h4>
                      <p>{c.organization} &middot; {c.year}</p>
                    </div>
                  </div>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="section-card review-card">
        <div className="review-header">
          <h3 className="section-title">⚙ Preferences</h3>
          <button type="button" className="edit-btn" onClick={() => goToStep(4)}>
            ✏ Edit
          </button>
        </div>
        <div className="review-grid">
          <Field label="Theme" value={formData.theme || "System"} />
          <Field label="Newsletter" value={formData.newsletter || "—"} />
          <Field label="Contact Method" value={formData.preferredContact || "—"} />
        </div>
        <div className="review-section">
          <span className="review-label">Languages Known</span>
          <div className="skill-chips review-chips">
            {(formData.languagesKnown || []).length > 0
              ? formData.languagesKnown.map((l, i) => (
                  <span key={i} className="skill-chip">{l}</span>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
        <div className="review-section">
          <span className="review-label">Notifications</span>
          <div className="skill-chips review-chips">
            {(formData.notifications || []).length > 0
              ? formData.notifications.map((n, i) => (
                  <span key={i} className="skill-chip">{n}</span>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
        <div className="review-section">
          <span className="review-label">Interests</span>
          <div className="skill-chips review-chips">
            {(formData.interests || []).length > 0
              ? formData.interests.map((t, i) => (
                  <span key={i} className="skill-chip">{t}</span>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
        <div className="review-section">
          <span className="review-label">Hobbies</span>
          <div className="skill-chips review-chips">
            {(formData.hobbies || []).length > 0
              ? formData.hobbies.map((h, i) => (
                  <span key={i} className="skill-chip">{h}</span>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
        <div className="review-section">
          <span className="review-label">Privacy Settings</span>
          <div className="skill-chips review-chips">
            {(formData.privacySettings || []).length > 0
              ? formData.privacySettings.map((p, i) => (
                  <span key={i} className="skill-chip">{p}</span>
                ))
              : <span className="review-value">—</span>}
          </div>
        </div>
      </section>

      <div className="btn-group">
        <button type="button" className="btn-secondary btn-prev" onClick={onPrev}>
          ← Previous
        </button>
        <button type="button" className="btn-secondary" onClick={handlePrint}>
          🖨️ Print
        </button>
        <button type="submit" className="btn-primary">
          ✅ Submit Registration
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, isColor, isImage }) {
  return (
    <div className="review-item">
      <span className="review-label">{label}</span>
      {isColor ? (
        <span className="review-value review-color">
          <span className="color-swatch" style={{ background: value || "#ccc" }} />
          {value || "—"}
        </span>
      ) : isImage ? (
        <div className="review-value">
          {value instanceof File ? (
            <img
              src={URL.createObjectURL(value)}
              alt="Profile"
              className="review-img"
            />
          ) : (
            <span>—</span>
          )}
        </div>
      ) : (
        <span className="review-value">{value || "—"}</span>
      )}
    </div>
  );
}

export default Review;
