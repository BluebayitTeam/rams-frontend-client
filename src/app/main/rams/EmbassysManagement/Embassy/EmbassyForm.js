import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { doneNotDone, saveAlertMsg, updateAlertMsg } from 'app/@data/@data';
import increaseMonth from 'app/@utils/increaseMonth';
import { setAlert } from 'app/store/alertSlice';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPassengers, getRecruitingAgencys } from '../../../../store/dataSlice';
import { saveEmbassy, updateEmbassy } from '../store/embassySlice';


function EmbassyForm(props) {

    const [previewOldVisaImage, setPreviewOldVisaImage] = useState("")
    const [previewStampVisaImage, setPreviewStampVisaImage] = useState("")

    const recruitingAgencys = useSelector(state => state.data.recruitingAgencys)

    const methods = useFormContext();
    const routeParams = useParams();
    const { control, formState, watch, getValues, setValue, reset } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        watch("old_visa_image") || setPreviewOldVisaImage("")
        watch("stamp_visa_image") || setPreviewStampVisaImage("")
    }, [watch("old_visa_image"), watch("stamp_visa_image")])

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getRecruitingAgencys())
    }, [])


    function handleSaveEmbassy() {
        dispatch(saveEmbassy(getValues())).then((res) => {
            console.log("saveEmbassyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("embassyAlert", "saveEmbassy")
                history.push('/apps/embassy-management/embassy/new');
                reset({ stamping_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateEmbassy() {
        dispatch(updateEmbassy(getValues())).then((res) => {
            console.log("updateEmbassyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("embassyAlert", "updateEmbassy")
                history.push('/apps/embassy-management/embassy/new');
                reset({ stamping_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.embassyId === "new" && !(_.isEmpty(dirtyFields) || !isValid) && watch('createPermission')) {
                handleSaveEmbassy()
                console.log("saved")
            }
            else if (routeParams.femaleCVId !== "new" && watch('passenger') && watch('updatePermission')) {
                handleUpdateEmbassy()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name="recruiting_agency"
                control={control}
                render={({ field: { onChange, value, name } }) => (
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
                name="submit_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Submit Date"
                    />)
                }}
            />


            <Controller
                name="profession_english"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.profession_english}
                        helperText={errors?.profession_english?.message}
                        label="Profession English"
                        id="profession_english"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="profession_arabic"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.profession_arabic}
                        helperText={errors?.profession_arabic?.message}
                        label="Profession Arabic"
                        id="profession_arabic"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="salary"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.salary}
                        helperText={errors?.salary?.message}
                        label="Salary"
                        id="salary"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="stamping_status"
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
                                placeholder="Select Stamping Status"
                                label="Stamping Status"
                                error={!!errors.stamping_status}
                                helperText={errors?.stamping_status?.message}
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
                name="stamping_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Stamping Date"
                        onChange={value => {
                            setValue('visa_expiry_date', increaseMonth(value, 3));
                        }}
                    />)
                }}
            />


            <Controller
                name="visa_expiry_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="visa Expiry Date"
                    />)
                }}
            />


            <Controller
                name="delivery_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Delivery Date"
                    />)
                }}
            />





            <Controller
                name="visa_number_readonly"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.visa_number_readonly}
                        helperText={errors?.visa_number_readonly?.message}
                        label="Visa No"
                        id="visa_number_readonly"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />)
                }}
            />

            <Controller
                name="sponsor_id_no_readonly"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_id_no_readonly}
                        helperText={errors?.sponsor_id_no_readonly?.message}
                        label="Sponsor ID No"
                        id="sponsor_id_no_readonly"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />)
                }}
            />

            <Controller
                name="sponsor_name_english_readonly"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_name_english_readonly}
                        helperText={errors?.sponsor_name_english_readonly?.message}
                        label="Sponsor Name English"
                        id="sponsor_name_english_readonly"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />)
                }}
            />

            <Controller
                name="sponsor_name_arabic_readonly"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_name_arabic_readonly}
                        helperText={errors?.sponsor_name_arabic_readonly?.message}
                        label="Sponsor Name Arabic"
                        id="sponsor_name_arabic_readonly"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />)
                }}
            />

            <Controller
                name="mofa_no_readonly"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.mofa_no_readonly}
                        helperText={errors?.mofa_no_readonly?.message}
                        label="Mofa No"
                        id="mofa_no_readonly"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />)
                }}
            />




            <div className="flex justify-start -mx-16 flex-col md:flex-row">
                <Image name="old_visa_image" previewImage={previewOldVisaImage} setPreviewImage={setPreviewOldVisaImage} label="Old Visa Image" />
                <Image name="stamp_visa_image" previewImage={previewStampVisaImage} setPreviewImage={setPreviewStampVisaImage} label="Stamp Visa Image" />
            </div>


        </div>
    );
}

export default EmbassyForm