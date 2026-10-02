function FormSelect({
  label,
  name,
  options,
  register,
  error,
  validation,
  placeholder
}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <select {...register(name, validation)}>
        <option value="">{placeholder || `Select ${label}`}</option>
        {options.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

export default FormSelect;
