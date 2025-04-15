import { Autocomplete, Icon, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import fillUnderscoreBySpace from "src/app/@helpers/fillUnderscoreBySpace"; // Helper to format label text by replacing underscores with spaces

// Styles for component
const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#fffffff",
    height: "30px",
    width: "fit-content",
    margin: "10px 5px",
    "& .selectLabel": {
      cursor: "pointer",
      overflow: "hidden",
      transition: "0.3s",
      color: "#fffffff",
      whiteSpace: "nowrap",
    },
    "& .selectOpenIcon": {
      fontSize: "18px",
      overflow: "hidden",
    },
    "& .selectField": {
      overflow: "hidden",
      transition: "0.3s",
      "& .endAdornment": {
        "& > button": {
          color: "#fffffff",
        },
      },
      "& .textFieldUnderSelect": {
        "& > div": {
          color: "#fffffff",
          "&::before": {
            borderColor: "#fffffff",
          },
        },
      },
    },
    "& .icon": {
      fontSize: "20px",
    },
  },
}));

// Main Component
function ReportSelectPassenger({
  name,
  label,
  options = [],
  icon,
  width,
  setReRender,
  onEnter = () => null,
  getOptionLabel = (option) => option.name,
}) {
  const classes = useStyles();

  // React Hook Form context and methods
  const methods = useFormContext();
  const { getValues, setValue, control, watch, trigger } = methods;
  const values = getValues();

  // Track focus state for display logic
  const isFocused = values[`${name}Focused`];

  // State for label display
  const [Label] = useState(label || fillUnderscoreBySpace(name));

  // Watch the values of specific fields in the form
  const fieldValue = watch(name);
  const fieldNameValue = watch(`${name}Name`);

  // Effect to handle resetting values when fieldValue changes to null
  useEffect(() => {
    if (!fieldValue) {
      setValue(`${name}Name`, "");
      setValue(`${name}Focused`, false);
      trigger(name); // Trigger validation on the field

      // Optionally trigger re-render if needed
      if (setReRender) {
        setReRender(Math.random());
      }
    }
  }, [fieldValue, setValue, name, trigger, setReRender]);

  return (
    <div className={classes.fieldContainer}>
      <Icon>{icon}</Icon>

      {/* Display Label or Autocomplete based on focus */}
      <div
        className="selectLabel"
        // style={{
        //   width: isFocused ? '0px' : width,
        //   margin: isFocused ? '0px' : '2px 5px 0px 10px',
        // }}
        onClick={() => {
          setValue(`${name}Focused`, true);
          setReRender(Math.random());

          // Set focus to Autocomplete input after a delay
          setTimeout(
            () => document.getElementById(`${name}groupEl`)?.focus(),
            300
          );
        }}
      >
        {Label}
      </div>

      {/* Icon to open the Autocomplete */}
      <Icon
        className="selectOpenIcon cursor-pointer"
        style={{
          width: isFocused ? "0px" : "15px",
          margin: isFocused ? "0px" : "2px 10px 0px 0px",
        }}
        onClick={() => {
          setValue(`${name}Focused`, true);
          setReRender(Math.random());
          setTimeout(
            () => document.getElementById(`${name}groupEl`)?.focus(),
            300
          );
        }}
      >
        arrow_drop_down_icon
      </Icon>

      {/* Autocomplete field controlled by React Hook Form */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            key={`${name}-${fieldValue}`}
            id={`${name}groupEl`}
            className="mb-3 selectField"
            style={{
              width: isFocused ? "130px" : "0px",
              margin: isFocused ? "0px 10px" : "0px",
              display: isFocused ? "block" : "none",
            }}
            classes={{ endAdornment: "endAdornment" }}
            openOnFocus
            onClose={() => {
              setValue(`${name}Focused`, false);
              setReRender(Math.random());
            }}
            freeSolo
            options={options}
            value={
              value ? options.find((data) => data.id === value) || null : null
            }
            getOptionLabel={(option) =>
              `${option.passenger_id || ""} -${option.office_serial || ""} - ${option.passport_no || ""}- ${option.passenger_name || ""}`
            }
            onChange={(_event, newValue) => {
              // Update selected value and trigger onEnter callback
              onChange(newValue?.id || "");
              onEnter();

              // Set selected value for display
              setValue(
                `${name}Name`,
                `${newValue.passenger_id || ""} - ${newValue.office_serial || ""} - ${newValue.passport_no || ""} - ${newValue.passenger_name || ""}`
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="textFieldUnderSelect"
                placeholder={`Select ${Label}`}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default ReportSelectPassenger;
