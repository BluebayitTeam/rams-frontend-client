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
import { getPassengers, getRecruitingAgencys } from '../../../../store/dataSlice';
import { saveEmbassy, updateEmbassy } from '../store/embassySlice';


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


function EmbassyForm(props) {

    const [previewOldVisaImage, setPreviewOldVisaImage] = useState("")
    const [previewStampVisaImage, setPreviewStampVisaImage] = useState("")
    const userID = localStorage.getItem('user_id')

    const recruitingAgencys = useSelector(state => state.data.recruitingAgencys)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { embassyId } = routeParams;
    const { control, formState, watch, getValues, setValue } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('embassyEvent');
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
                reset({})
            }
        });
    }

    function handleUpdateEmbassy() {
        dispatch(updateEmbassy(getValues())).then((res) => {
            console.log("updateEmbassyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("embassyAlert", "updateEmbassy")
                history.push('/apps/embassy-management/embassy/new');
                reset({})
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.embassyId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveEmbassy()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.embassyName) {
                handleUpdateEmbassy()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={embassyId === 'new' ? 'created_by' : 'updated_by'}
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
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.submit_date}
                        helperText={errors?.submit_date?.message}
                        label="Submit Date"
                        id="submit_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
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
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.stamping_status}
                        helperText={errors?.stamping_status?.message}
                        label="Stamping Status"
                        id="stamping_status"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="stamping_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.stamping_date}
                        helperText={errors?.stamping_date?.message}
                        label="stamping_date"
                        id="Stamping Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        onChange={e => {
                            field.onChange(e.target.value)
                            const addMonth = addMonths(new Date(e.target.value,), 3,)
                            setValue('visa_expiry_date', `${addMonth.getFullYear()}-${(addMonth.getMonth() + 1).toString().padStart(2, 0)}-${(addMonth.getDate() - 1).toString().padStart(2, 0)}`);
                        }}
                    />)
                }}
            />


            <Controller
                name="visa_expiry_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.visa_expiry_date}
                        helperText={errors?.visa_expiry_date?.message}
                        label="visa_expiry_date"
                        id="visa_expiry_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="delivery_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.delivery_date}
                        helperText={errors?.delivery_date?.message}
                        label="delivery_date"
                        id="delivery_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
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