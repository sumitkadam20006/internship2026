import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../Common/FormInput";
import FormSelect from "../Common/FormSelect";
import FormCheckbox from "../Common/FormCheckbox";
import {
  EMAIL_REGEX, PASSWORD_REGEX, MOBILE_REGEX, AADHAAR_REGEX,
  PAN_REGEX, URL_REGEX, BLOOD_GROUPS, GENDERS, NATIONALITIES,
  MARITAL_STATUSES
} from "../Validation";

function PersonalInfo({ formData, onNext }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({ defaultValues: formData, mode: "onChange" });

  const bio = watch("shortBio", "");
  const color = watch("favoriteColor", "#6C63FF");
  const profilePic = watch("profilePicture");
  const password = watch("password");

  useEffect(() => {
    if (password) {
      trigger("confirmPassword");
    }
  }, [password, trigger]);

  function onSubmit(data) {
    onNext(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Information</h2>
      <p className="step-desc">Fill in your personal details below.</p>
      <div className="grid">
        <FormInput
          label="Full Name"
          name="fullName"
          register={register}
          error={errors.fullName}
          placeholder="Atharv Pote"
          validation={{ required: "Full Name is required" }}
          icon="👤"
        />
        <FormInput
          label="Username"
          name="username"
          register={register}
          error={errors.username}
          placeholder="atharv_pote"
          validation={{
            required: "Username is required",
            minLength: { value: 3, message: "Min 3 characters" }
          }}
          icon="🏷️"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
          placeholder="atharv@example.com"
          validation={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Invalid email format" }
          }}
          icon="✉️"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
          placeholder="••••••••"
          validation={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message: "Must be 8-20 chars with uppercase, lowercase, number & special character"
            }
          }}
          icon="🔒"
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          placeholder="••••••••"
          validation={{
            required: "Confirm Password is required",
            validate: value =>
              value === password || "Passwords do not match"
          }}
          icon="🔒"
        />
        <FormInput
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          register={register}
          error={errors.mobileNumber}
          placeholder="9876543210"
          validation={{
            required: "Mobile number is required",
            pattern: { value: MOBILE_REGEX, message: "Enter exactly 10 digits" }
          }}
          icon="📱"
        />
        <FormInput
          label="Alternate Mobile"
          type="tel"
          name="alternateMobile"
          register={register}
          error={errors.alternateMobile}
          placeholder="9876543210"
          validation={{
            pattern: { value: MOBILE_REGEX, message: "Enter exactly 10 digits" }
          }}
          icon="📞"
        />
        <FormInput
          label="Date of Birth"
          type="date"
          name="dob"
          register={register}
          error={errors.dob}
          validation={{ required: "Date of Birth is required" }}
          icon="🎂"
        />
        <FormSelect
          label="Gender"
          name="gender"
          options={GENDERS}
          register={register}
          error={errors.gender}
          validation={{ required: "Gender is required" }}
        />
        <FormSelect
          label="Blood Group"
          name="bloodGroup"
          options={BLOOD_GROUPS}
          register={register}
          placeholder="Select Blood Group"
        />
        <FormSelect
          label="Nationality"
          name="nationality"
          options={NATIONALITIES}
          register={register}
          error={errors.nationality}
          validation={{ required: "Nationality is required" }}
        />
        <FormSelect
          label="Marital Status"
          name="maritalStatus"
          options={MARITAL_STATUSES}
          register={register}
          error={errors.maritalStatus}
          validation={{ required: "Marital Status is required" }}
        />
        <FormInput
          label="Aadhaar Number"
          name="aadhaar"
          register={register}
          error={errors.aadhaar}
          placeholder="123456789012"
          validation={{
            required: "Aadhaar is required",
            pattern: { value: AADHAAR_REGEX, message: "Enter exactly 12 digits" }
          }}
          icon="🆔"
        />
        <FormInput
          label="PAN Number"
          name="pan"
          register={register}
          error={errors.pan}
          placeholder="ABCDE1234F"
          validation={{
            required: "PAN is required",
            pattern: { value: PAN_REGEX, message: "Invalid PAN format (e.g. ABCDE1234F)" }
          }}
          icon="💳"
        />
        <FormInput
          label="Personal Website"
          type="url"
          name="website"
          register={register}
          error={errors.website}
          placeholder="https://example.com"
          validation={{
            pattern: { value: URL_REGEX, message: "Invalid URL format" }
          }}
          icon="🌐"
        />
        <FormInput
          label="LinkedIn"
          type="url"
          name="linkedin"
          register={register}
          error={errors.linkedin}
          placeholder="https://linkedin.com/in/..."
          validation={{
            pattern: { value: URL_REGEX, message: "Invalid URL format" }
          }}
          icon="🔗"
        />
        <div className="input-group">
          <label>Favorite Color</label>
          <div className="color-wrapper">
            <input
              type="color"
              {...register("favoriteColor")}
            />
            <span className="color-value">{color}</span>
          </div>
        </div>
        <div className="input-group">
          <label>Profile Picture</label>
          <div className="file-wrapper">
            <label className="file-label">
              <span className="file-icon">📷</span>
              <span>Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) setValue("profilePicture", file);
                }}
                hidden
              />
            </label>
            {profilePic && (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Preview"
                className="preview-img"
              />
            )}
          </div>
        </div>
      </div>
      <div className="input-group full-width">
        <label>Short Bio</label>
        <div className="bio-wrapper">
          <textarea
            {...register("shortBio", {
              maxLength: { value: 200, message: "Bio cannot exceed 200 characters" }
            })}
            placeholder="Tell us a little about yourself..."
            rows={4}
          />
          <span className="char-counter">{bio.length}/200</span>
        </div>
        {errors.shortBio && <p className="error">{errors.shortBio.message}</p>}
      </div>
      <FormCheckbox
        label="I accept the Terms & Conditions"
        name="acceptTerms"
        register={register}
        error={errors.acceptTerms}
        validation={{ required: "You must accept the terms to continue" }}
      />
      <div className="btn-group">
        <button type="submit" className="btn-primary">
          Next →
        </button>
      </div>
    </form>
  );
}

export default PersonalInfo;
