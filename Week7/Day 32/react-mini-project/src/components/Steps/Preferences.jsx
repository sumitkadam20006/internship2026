import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRadio from "../Common/FormRadio";
import FormSelect from "../Common/FormSelect";
import {
  THEMES, LANGUAGES, COMMUNICATION_PREFS, INTERESTS,
  PRIVACY_OPTIONS, CONTACT_METHODS, NEWSLETTER_OPTIONS
} from "../Validation";

function Preferences({ formData, onNext, onPrev }) {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: formData, mode: "onChange" });

  const [hobbies, setHobbies] = useState(formData.hobbies || []);
  const [hobbyInput, setHobbyInput] = useState("");

  const watchTheme = watch("theme", "System");
  const watchLanguages = watch("languagesKnown", []);
  const watchInterests = watch("interests", []);
  const watchContact = watch("preferredContact", "");

  function addHobby() {
    const trimmed = hobbyInput.trim();
    if (!trimmed) return;
    if (hobbies.includes(trimmed)) return;
    setHobbies([...hobbies, trimmed]);
    setHobbyInput("");
  }

  function removeHobby(idx) {
    setHobbies(hobbies.filter((_, i) => i !== idx));
  }

  function onSubmit(data) {
    onNext({ ...data, hobbies });
  }

  function handlePrev() {
    const formValues = getValues();
    onPrev({ ...formValues, hobbies });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Preferences & Settings</h2>
      <p className="step-desc">Customize your experience and communication preferences.</p>

      <section className="section-card summary-card">
        <h3 className="section-title">📊 Preferences Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Theme</span>
            <span className="summary-value">{watchTheme}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Languages</span>
            <span className="summary-value">{watchLanguages.length} selected</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Interests</span>
            <span className="summary-value">{watchInterests.length} selected</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Hobbies</span>
            <span className="summary-value">{hobbies.length} added</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Contact Method</span>
            <span className="summary-value">{watchContact || "Not set"}</span>
          </div>
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">🎨 Theme</h3>
        <FormRadio
          label="Application Theme"
          name="theme"
          options={THEMES}
          register={register}
          horizontal
        />
      </section>

      <section className="section-card">
        <h3 className="section-title">🌐 Languages Known</h3>
        <div className="checkbox-grid">
          {LANGUAGES.map(lang => (
            <label key={lang} className="checkbox-label">
              <input
                type="checkbox"
                value={lang}
                {...register("languagesKnown", {
                  validate: value => (value && value.length > 0) || "Select at least one language"
                })}
              />
              {lang}
            </label>
          ))}
        </div>
        {errors.languagesKnown && <p className="error">{errors.languagesKnown.message}</p>}
      </section>

      <section className="section-card">
        <h3 className="section-title">🔔 Communication Preferences</h3>
        <div className="checkbox-grid">
          {COMMUNICATION_PREFS.map(pref => (
            <label key={pref} className="checkbox-label">
              <input
                type="checkbox"
                value={pref}
                {...register("notifications")}
              />
              {pref}
            </label>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">⭐ Interests</h3>
        <div className="checkbox-grid">
          {INTERESTS.map(interest => (
            <label key={interest} className="checkbox-label">
              <input
                type="checkbox"
                value={interest}
                {...register("interests", {
                  validate: value => (value && value.length > 0) || "Select at least one interest"
                })}
              />
              {interest}
            </label>
          ))}
        </div>
        {errors.interests && <p className="error">{errors.interests.message}</p>}
      </section>

      <section className="section-card">
        <h3 className="section-title">🎯 Hobbies</h3>
        <div className="skills-wrapper">
          <div className="skills-input-row">
            <input
              type="text"
              placeholder="e.g. Photography, Gaming..."
              value={hobbyInput}
              onChange={e => setHobbyInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addHobby(); } }}
            />
            <button type="button" className="btn-add" onClick={addHobby}>
              + Add Hobby
            </button>
          </div>
          {hobbies.length > 0 && (
            <div className="skill-chips">
              {hobbies.map((hobby, idx) => (
                <span key={idx} className="skill-chip">
                  {hobby}
                  <button type="button" className="chip-remove" onClick={() => removeHobby(idx)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
          {hobbies.length === 0 && (
            <p className="empty-hint">No hobbies added yet. Type a hobby and click "Add Hobby".</p>
          )}
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">🔒 Privacy Settings</h3>
        <div className="checkbox-grid">
          {PRIVACY_OPTIONS.map(option => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                value={option}
                {...register("privacySettings")}
              />
              {option}
            </label>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h3 className="section-title">📬 Newsletter</h3>
        <FormRadio
          label="Subscribe to Newsletter"
          name="newsletter"
          options={NEWSLETTER_OPTIONS}
          register={register}
          horizontal
        />
      </section>

      <section className="section-card">
        <h3 className="section-title">📞 Preferred Contact Method</h3>
        <FormSelect
          label="Contact Method"
          name="preferredContact"
          options={CONTACT_METHODS}
          register={register}
          error={errors.preferredContact}
          validation={{ required: "Preferred contact method is required" }}
          placeholder="Select a contact method"
        />
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

export default Preferences;
