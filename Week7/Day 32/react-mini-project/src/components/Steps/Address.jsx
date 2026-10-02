import { useForm } from "react-hook-form";
import FormInput from "../Common/FormInput";
import FormSelect from "../Common/FormSelect";
import FormRadio from "../Common/FormRadio";
import {
  PINCODE_REGEX, COUNTRIES, INDIAN_STATES, ADDRESS_TYPES
} from "../Validation";

function Address({ formData, onNext, onPrev }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues: formData, mode: "onChange" });

  function onSubmit(data) {
    onNext(data);
  }

  function handlePrev() {
    onPrev(getValues());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Address Details</h2>
      <p className="step-desc">Enter your current residential address.</p>
      <div className="grid">
        <FormInput
          label="Address Line 1"
          name="addressLine1"
          register={register}
          error={errors.addressLine1}
          placeholder="House / Flat / Street"
          validation={{
            required: "Address Line 1 is required",
            minLength: { value: 10, message: "Must be at least 10 characters" }
          }}
          icon="📍"
        />
        <FormInput
          label="Address Line 2"
          name="addressLine2"
          register={register}
          error={errors.addressLine2}
          placeholder="Area / Locality"
          icon="📍"
        />
        <FormInput
          label="Landmark"
          name="landmark"
          register={register}
          error={errors.landmark}
          placeholder="Nearby landmark"
          icon="🏛️"
        />
        <FormInput
          label="Pincode"
          name="pincode"
          register={register}
          error={errors.pincode}
          placeholder="400001"
          validation={{
            required: "Pincode is required",
            pattern: { value: PINCODE_REGEX, message: "Enter exactly 6 digits" }
          }}
          icon="📮"
        />
        <FormSelect
          label="Country"
          name="country"
          options={COUNTRIES}
          register={register}
          error={errors.country}
          validation={{ required: "Country is required" }}
        />
        <FormSelect
          label="State"
          name="state"
          options={INDIAN_STATES}
          register={register}
          error={errors.state}
          validation={{ required: "State is required" }}
        />
        <FormInput
          label="City"
          name="city"
          register={register}
          error={errors.city}
          placeholder="Mumbai"
          validation={{ required: "City is required" }}
          icon="🏙️"
        />
        <FormRadio
          label="Address Type"
          name="addressType"
          options={ADDRESS_TYPES}
          register={register}
          error={errors.addressType}
          validation={{ required: "Select an address type" }}
          horizontal
        />
      </div>
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

export default Address;
