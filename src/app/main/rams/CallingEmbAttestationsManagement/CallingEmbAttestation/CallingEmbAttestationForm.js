import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { doneNotDone } from 'app/@data/data';
import { setAlert } from "app/store/alertSlice";
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveCallingEmbAttestation, updateCallingEmbAttestation } from '../store/callingEmbAttestationSlice';


function CallingEmbAttestationForm(props) {

    const [previewcallingdocImage, setpreviewcallingdocImage] = useState("")
    const [previewdoc1Image, setPreviewdoc1Image] = useState("")
    const [previewdoc2Image, setPreviewdoc2Image] = useState("")

    const embAttestationStatuss = doneNotDone
    const bioSubmittedStatuss = doneNotDone
    const callingStatuss = doneNotDone
    const currentStatuss = doneNotDone

    const methods = useFormContext();
    const routeParams = useParams();
    const { callingEmbAttestationId, fromSearch } = routeParams;
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getCurrentStatuss())
    }, [])

    useEffect(() => {
        setpreviewcallingdocImage("")
        setPreviewdoc1Image("")
        setPreviewdoc2Image("")
    }, [callingEmbAttestationId])


    function handleSaveCallingEmbAttestation() {
        dispatch(saveCallingEmbAttestation(getValues())).then((res) => {
            console.log("saveCallingEmbAttestationRes", res)
            if (res.payload?.data?.id) {
                history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                reset({ emb_attestation_status: doneNotDone.find(data => data.default)?.id, calling_status: doneNotDone.find(data => data.default)?.id, bio_submitted_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert("save success"))
            }
        });
    }

    function handleUpdateCallingEmbAttestation() {
        dispatch(updateCallingEmbAttestation(getValues())).then((res) => {
            console.log("updateCallingEmbAttestationRes", res)
            if (res.payload?.data?.id) {
                if (fromSearch) {
                    history.goBack();
                }
                else {
                    history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                    reset({ emb_attestation_status: doneNotDone.find(data => data.default)?.id, calling_status: doneNotDone.find(data => data.default)?.id, bio_submitted_status: doneNotDone.find(data => data.default)?.id })
                    dispatch(setAlert("update success"))
                }
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
                    return (<CustomDatePicker
                        field={field}
                        label="Delivery Date"
                    />)
                }}
            />


            <Controller
                name="calling_date"
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


            <div className="flex justify-start -mx-16 flex-col md:flex-row">
                <Image name="calling_doc" previewImage={previewcallingdocImage} setPreviewImage={setpreviewcallingdocImage} label="Calling Document" />
                <Image name="doc1" previewImage={previewdoc1Image} setPreviewImage={setPreviewdoc1Image} label="Document 1" />
                <Image name="doc2" previewImage={previewdoc2Image} setPreviewImage={setPreviewdoc2Image} label="Document 2" />
            </div>


        </div>
    );
}

export default CallingEmbAttestationForm