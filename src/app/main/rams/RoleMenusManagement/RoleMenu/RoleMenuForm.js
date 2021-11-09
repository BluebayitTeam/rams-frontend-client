import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoles } from '../../../../store/dataSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));

function RoleMenuForm(props) {

    const userID = localStorage.getItem('UserID')

    const dispatch = useDispatch()
    const roles = useSelector(state => state.data.roles)


    const classes = useStyles(props);

    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;

    const routeParams = useParams();
    const { roleMenuId } = routeParams;

    useEffect(() => {

        dispatch(getRoles())

    }, [])

    return (
        <div>

            <Controller
                name={roleMenuId === 'new' ? 'created_by' : 'updated_by'}
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
                name="role"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? roles.find(data => data.id == value) : null}
                        options={roles}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Role"
                                label="Role"
                                error={!!errors.role}
                                required
                                helperText={errors?.role?.message}
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

export default RoleMenuForm