import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { savePassengerType, updatePassengerType } from '../store/passengerTypeSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function PassengerTypeForm(props) {
    const userID = localStorage.getItem('user_id')
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState, getValues, setError } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const { passengerTypeId } = routeParams;
    const history = useHistory();
    const dispatch = useDispatch()
    const handleDelete = localStorage.getItem('passengerTypeEvent');


    function handleSavePassengerType() {
        dispatch(savePassengerType(getValues())).then((res) => {
            console.log("savePassengerTypeRes", res)
            if (res.payload.data?.detail) {
                setError('name', {
                    type: 'manual',
                    message: res.payload.data.detail
                });
            }
            else {
                localStorage.setItem("passengerTypeAlert", "savePassengerType")
                history.push('/apps/passengerType-management/passengerTypes');
            }
        });
    }

    function handleUpdatePassengerType() {
        dispatch(updatePassengerType(getValues())).then((res) => {
            console.log("updatePassengerTypeRes", res)
            if (res.payload.data?.detail) {
                setError('name', {
                    type: 'manual',
                    message: res.payload.data.detail
                });
            }
            else {
                localStorage.setItem("passengerTypeAlert", "updatePassengerType")
                history.push('/apps/passengerType-management/passengerTypes');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.passengerTypeId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSavePassengerType()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.passengerTypeName) {
                handleUpdatePassengerType()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={passengerTypeId === 'new' ? 'created_by' : 'updated_by'}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

        </div>
    );
}

export default PassengerTypeForm