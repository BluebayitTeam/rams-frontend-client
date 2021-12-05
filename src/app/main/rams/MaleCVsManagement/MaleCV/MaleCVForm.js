import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Image from 'app/@components/Image';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';
import { saveMaleCV, updateMaleCV } from '../store/maleCVSlice';


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


function MaleCVForm(props) {

    const [previewImage, setPreviewImage] = useState()
    const userID = localStorage.getItem('user_id')

    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { maleCVId } = routeParams;
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getCurrentStatuss())
    }, [])


    useEffect(() => {
        watch("image") || setPreviewImage("")
    }, [watch("image")])

    function handleSaveMaleCV() {
        dispatch(saveMaleCV(getValues())).then((res) => {
            console.log("saveMaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("maleCVAlert", "saveMaleCV")
                history.push('/apps/maleCV-management/maleCV/new');
                reset({})
            }
        });
    }

    function handleUpdateMaleCV() {
        dispatch(updateMaleCV(getValues())).then((res) => {
            console.log("updateMaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("maleCVAlert", "updateMaleCV")
                history.push('/apps/maleCV-management/maleCV/new');
                reset({})
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.maleCVId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveMaleCV()
                console.log("saved")
            }
            else if (routeParams.maleCVId !== "new" && watch('passenger')) {
                handleUpdateMaleCV()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={maleCVId === 'new' ? 'created_by' : 'updated_by'}
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
                name="qualification"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.qualification}
                        helperText={errors?.qualification?.message}
                        label="Qualification"
                        id="qualification"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="experience"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.experience}
                        helperText={errors?.experience?.message}
                        label="Experience"
                        id="experience"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="year_of_experience"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.year_of_experience}
                        helperText={errors?.year_of_experience?.message}
                        label="Year Of Eexperience"
                        id="year_of_experience"
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
                        label="Weight"
                        id="weight"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="language_skill"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.language_skill}
                        helperText={errors?.language_skill?.message}
                        label="Language Skill"
                        id="language_skill"
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




            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Image name="image" previewImage={previewImage} setPreviewImage={setPreviewImage} />
            </div>


        </div>
    );
}

export default MaleCVForm