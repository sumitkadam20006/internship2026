function FormInput({
  label,
  type = "text",
  name,
  register,
  error,
  placeholder,
  validation,
  icon
}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <div className="input-icon-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={icon ? "has-icon" : ""}
          {...register(name, validation)}
        />
      </div>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

export default FormInput;
