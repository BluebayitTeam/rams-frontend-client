import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { saveAlertMsg, updateAlertMsg } from 'app/@data/@data';
import { setAlert } from 'app/store/alertSlice';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAgents, getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';
import { saveFlight, updateFlight } from '../store/flightSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
}));


function FlightForm(props) {

    const [previewImage, setPreviewImage] = useState()
    const userID = localStorage.getItem('user_id')

    const ticketAgencys = useSelector(state => state.data.agents)
    const currentStatuss = useSelector(state => state.data.currentStatuss)


    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { flightId } = routeParams;
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getAgents());
        dispatch(getCurrentStatuss())
    }, [])


    useEffect(() => {
        watch("ticket_image") || setPreviewImage("")
    }, [watch("ticket_image")])


    function handleSaveFlight() {
        dispatch(saveFlight(getValues())).then((res) => {
            console.log("saveFlightRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("flightAlert", "saveFlight")
                history.push('/apps/flight-management/flight/new');
                reset({})
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateFlight() {
        dispatch(updateFlight(getValues())).then((res) => {
            console.log("updateFlightRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("flightAlert", "updateFlight")
                history.push('/apps/flight-management/flight/new');
                reset({})
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.flightId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveFlight()
                console.log("saved")
            }
            else if (routeParams.flightId !== "new" && watch('passenger')) {
                handleUpdateFlight()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={flightId === 'new' ? 'created_by' : 'updated_by'}
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
                name="ticket_agency"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? ticketAgencys.find(data => data.id == value) : null}
                        options={ticketAgencys}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Ticket Agency"
                                label="Ticket Agency"
                                error={!!errors.ticket_agency}
                                helperText={errors?.ticket_agency?.message}
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


            <Controller
                name="carrier_air_way"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.carrier_air_way}
                        helperText={errors?.carrier_air_way?.message}
                        label="Carrier Air Way"
                        id="carrier_air_way"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="flight_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.flight_no}
                        helperText={errors?.flight_no?.message}
                        label="Flight No"
                        id="flight_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="ticket_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.ticket_no}
                        helperText={errors?.ticket_no?.message}
                        label="Ticket No"
                        id="ticket_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="sector_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.sector_name}
                        helperText={errors?.sector_name?.message}
                        label="Sector Name"
                        id="sector_name"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="ticket_status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.ticket_status}
                        helperText={errors?.ticket_status?.message}
                        label="Ticket Status"
                        id="ticket_status"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="flight_time"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.flight_time}
                        helperText={errors?.flight_time?.message}
                        label="Flight Time"
                        id="flight_time"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="arrival_time"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.arrival_time}
                        helperText={errors?.arrival_time?.message}
                        label="Arrival Time"
                        id="arrival_time"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="issue_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Issue Date"
                    />)
                }}
            />


            <Controller
                name="flight_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Flight Date"
                    />)
                }}
            />


            <Controller
                name="current_status"
                control={control}
                render={({ field: { onChange, value, name } }) => (
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



            <Controller
                name="notes"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.notes}
                        helperText={errors?.notes?.message}
                        label="Notes"
                        id="notes"
                        variant="outlined"
                        multiline
                        rows={4}
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Image name="ticket_image" previewImage={previewImage} setPreviewImage={setPreviewImage} />
            </div>


        </div>
    );
}

export default FlightForm
