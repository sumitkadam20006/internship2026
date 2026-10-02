function FormCheckbox({
  label,
  name,
  register,
  validation,
  error
}) {
  return (
    <div className="input-group checkbox-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          {...register(name, validation)}
        />
        <span className="checkbox-custom" />
        {label}
      </label>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

export default FormCheckbox;
