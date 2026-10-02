import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../Common/FormInput";
import FormSelect from "../Common/FormSelect";
import FormRadio from "../Common/FormRadio";
import {
  HIGHEST_QUALIFICATIONS, DEGREES, BRANCHES, CURRENT_STATUSES
} from "../Validation";

const currentYear = new Date().getFullYear();

function Education({ formData, onNext, onPrev }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues: formData, mode: "onChange" });

  const [skills, setSkills] = useState(formData.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [certifications, setCertifications] = useState(formData.certifications || []);
  const [certName, setCertName] = useState("");
  const [certOrg, setCertOrg] = useState("");
  const [certYear, setCertYear] = useState("");

  function addSkill() {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) return;
    setSkills([...skills, trimmed]);
    setSkillInput("");
  }

  function removeSkill(idx) {
    setSkills(skills.filter((_, i) => i !== idx));
  }

  function addCertification() {
    if (!certName.trim() || !certOrg.trim() || !certYear.trim()) return;
    setCertifications([
      ...certifications,
      { name: certName.trim(), organization: certOrg.trim(), year: certYear.trim() }
    ]);
    setCertName("");
    setCertOrg("");
    setCertYear("");
  }

  function removeCertification(idx) {
    setCertifications(certifications.filter((_, i) => i !== idx));
  }

  function onSubmit(data) {
    onNext({ ...data, skills, certifications });
  }

  function handlePrev() {
    const formValues = getValues();
    onPrev({ ...formValues, skills, certifications });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Education & Skills</h2>
      <p className="step-desc">Tell us about your academic background and technical skills.</p>

      <section className="section-card">
        <h3 className="section-title">🎓 Education</h3>
        <div className="grid">
          <FormSelect
            label="Highest Qualification"
            name="highestQualification"
            options={HIGHEST_QUALIFICATIONS}
            register={register}
            error={errors.highestQualification}
            validation={{ required: "Highest Qualification is required" }}
          />
          <FormInput
            label="College / University Name"
            name="collegeName"
            register={register}
            error={errors.collegeName}
            placeholder="e.g. IIT Bombay"
            validation={{ required: "College / University name is required" }}
            icon="🏛️"
          />
          <FormSelect
            label="Degree"
            name="degree"
            options={DEGREES}
            register={register}
            error={errors.degree}
            validation={{ required: "Degree is required" }}
          />
          <FormSelect
            label="Branch / Specialization"
            name="branch"
            options={BRANCHES}
            register={register}
            error={errors.branch}
            validation={{ required: "Branch is required" }}
          />
          <FormInput
            label="Passing Year"
            type="number"
            name="passingYear"
            register={register}
            error={errors.passingYear}
            placeholder="e.g. 2024"
            validation={{
              required: "Passing year is required",
              min: { value: 1980, message: "Year must be 1980 or later" },
              max: { value: currentYear, message: `Year cannot exceed ${currentYear}` }
            }}
            icon="📅"
          />
          <FormInput
            label="CGPA / Percentage"
            name="cgpa"
            register={register}
            error={errors.cgpa}
            placeholder="e.g. 8.75 or 87%"
            validation={{
              required: "CGPA or Percentage is required",
              validate: value => {
                const cleaned = value.replace(/\s*%$/, "");
                const num = parseFloat(cleaned);
                if (isNaN(num)) return "Enter a valid number";
                if (num < 0 || num > 100) return "Value must be between 0 and 100";
                return true;
              }
            }}
            icon="📊"
          />
          <div className="full-width">
            <FormRadio
              label="Current Status"
              name="currentStatus"
              options={CURRENT_STATUSES}
              register={register}
              error={errors.currentStatus}
              validation={{ required: "Current status is required" }}
              horizontal
            />
          </div>
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">🛠️ Skills</h3>
        <div className="skills-wrapper">
          <div className="skills-input-row">
            <input
              type="text"
              placeholder="e.g. React, Node.js, Python..."
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            />
            <button type="button" className="btn-add" onClick={addSkill}>
              + Add Skill
            </button>
          </div>
          {skills.length > 0 && (
            <div className="skill-chips">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => removeSkill(idx)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
          {skills.length === 0 && (
            <p className="empty-hint">No skills added yet. Type a skill and click "Add Skill".</p>
          )}
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">📜 Certifications</h3>
        <div className="cert-form">
          <div className="cert-form-grid">
            <input
              type="text"
              placeholder="Certification Name"
              value={certName}
              onChange={e => setCertName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Organization"
              value={certOrg}
              onChange={e => setCertOrg(e.target.value)}
            />
            <input
              type="number"
              placeholder="Year"
              value={certYear}
              onChange={e => setCertYear(e.target.value)}
            />
          </div>
          <button type="button" className="btn-add" onClick={addCertification}>
            + Add Certification
          </button>
        </div>
        {certifications.length > 0 && (
          <div className="cert-cards">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-card-body">
                  <h4>{cert.name}</h4>
                  <p>{cert.organization} &middot; {cert.year}</p>
                </div>
                <button
                  type="button"
                  className="cert-remove"
                  onClick={() => removeCertification(idx)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="btn-group">
        <button type="button" className="btn-secondary btn-prev" onClick={handlePrev}>
          ← Previous
        </button>
        <button type="submit" className="btn-primary">
          Next →
        </button>
      </div>
    </form>
  );
}

export default Education;
