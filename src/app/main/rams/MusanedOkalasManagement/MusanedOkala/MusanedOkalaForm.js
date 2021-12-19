import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { doneNotDone } from 'app/@data/data';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAgents, getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function MusanedOkalaForm(props) {

    const [previewdoc1Image, setpreviewdoc1Image] = useState("")
    const [previewdoc2Image, setpreviewdoc2Image] = useState("")

    const userID = localStorage.getItem('user_id')

    const musanedGivenBys = useSelector(state => state.data.agents)
    const okalaGivenBys = useSelector(state => state.data.agents)
    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { musanedOkalaId } = routeParams;
    const { control, formState, watch } = methods;
    const { errors } = formState;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getAgents());
        dispatch(getCurrentStatuss())

    }, [])

    useEffect(() => {
        watch("doc1_image") || setpreviewdoc1Image("")
        watch("doc2_image") || setpreviewdoc2Image("")
    }, [watch("doc1_image"), watch("doc2_image")])


    return (
        <div>

            <Controller
                name={musanedOkalaId === 'new' ? 'created_by' : 'updated_by'}
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
                name="musaned_given_by"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? musanedGivenBys.find(data => data.id == value) : null}
                        options={musanedGivenBys}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Musaned Given By"
                                label="Musaned Given By"
                                error={!!errors.musaned_given_by}
                                helperText={errors?.musaned_given_by?.message}
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
                name="okala_given_by"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? okalaGivenBys.find(data => data.id == value) : null}
                        options={okalaGivenBys}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select okala Given By"
                                label="okala Given By"
                                error={!!errors.okala_given_by}
                                helperText={errors?.okala_given_by?.message}
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
                name="okala_status"
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
                                placeholder="Select Okala Status"
                                label="Okala Status"
                                error={!!errors.okala_status}
                                helperText={errors?.okala_status?.message}
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
                name="musaned_status"
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
                                placeholder="Select Musaned Status"
                                label="Musaned Status"
                                error={!!errors.musaned_status}
                                helperText={errors?.musaned_status?.message}
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
                name="okala_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Okala Date"
                    />)
                }}
            />


            <Controller
                name="musaned_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Musaned Date"
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
                <Image name="doc1_image" previewImage={previewdoc1Image} setPreviewImage={setpreviewdoc1Image} label="Document 1" />
                <Image name="doc2_image" previewImage={previewdoc2Image} setPreviewImage={setpreviewdoc2Image} label="Document 2" />
            </div>


        </div>
    );
}

export default MusanedOkalaForm