import { Autocomplete, Icon, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import fillUnderscoreBySpace from "src/app/@helpers/fillUnderscoreBySpace";

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
    height: "30px",
    width: "fit-content",
    margin: "10px 5px",
    "& .selectLabel": {
      cursor: "pointer",
      overflow: "hidden",
      transition: "0.3s",
      color: theme.palette.primary.main,
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
          color: theme.palette.primary.main,
        },
      },
      "& .textFieldUnderSelect": {
        "& > div": {
          color: theme.palette.primary.main,
          "&::before": {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    "& .icon": {
      fontSize: "20px",
    },
  },
}));

function ReportSelect({
	name,
	label,
	options = [],
	icon,
	width,
	setReRender,
	onEnter = () => null,
	autocompleteStyle = {},
	getOptionLabel = (option) => option.name,
	onChange: customOnChange,
  } = {}) {
	const classes = useStyles();
	const methods = useFormContext();
	const { getValues, setValue, control, watch } = methods;
	const [isFocused, setIsFocused] = useState(false);
	const [Label] = useState(label || fillUnderscoreBySpace(name));
  
	// Watch for changes in both the field value and the associated name field
	const fieldValue = watch(name);
	const fieldNameValue = watch(`${name}Name`);
  
	useEffect(() => {
	  // If both the field value and name are cleared, hide the dropdown
	  if (fieldValue === "" && fieldNameValue === "") {
		setIsFocused(false);
	  }
	}, [fieldValue, fieldNameValue, name]);
  
	const handleFocus = () => {
	  setIsFocused(true);
	  setReRender(Math.random());
	};
  
	return (
	  <div className={classes.fieldContainer}>
		<Icon>{icon}</Icon>
  
		<div
		  className="selectLabel"
		  style={{
			width: isFocused ? "0px" : width,
			margin: isFocused ? "0px" : "2px 5px 0px 10px",
		  }}
		  onClick={handleFocus}
		>
		  {Label}
		</div>
  
		<ArrowDropDownIcon
		  className="selectOpenIcon cursor-pointer"
		  style={{
			width: isFocused ? "0px" : "15px",
			margin: isFocused ? "0px" : "2px 10px 0px 0px",
		  }}
		  onClick={handleFocus}
		/>
  
		<Controller
		  name={name}
		  control={control}
		  render={({ field: { onChange, value } }) => (
			<Autocomplete
			  id={`${name}groupEl`}
			  className="mb-3 selectField"
			  style={{
				width: isFocused ? autocompleteStyle.width || "130px" : "0px",
				margin: isFocused
				  ? autocompleteStyle.margin || "0px 10px"
				  : "0px",
				display: isFocused ? "block" : "none",
				overflow: "hidden",
				transition: "0.3s",
			  }}
			  classes={{ endAdornment: "endAdornment" }}
			  openOnFocus
			  onClose={() => {
				setIsFocused(false);
				setReRender(Math.random());
			  }}
			  freeSolo
			  options={options}
			  value={value ? options.find((data) => data.id === value) : null}
			  getOptionLabel={getOptionLabel}
			  onChange={(_event, newValue) => {
				if (customOnChange) {
				  customOnChange(_event, newValue);
				} else {
				  onChange(newValue?.id || "");
				  setValue(`${name}Name`, newValue?.name || "");
				}
				setIsFocused(false);
			  }}
			  renderInput={(params) => (
				<TextField
				  {...params}
				  className="textFieldUnderSelect"
				  placeholder={`Select ${Label}`}
				/>
			  )}
			/>
		  )}
		/>
	  </div>
	);
  }
  
  export default ReportSelect;