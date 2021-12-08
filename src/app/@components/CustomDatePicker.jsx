import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function CustomDatePicker(props) {


    const methods = useFormContext();
    const { control, formState, watch, getValues, setValue, setError } = methods;
    const { errors, isValid, dirtyFields } = formState;

    console.log("CustomDatePickerProps", props)
    return (
        <KeyboardDatePicker
            {...props.field}
            {...props}
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            placeholder="dd/mm/year"
            value={props.value || props.field.value || ""}
            className="mt-8 mb-16 w-full"
            error={!!errors[props.field.name]}
            helperText={errors[props.field.name]?.message || ""}
            onChange={(value) => {
                props.field.onChange(moment(value).format("YYYY-MM-DD"))
                props?.onChange && props?.onChange(value)
            }}
            InputAdornmentProps={{ position: "start" }}
        />
    )
}

export default CustomDatePicker
