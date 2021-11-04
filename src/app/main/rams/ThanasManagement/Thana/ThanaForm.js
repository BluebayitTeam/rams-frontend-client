import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCities } from '../../../../store/dataSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function ThanaForm(props) {

    const userID = localStorage.getItem('UserID')

    const dispatch = useDispatch()
    const citys = useSelector(state => state.data.cities)

    const classes = useStyles(props);

    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;

    const routeParams = useParams();
    const { thanaId } = routeParams;

    useEffect(() => {
        dispatch(getCities())
    }, [])

    return (
        <div>

            <Controller
                name={thanaId === 'new' ? 'created_by' : 'updated_by'}
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


            <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? citys.find(data => data.id === value) : null}
                        options={citys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select City"
                                label="City"
                                error={!!errors.city}
                                required
                                helperText={errors?.city?.message}
                                variant="outlined"
                                autoFocus
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />



        </div>
    );
}

export default ThanaForm