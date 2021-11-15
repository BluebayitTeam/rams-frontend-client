import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveCurrentStatus, updateCurrentStatus } from '../store/currentStatusSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function CurrentStatusForm(props) {
    const userID = localStorage.getItem('user_id')
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState, getValues, setError } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const { currentStatusId } = routeParams;
    const dispatch = useDispatch()

    const history = useHistory();
    const handleDelete = localStorage.getItem('currentStatusFormEvent');


    function handleSaveCurrentStatus() {
        dispatch(saveCurrentStatus(getValues())).then((res) => {
            console.log("saveCurrentStatusRes", res)
            if (res.payload.data?.detail) {
                setError('name', {
                    type: 'manual',
                    message: res.payload.data.detail
                });
            }
            else {
                localStorage.setItem("currentStatusAlert", "saveCurrentStatus")
                history.push('/apps/currentStatus-management/currentStatuss');
            }
        });
    }

    function handleUpdateCurrentStatus() {
        dispatch(updateCurrentStatus(getValues())).then((res) => {
            console.log("updateCurrentStatusRes", res)
            if (res.payload.data?.detail) {
                setError('name', {
                    type: 'manual',
                    message: res.payload.data.detail
                });
            }
            else {
                localStorage.setItem("currentStatusAlert", "updateCurrentStatus")
                history.push('/apps/currentStatus-management/currentStatuss');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.currentStatusId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveCurrentStatus()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.currentStatusName) {
                handleUpdateCurrentStatus()
                console.log("updated")
            }
        }
    }


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
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />
        </div>
    );
}

export default CurrentStatusForm
