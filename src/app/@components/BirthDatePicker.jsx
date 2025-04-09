import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { dateAlert } from "../@customHooks/notificationAlert";

function BirthDatePicker({ name, label, required, placeholder }) {
  const {
    control,
    formState: { touchedFields, isSubmitted },
  } = useFormContext();

  const isValidAge = (dob) => {
    const today = dayjs();
    const age = today.diff(dob, "year");
    return age >= 22;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field, fieldState: { error, invalid, isTouched } }) => {
        // Field is considered empty if it's required and has no value
        const isFieldEmpty = required && !field.value;
        // Show error if: there's an error, field is empty and either touched or form submitted
        const showError =
          !!error || (isFieldEmpty && (touchedFields[name] || isSubmitted));

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              className="w-full"
              label={label}
              inputFormat="DD/MM/YYYY"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                if (date) {
                  const dob = dayjs(date);
                  if (isValidAge(dob)) {
                    field.onChange(dob.format("YYYY-MM-DD"));
                  } else {
                    dateAlert();
                    field.onChange(null);
                  }
                } else {
                  field.onChange(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="mt-8 mb-16 w-full"
                  required={required}
                  error={showError}
                  helperText={
                    error?.message ||
                    (showError ? "This field is required" : "")
                  }
                  placeholder={placeholder || "DD/MM/YYYY"}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  onBlur={field.onBlur} // Important to mark field as touched
                />
              )}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export default BirthDatePicker;
