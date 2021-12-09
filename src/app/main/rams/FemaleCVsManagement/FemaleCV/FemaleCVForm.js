import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Image from 'app/@components/Image';
import { saveAlertMsg, updateAlertMsg } from 'app/@data/@data';
import { setAlert } from 'app/store/alertSlice';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCountries, getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';
import { saveFemaleCV, updateFemaleCV } from '../store/femaleCVSlice';


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


function FemaleCVForm(props) {

    const [previewImage, setPreviewImage] = useState()
    const userID = localStorage.getItem('user_id')

    const countrys = useSelector(state => state.data.countries)
    const currentStatuss = useSelector(state => state.data.currentStatuss)


    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { femaleCVId } = routeParams;
    const { control, formState, watch, getValues, reset } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getCountries());
        dispatch(getCurrentStatuss())
    }, [])

    useEffect(() => {
        watch("image") || setPreviewImage("")
    }, [watch("image")])


    function handleSaveFemaleCV() {
        dispatch(saveFemaleCV(getValues())).then((res) => {
            console.log("saveFemaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("femaleCVAlert", "saveFemaleCV")
                history.push('/apps/femaleCV-management/femaleCV/new');
                reset({})
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateFemaleCV() {
        dispatch(updateFemaleCV(getValues())).then((res) => {
            console.log("updateFemaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("femaleCVAlert", "updateFemaleCV")
                history.push('/apps/femaleCV-management/femaleCV/new');
                reset({})
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.femaleCVId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveFemaleCV()
                console.log("saved")
            }
            else if (routeParams.femaleCVId !== "new" && watch('passenger')) {
                handleUpdateFemaleCV()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={femaleCVId === 'new' ? 'created_by' : 'updated_by'}
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
                name="country"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? countrys.find(data => data.id == value) : null}
                        options={countrys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Country"
                                label="Country"
                                error={!!errors.country}
                                helperText={errors?.country?.message}
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
                name="profession"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.profession}
                        helperText={errors?.profession?.message}
                        label="Profession"
                        id="profession"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="experience_task"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.experience_task}
                        helperText={errors?.experience_task?.message}
                        label="Experience Task"
                        id="experience_task"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="experience_period"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.experience_period}
                        helperText={errors?.experience_period?.message}
                        label="Experience Period"
                        id="experience_period"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="place_of_birth"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.place_of_birth}
                        helperText={errors?.place_of_birth?.message}
                        label="Place Of Birth"
                        id="place_of_birth"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="place_of_residence"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.place_of_residence}
                        helperText={errors?.place_of_residence?.message}
                        label="Place Of Residence"
                        id="place_of_residence"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="number_of_children"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.number_of_children}
                        helperText={errors?.number_of_children?.message}
                        label="Number Of Children"
                        id="number_of_children"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="height"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.height}
                        helperText={errors?.height?.message}
                        label="Height"
                        id="height"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="weight"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.weight}
                        helperText={errors?.weight?.message}
                        label="weight"
                        id="weight"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="education"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.education}
                        helperText={errors?.education?.message}
                        label="Education"
                        id="education"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="arabic_skill"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.arabic_skill}
                        helperText={errors?.arabic_skill?.message}
                        label="Arabic Skill"
                        id="arabic_skill"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="english_skill"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.english_skill}
                        helperText={errors?.english_skill?.message}
                        label="English Skill"
                        id="english_skill"
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
                name="complexion"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.complexion}
                        helperText={errors?.complexion?.message}
                        label="Complexion"
                        id="complexion"
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
                name="remarks"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.remarks}
                        helperText={errors?.remarks?.message}
                        label="Remarks"
                        id="remarks"
                        variant="outlined"
                        multiline
                        rows={4}
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Image name="image" previewImage={previewImage} setPreviewImage={setPreviewImage} />
            </div>


        </div>
    );
}

export default FemaleCVForm
