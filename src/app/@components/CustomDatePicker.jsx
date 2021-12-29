import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function CustomDatePicker(props) {


    const methods = useFormContext();
    const { formState } = methods;
    const { errors } = formState;

    // console.log("CustomDatePickerProps", props)
    return (
        <KeyboardDatePicker
            {...props.field}
            {...props}
            className={props?.className || "mt-8 mb-16 w-full"}
            autoOk
            variant="inline"
            inputVariant="outlined"
            format={props?.format || "dd/MM/yyyy"}
            placeholder={props?.placeholder || "dd/MM/yyyy"}
            value={props.value || props.field.value || ""}
            error={!!errors[props.field.name]}
            helperText={errors[props.field.name]?.message || ""}
            onChange={(value) => {
                value ? props.field.onChange(moment(new Date(value)).format("YYYY-MM-DD")) : props.field.onChange("")
                props?.onChange && props?.onChange(value)
            }}
            InputAdornmentProps={{ position: "start" }}
        />
    )
}

export default CustomDatePicker
