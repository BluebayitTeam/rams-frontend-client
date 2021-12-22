import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { doneNotDone, saveAlertMsg } from 'app/@data/data';
import { setAlert } from "app/store/alertSlice";
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentStatuss, getPassengers, getRecruitingAgencys } from '../../../../store/dataSlice';
import { saveManPower, updateManPower } from '../store/manPowerSlice';




function ManPowerForm(props) {

    const [previewImage, setPreviewImage] = useState()

    const recruitingAgencys = useSelector(state => state.data.recruitingAgencys)
    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const methods = useFormContext();
    const routeParams = useParams();
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()

    const { fromSearch } = useParams()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getRecruitingAgencys());
        dispatch(getCurrentStatuss())
    }, [])

    useEffect(() => {
        watch("smart_card_image") || setPreviewImage("")
    }, [watch("smart_card_image")])


    function handleSaveManPower() {
        dispatch(saveManPower(getValues())).then((res) => {
            console.log("saveManPowerRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("manPowerAlert", "saveManPower")
                history.push('/apps/manPower-management/manPower/new');
                reset({ man_power_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateManPower() {
        dispatch(updateManPower(getValues())).then((res) => {
            console.log("updateManPowerRes", res)
            if (res.payload?.data?.id) {
                if (fromSearch) {
                    history.push(`/apps/passenger/search/${searchKeyword}`);
                }
                else {
                    localStorage.setItem("manPowerAlert", "updateManPower")
                    history.push('/apps/manPower-management/manPower/new');
                    reset({ man_power_status: doneNotDone.find(data => data.default)?.id })
                    dispatch(setAlert(updateAlertMsg))
                }
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.manPowerId === "new" && watch("createPermission") && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveManPower()
                console.log("saved")
            }
            else if (routeParams.manPowerId !== "new" && watch('passenger')) {
                handleUpdateManPower()
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
                name="new_visa_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.new_visa_no}
                        helperText={errors?.new_visa_no?.message}
                        label="New Visa No"
                        id="new_visa_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="registration_id"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.registration_id}
                        helperText={errors?.registration_id?.message}
                        label="Registration ID"
                        id="registration_id"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="man_power_status"
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
                                placeholder="Select Man Power Status"
                                label="Man Power Status"
                                error={!!errors.man_power_status}
                                helperText={errors?.man_power_status?.message}
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
                name="man_power_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Man Power Date"
                    />)
                }}
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



            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Image name="smart_card_image" previewImage={previewImage} setPreviewImage={setPreviewImage} label="Smart Card Image" />
            </div>


        </div>
    );
}

export default ManPowerForm
