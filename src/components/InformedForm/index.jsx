import { useForm, useField } from "informed";
import React from "react";
import Select from "react-select";


export const InformedReactSelect = (props) => {
  const { fieldState, fieldApi, userProps, ref } = useField(props);

  const { showError, value, error } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  const { id, options, placeholder, ...rest } = userProps;

  const selectedValue =
    options.find((option) => option.value === value) || placeholder;

  const handleChange = (selectedOption) => {
    setValue(selectedOption?.value);
    setError(null);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="w-full flex flex-col gap-2 relative">
      {props.label && (
        <label htmlFor={id} className="text-14 leading-5 font-medium">
          {props.label}
        </label>
      )}
      <Select
        inputId={id}
        ref={ref}
        options={options}
        value={selectedValue}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        isSearchable={false}
        classNames={{
          indicatorSeparator: () => `!hidden`,
          placeholder: () =>
            `!text-secondary !font-normal !text-14 !leading-25`,
          control: ({ isFocused }) =>
            `!bg-white !border-[#D1D5DB] !p-2 font-medium !rounded-lg !shadow-none !min-h-[42px] `,
          indicatorsContainer: () =>
            `[&>div]:!text-secondary text-14 [&>div:hover]:!text-secondary font-semibold`,
          valueContainer: () =>
            `!text-secondary !font-normal !text-14 !leading-25`,
          menu: () => `!rounded-3 overflow-hidden`,
          option: ({ isDisabled, isFocused, isSelected }) =>
            `!rounded-none ${isSelected ? "!bg-primary" : ""}`,
        }}
        {...rest}
      />
      {showError && (
        <span className="text-danger absolute text-12 top-full left-0">{error}</span>
      )}
    </div>
  );
};

export const InformedTextArea = (props) => {
  const { fieldState, fieldApi, userProps, ref } = useField(props);

  const { showError, value, error } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  const { id, placeholder, ...rest } = userProps;

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(null);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="w-full flex flex-col gap-2 relative">
      {props.label && (
        <label htmlFor={id} className="text-14 leading-5 font-medium">
          {props.label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        value={value || ""}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className="!bg-white !border-[#D1D5DB] outline-none !p-2 font-medium !rounded-lg !shadow-none !min-h-[84px] w-full border"
        {...rest}
      />
      {showError && (
        <span className="text-danger absolute -bottom-5 left-0">{error}</span>
      )}
    </div>
  );
};

export const InformedNumberInput = (props) => {
  const { fieldState, fieldApi, userProps, ref } = useField(props);

  const { showError, value, error } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  const { id, placeholder, min, max, step = 0.5, ...rest } = userProps;

  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
    setError(null);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleAdjust = (amount) => {
    const currentValue = parseFloat(value) || 0;

    let newValue = currentValue + amount;

    if (newValue < min) {
      newValue = min;
    }
    if (newValue > max) {
      newValue = max;
    }

    setValue(newValue);
    setTouched(true);
  };

  return (
    <div className="w-full flex flex-col gap-2 relative">
      {props.label && (
        <label htmlFor={id} className="text-14 leading-5 font-medium">
          {props.label}
        </label>
      )}
      <div className="flex items-center !bg-white border !border-[#D1D5DB] font-medium !rounded-lg overflow-hidden    ">
        <button
          onClick={() => handleAdjust(-step)}
          type="button"
          className="p-3 bg-[#F3F4F6] hover:bg-[#dedfe0] border-r border-r-[#D1D5DB]"
        >
          -
        </button>

        <input
          type="number"
          min={min}
          max={max}
          step={step}
          ref={ref}
          id={id}
          value={value || ""}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2 text-14 font-medium text-center leading-5 !shadow-none"
          {...rest}
        />
        <button
          onClick={() => handleAdjust(step)}
          className="p-3 bg-[#F3F4F6] hover:bg-[#dedfe0] border-l border-l-[#D1D5DB]"
        >
          +
        </button>
      </div>

      {showError && (
        <span className="text-danger absolute -bottom-5 left-0">{error}</span>
      )}
    </div>
  );
};
