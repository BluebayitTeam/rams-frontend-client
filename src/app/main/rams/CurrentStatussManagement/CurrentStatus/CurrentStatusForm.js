import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function CurrentStatusForm(props) {
    const userID = localStorage.getItem('UserID')
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const routeParams = useParams();
    const { currentStatusId } = routeParams;

    return (
        <div>

            <Controller
                name={currentStatusId === 'new' ? 'created_by' : 'updated_by'}
                control={control}
                defaultValue={userID}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className={classes.hidden}
                        label="created by"
                        id="created_by"
                        error={false}
                        helperText=""
                        required
                        variant="outlined"
                        fullWidth
                    />)
                }}
            />


            <Controller
                name="name"
                control={control}
                render={({ field }) => {
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

export default CurrentStatusForm
