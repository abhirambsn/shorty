const CustomInput = ({
  type,
  label,
  name,
  value,
  setValue,
  classList,
  placeholder = "",
  disabled = false,
  Icon = null,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>{label}</label>
      <div className={`flex items-center gap-1 w-full border border-gray-300 ${disabled && 'bg-gray-100'} rounded-lg p-2`}>
        {Icon && (<Icon className="h-5 w-5 text-gray-400" />)}
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          className={`outline-none w-full disabled:bg-transparent rounded-lg ${classList}`}
        />
      </div>
    </div>
  );
};

export default CustomInput;
