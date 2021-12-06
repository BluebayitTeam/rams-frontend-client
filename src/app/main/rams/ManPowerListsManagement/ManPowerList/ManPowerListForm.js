import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAgencys, getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function ManPowerListForm(props) {

    const userID = localStorage.getItem('user_id')
    const agencys = useSelector(state => state.data.agencies)
    const currentStatuss = useSelector(state => state.data.currentStatuss)
    const classes = useStyles(props);
    const methods = useFormContext();
    const routeParams = useParams();
    const { manPowerListId } = routeParams;
    const { control, formState } = methods;
    const { errors } = formState;
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getAgencys());
        dispatch(getCurrentStatuss())
    }, [])


    // function handleSaveManPowerList() {
    //     dispatch(saveManPowerList(getValues())).then((res) => {
    //         console.log("saveManPowerListRes", res)
    //         if (res.payload?.data?.id) {
    //             localStorage.setItem("manPowerListAlert", "saveManPowerList")
    //             history.push('/apps/manPowerList-management/manPowerList/new');
    //             reset({})
    //         }
    //     });
    // }

    // function handleUpdateManPowerList() {
    //     dispatch(updateManPowerList(getValues())).then((res) => {
    //         console.log("updateManPowerListRes", res)
    //         if (res.payload?.data?.id) {
    //             localStorage.setItem("manPowerListAlert", "updateManPowerList")
    //             history.push('/apps/manPowerList-management/manPowerList/new');
    //             reset({})
    //         }
    //     });
    // }

    // const handleSubmitOnKeyDownEnter = (ev) => {
    //     if (ev.key === 'Enter') {
    //         if (routeParams.manPowerListId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
    //             handleSaveManPowerList()
    //             console.log("saved")
    //         }
    //         else if (routeParams.manPowerListId !== "new" && watch('passenger')) {
    //             handleUpdateManPowerList()
    //             console.log("updated")
    //         }
    //     }
    // }


    return (
        <div>

            <Controller
                name={manPowerListId === 'new' ? 'created_by' : 'updated_by'}
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
                        variant="outlined"
                        fullWidth
                    />)
                }}
            />

            <Controller
                name="agency"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? agencys.find(data => data.id == value) : null}
                        options={agencys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Agency"
                                label="Agency"
                                error={!!errors.agency}
                                helperText={errors?.agency?.message}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="man_power_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.man_power_date}
                        helperText={errors?.man_power_date?.message}
                        type="date"
                        label="Man Power Date"
                        id="man_power_date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                    />)
                }}
            />


            <Controller
                name="current_status"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? currentStatuss.find(data => data.id == value) : null}
                        options={currentStatuss}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Current Status"
                                label="Current Status"
                                error={!!errors.current_status}
                                helperText={errors?.current_status?.message}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            // onKeyDown={handleSubmitOnKeyDownEnter}
                            />
                        )}
                    />
                )}
            />

        </div>
    );
}

export default ManPowerListForm