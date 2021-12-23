import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Image from 'app/@components/Image';
import { setAlert } from "app/store/alertSlice";
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveCallingEmbAttestation, updateCallingEmbAttestation } from '../store/callingEmbAttestationSlice';




function CallingEmbAttestationForm(props) {

    const [previewImage, setPreviewImage] = useState()

    // const embAttestationStatuss = useSelector(state => state.data.embAttestationStatuss)
    // const bioSubmittedStatuss = useSelector(state => state.data.bioSubmittedStatuss)
    // const callingStatuss = useSelector(state => state.data.callingStatuss)
    // const currentStatuss = useSelector(state => state.data.currentStatuss)


    const embAttestationStatuss = []
    const bioSubmittedStatuss = []
    const callingStatuss = []
    const currentStatuss = []


    const methods = useFormContext();
    const routeParams = useParams();
    const { callingEmbAttestationId } = routeParams;
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()


    useEffect(() => {
        // dispatch(getPassengers());
        // dispatch(getEmbAttestationStatuss());
        //  dispatch(getBioSubmittedStatuss());
        //   dispatch(getCallingStatuss());
        //    dispatch(getCurrentStatuss())

    }, [])


    function handleSaveCallingEmbAttestation() {
        dispatch(saveCallingEmbAttestation(getValues())).then((res) => {
            console.log("saveCallingEmbAttestationRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("callingEmbAttestationAlert", "saveCallingEmbAttestation")
                history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                reset({})
                dispatch(setAlert("save success"))
            }
        });
    }

    function handleUpdateCallingEmbAttestation() {
        dispatch(updateCallingEmbAttestation(getValues())).then((res) => {
            console.log("updateCallingEmbAttestationRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("callingEmbAttestationAlert", "updateCallingEmbAttestation")
                history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                reset({})
                dispatch(setAlert("update success"))
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.callingEmbAttestationId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveCallingEmbAttestation()
                console.log("saved")
            }
            else if (routeParams.callingEmbAttestationId !== "new" && watch('passenger')) {
                handleUpdateCallingEmbAttestation()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name="emb_attestation_status"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? embAttestationStatuss.find(data => data.id == value) : null}
                        options={embAttestationStatuss}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Emb Attestation Status"
                                label="Emb Attestation Status"
                                error={!!errors.emb_attestation_status}
                                helperText={errors?.emb_attestation_status?.message}
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
                name="bio_submitted_status"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? bioSubmittedStatuss.find(data => data.id == value) : null}
                        options={bioSubmittedStatuss}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Bio Submitted Status"
                                label="Bio Submitted Status"
                                error={!!errors.bio_submitted_status}
                                helperText={errors?.bio_submitted_status?.message}
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
                name="calling_status"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? callingStatuss.find(data => data.id == value) : null}
                        options={callingStatuss}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Calling Status"
                                label="Calling Status"
                                error={!!errors.calling_status}
                                helperText={errors?.calling_status?.message}
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





            <Controller
                name="ministry_attestation"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.ministry_attestation}
                        helperText={errors?.ministry_attestation?.message}
                        label="Ministry Attestation"
                        id="ministry_attestation"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="bio_submitted_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.bio_submitted_date}
                        helperText={errors?.bio_submitted_date?.message}
                        type="date"
                        label="Bio Submitted Date"
                        id="bio_submitted_date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <Controller
                name="calling_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.calling_date}
                        helperText={errors?.calling_date?.message}
                        type="date"
                        label="Calling Date"
                        id="calling_date"
                        InputLabelProps={{ shrink: true }}
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

export default CallingEmbAttestationForm