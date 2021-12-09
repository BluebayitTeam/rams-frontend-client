import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { doneNotDone, saveAlertMsg, updateAlertMsg } from 'app/@data/@data';
import { setAlert } from "app/store/alertSlice";
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentStatuss, getPassengers, getRecruitingAgencys } from '../../../../store/dataSlice';
import { saveTraining, updateTraining } from '../store/trainingSlice';




function TrainingForm(props) {

    const [previewDoc1Image, setpreviewDoc1Image] = useState("")
    const [previewCertificateImage, setpreviewCertificateImage] = useState("")

    const recruitingAgencys = useSelector(state => state.data.recruitingAgencys)
    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const methods = useFormContext();
    const routeParams = useParams();
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getRecruitingAgencys());
        dispatch(getCurrentStatuss())
    }, [])

    useEffect(() => {
        watch("doc1_image") || setpreviewDoc1Image("")
        watch("certificate_image") || setpreviewCertificateImage("")
    }, [watch("doc1_image"), watch("certificate_image")])


    function handleSaveTraining() {
        dispatch(saveTraining(getValues())).then((res) => {
            console.log("saveTrainingRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("trainingAlert", "saveTraining")
                history.push('/apps/training-management/training/new');
                reset({ training_card_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateTraining() {
        dispatch(updateTraining(getValues())).then((res) => {
            console.log("updateTrainingRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("trainingAlert", "updateTraining")
                history.push('/apps/training-management/training/new');
                reset({ training_card_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.trainingId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveTraining()
                console.log("saved")
            }
            else if (routeParams.trainingId !== "new" && watch('passenger')) {
                handleUpdateTraining()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name="recruiting_agency"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? recruitingAgencys.find(data => data.id == value) : null}
                        options={recruitingAgencys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Recruiting Agency"
                                label="Recruiting Agency"
                                error={!!errors.recruiting_agency}
                                helperText={errors?.recruiting_agency?.message}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />



            <Controller
                name="admission_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Admission Date"
                    />)
                }}
            />


            <Controller
                name="serial_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.serial_no}
                        helperText={errors?.serial_no?.message}
                        label="Serial No"
                        id="serial_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="certificate_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.certificate_no}
                        helperText={errors?.certificate_no?.message}
                        label="Certificate No"
                        id="certificate_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="certificate_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Certificate Date"
                    />)
                }}
            />


            <Controller
                name="training_card_status"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? doneNotDone.find(data => data.id == value) : null}
                        options={doneNotDone}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Training Card Status"
                                label="Training Card Status"
                                error={!!errors.training_card_status}
                                helperText={errors?.training_card_status?.message}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />



            <Controller
                name="batch_number"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.batch_number}
                        helperText={errors?.batch_number?.message}
                        label="Batch Number"
                        id="batch_number"
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
                            />
                        )}
                    />
                )}
            />



            <div className="flex justify-start -mx-16 flex-col md:flex-row">
                <Image name="doc1_image" previewImage={previewDoc1Image} setPreviewImage={setpreviewDoc1Image} label="Doc1 Image" />
                <Image name="certificate_image" previewImage={previewCertificateImage} setPreviewImage={setpreviewCertificateImage} label="Certificate Image" />
            </div>



        </div>
    );
}

export default TrainingForm