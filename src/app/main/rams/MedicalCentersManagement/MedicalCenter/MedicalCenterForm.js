import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';
import { saveMedicalCenter, updateMedicalCenter } from '../store/medicalCenterSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function MedicalCenterForm(props) {

    const userID = localStorage.getItem('user_id')

    const currentStatuss = useSelector(state => state.data.currentStatuss)


    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { medicalCenterId } = routeParams;
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('medicalCenterEvent');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentStatuss())
        dispatch(getPassengers());
    }, [])


    function handleSaveMedicalCenter() {
        dispatch(saveMedicalCenter(getValues())).then((res) => {
            console.log("saveMedicalCenterRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalCenterAlert", "saveMedicalCenter")
                history.push('/apps/medicalCenter-management/medicalCenter/new');
                reset({})
            }
        });
    }

    function handleUpdateMedicalCenter() {
        dispatch(updateMedicalCenter(getValues())).then((res) => {
            console.log("updateMedicalCenterRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalCenterAlert", "updateMedicalCenter")
                history.push('/apps/medicalCenter-management/medicalCenter/new');
                reset({})
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.medicalCenterId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveMedicalCenter()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.medicalCenterName) {
                handleUpdateMedicalCenter()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={medicalCenterId === 'new' ? 'created_by' : 'updated_by'}
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
                name="name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        label="Name"
                        id="name"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        required
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="email"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        label="Email"
                        id="email"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="contact_person"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.contact_person}
                        helperText={errors?.contact_person?.message}
                        label="Contact Person"
                        id="contact_person"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="mobile"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.mobile}
                        helperText={errors?.mobile?.message}
                        label="Mobile"
                        id="mobile"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="phone_number"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.phone_number}
                        helperText={errors?.phone_number?.message}
                        label="Phone Number"
                        id="phone_number"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="web_address"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.web_address}
                        helperText={errors?.web_address?.message}
                        label="Web Address"
                        id="web_address"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="google_map_link"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.google_map_link}
                        helperText={errors?.google_map_link?.message}
                        label="google Map Link"
                        id="google_map_link"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="address"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        label="Address"
                        id="address"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                                placeholder="Select CurrentStatus"
                                label="CurrentStatus"
                                error={!!errors.current_status}
                                helperText={errors?.current_status?.message}
                                variant="outlined"
                                autoFocus
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

export default MedicalCenterForm