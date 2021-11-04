
import TextField from '@material-ui/core/TextField';
import { React } from 'react';
import { Controller, useFormContext } from "react-hook-form";

function DepartmentForm(props) {

    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;


    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) => {
                    console.log(field)
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        label="Name"
                        id="name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />

        </div>
    );
}

export default DepartmentForm
