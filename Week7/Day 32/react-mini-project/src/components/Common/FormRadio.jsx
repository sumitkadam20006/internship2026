function FormRadio({
  label,
  name,
  options,
  register,
  validation,
  error,
  horizontal
}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <div className={horizontal ? "radio-group-horizontal" : "radio-group-vertical"}>
        {options.map((item, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              value={item}
              {...register(name, validation)}
            />
            {item}
          </label>
        ))}
      </div>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

export default FormRadio;
