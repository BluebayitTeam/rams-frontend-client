import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Image from 'app/@components/Image';
import { addMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentStatuss, getMedicalCenters, getPassengers } from '../../../../store/dataSlice';
import { saveMedical, updateMedical } from '../store/medicalSlice';


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


function MedicalForm(props) {

    const [previewImage, setPreviewImage] = useState()
    const [previewImage2, setPreviewImage2] = useState()
    const userID = localStorage.getItem('user_id')

    const medicalCenters = useSelector(state => state.data.medicalCenters)
    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { medicalId } = routeParams;
    const { control, formState, setValue, getValues, watch } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getMedicalCenters());
        dispatch(getCurrentStatuss());
    }, [])

    useEffect(() => {
        watch("slip_pic") || setPreviewImage("")
        watch("medical_card_pic") || setPreviewImage2("")
    }, [watch("slip_pic"), watch("medical_card_pic")])

    function handleSaveMedical() {
        dispatch(saveMedical(getValues())).then((res) => {
            console.log("saveMedicalRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalAlert", "saveMedical")
                history.push('/apps/medical-management/medical/new');
                reset({})
            }
        });
    }

    function handleUpdateMedical() {
        dispatch(updateMedical(getValues())).then((res) => {
            console.log("updateMedicalRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalAlert", "updateMedical")
                history.push('/apps/medical-management/medical/new');
                reset({})
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.medicalId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveMedical()
                console.log("saved")
            }
            else if (routeParams.medicalId !== "new" && watch('passenger')) {
                handleUpdateMedical()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={medicalId === 'new' ? 'created_by' : 'updated_by'}
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
                name="medical_center"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? medicalCenters.find(data => data.id == value) : null}
                        options={medicalCenters}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Medical Center"
                                label="Medical Center"
                                error={!!errors.medical_center}
                                helperText={errors?.medical_center?.message}
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


            <Controller
                name="medical_serial_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_serial_no}
                        helperText={errors?.medical_serial_no?.message}
                        label="Medical Serial No"
                        id="medical_serial_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="medical_result"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_result}
                        helperText={errors?.medical_result?.message}
                        label="Medical Result"
                        id="medical_result"

                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="medical_card"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_card}
                        helperText={errors?.medical_card?.message}
                        label="Medical Card"
                        id="medical_card"

                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="medical_exam_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_exam_date}
                        helperText={errors?.medical_exam_date?.message}
                        label="Medical Exam Date"
                        id="medical_exam_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="medical_report_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_report_date}
                        helperText={errors?.medical_report_date?.message}
                        label="Medical Report Date"
                        id="medical_report_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="medical_issue_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_issue_date}
                        helperText={errors?.medical_issue_date?.message}
                        label="Medical Issue Date"
                        id="medical_issue_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={e => {
                            field.onChange(e.target.value)
                            const addMonth = addMonths(new Date(e.target.value,), 3,)
                            setValue('medical_expiry_date', `${addMonth.getFullYear()}-${(addMonth.getMonth() + 1).toString().padStart(2, 0)}-${(addMonth.getDate() - 1).toString().padStart(2, 0)}`);
                        }}
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="medical_expiry_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.medical_expiry_date}
                        helperText={errors?.medical_expiry_date?.message}
                        label="Medical Expiry Date"
                        id="medical_expiry_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
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
                        className="mt-8 mb-16"
                        value={field.value || ""}
                        error={!!errors.notes}
                        helperText={errors?.notes?.message}
                        label="Notes"
                        id="notes"
                        variant="outlined"
                        multiline
                        rows={4}
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <div className="flex justify-start -mx-16 flex-col md:flex-row">
                <Image name="slip_pic" previewImage={previewImage} setPreviewImage={setPreviewImage} label="Slip Picture" />
                <Image name="medical_card_pic" previewImage={previewImage2} setPreviewImage={setPreviewImage2} label="Medical Card Picture" />
            </div>

        </div>
    );
}

export default MedicalForm