import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image';
import { doneNotDone } from 'app/@data/data';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';


function OfficeWorkForm(props) {

    const [previewPCImage, setpreviewPCImage] = useState("")
    const [previewDLImage, setpreviewDLImage] = useState("")
    const [previewDoc1Image, setpreviewDoc1Image] = useState("")
    const [previewDoc2Image, setpreviewDoc2Image] = useState("")

    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const methods = useFormContext();
    const { control, formState, watch } = methods;
    const { errors } = formState;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getCurrentStatuss())
    }, [])

    useEffect(() => {
        watch("pc_image") || setpreviewPCImage("")
        watch("dl_image") || setpreviewDLImage("")
        watch("doc1_image") || setpreviewDoc1Image("")
        watch("doc2_image") || setpreviewDoc2Image("")
    }, [watch("pc_image"), watch("dl_image"), watch("doc1_image"), watch("doc2_image")])


    return (
        <div>

            <Controller
                name="police_clearance_status"
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
                                placeholder="Select Police Clearance Status"
                                label="Police Clearance Status"
                                error={!!errors.police_clearance_status}
                                helperText={errors?.police_clearance_status?.message}
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
                name="driving_license_status"
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
                                placeholder="Select Driving License Status"
                                label="Driving License Status"
                                error={!!errors.driving_license_status}
                                helperText={errors?.driving_license_status?.message}
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
                name="finger_status"
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
                                placeholder="Select Finger Status"
                                label="Finger Status"
                                error={!!errors.finger_status}
                                helperText={errors?.finger_status?.message}
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
                name="finger_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Finger Date"
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
                <Image name="pc_image" previewImage={previewPCImage} setPreviewImage={setpreviewPCImage} label="PC Image" />
                <Image name="dl_image" previewImage={previewDLImage} setPreviewImage={setpreviewDLImage} label="DL Image" />
            </div>
            <div className="flex justify-start -mx-16 flex-col md:flex-row">
                <Image name="doc1_image" previewImage={previewDoc1Image} setPreviewImage={setpreviewDoc1Image} label="Document 1" />
                <Image name="doc2_image" previewImage={previewDoc2Image} setPreviewImage={setpreviewDoc2Image} label="Document 2" />
            </div>


        </div>
    );
}

export default OfficeWorkForm