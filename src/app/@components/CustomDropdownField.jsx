import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function CustomDropdownField({
  name,
  options,
  label,
  onChange: customOnChange,
  optionLabelFormat = (option) => option.name,
  fullWidth = true,
  className = "mt-8 mb-16 w-full",
  inputLabelProps = {},
  required = false,
  ...props
}) {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const selectedOption = value
            ? options.find((option) => option.id === value)
            : null;
          const isFieldEmpty = required && !value; // Check if the field is required and empty

          return (
            <Autocomplete
              className={className}
              freeSolo
              value={selectedOption}
              options={options}
              getOptionLabel={(option) => optionLabelFormat(option)}
              onChange={(event, newValue) => {
                onChange(newValue?.id);

                if (customOnChange) customOnChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="mt-16 w-full"
                  required={required}
                  placeholder={`Select ${label}`}
                  label={label}
                  helperText={error ? error.message : ""}
                  variant="outlined"
                  InputLabelProps={
                    isFieldEmpty
                      ? { style: { color: "red" }, ...inputLabelProps }
                      : { shrink: true, ...inputLabelProps }
                  }
                  fullWidth={fullWidth}
                  error={!!error}
                  {...props}
                />
              )}
            />
          );
        }}
      />
    </div>
  );
}

export default CustomDropdownField;
