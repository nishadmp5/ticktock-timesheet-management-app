import { useForm, useField } from "informed";
import React from "react";
import Select from "react-select";

export const InformedForm = ({ children, ...rest }) => {
  const { formController, render, userProps } = useForm({ ...rest });
  return render(
    <form
      noValidate
      {...userProps}
      onReset={formController.reset}
      onSubmit={formController.submitForm}
    >
      {children}
    </form>
  );
};

export const InformedReactSelect = (props) => {
  const { fieldState, fieldApi, userProps, ref } = useField(props);

  const { showError, value, error } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  const { id, options, placeholder, ...rest } = userProps;

  const selectedValue =
    options.find((option) => option.value === value) || placeholder;

  const handleChange = (selectedOption) => {
    fieldApi.setValue(selectedOption?.value);
    setError(null);
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
        isSearchable={false}
        classNames={{
          indicatorSeparator: () => `!hidden`,
          placeholder: () => `!text-secondary !font-normal !text-14 !leading-25`,
          control: ({ isFocused }) =>
            `!bg-white !border-[#D1D5DB] !p-2 font-medium !rounded-lg !shadow-none !min-h-[42px] `,
          indicatorsContainer: () =>
            `[&>div]:!text-secondary text-14 [&>div:hover]:!text-secondary font-semibold`,
          valueContainer: () => `!text-secondary !font-normal !text-14 !leading-25`,
          menu: () => `!rounded-3 overflow-hidden`,
          option: ({ isDisabled, isFocused, isSelected }) =>
            `!rounded-none ${isSelected ? "!bg-primary" : ""}`,
        }}
      />
      {showError && (
        <span className="text-danger absolute -bottom-5 left-0">
          {fieldState.error}
        </span>
      )}
    </div>
  );
};
