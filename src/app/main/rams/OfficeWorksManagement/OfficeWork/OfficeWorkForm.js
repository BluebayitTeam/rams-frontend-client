import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Image from 'app/@components/Image';
import { setAlert } from "app/store/alertSlice";
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';
import { saveOfficeWork, updateOfficeWork } from '../store/officeWorkSlice';


function OfficeWorkForm(props) {

    const [previewPCImage, setpreviewPCImage] = useState("")
    const [previewDLImage, setpreviewDLImage] = useState("")
    const [previewDoc1Image, setpreviewDoc1Image] = useState("")
    const [previewDoc2Image, setpreviewDoc2Image] = useState("")

    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const methods = useFormContext();
    const routeParams = useParams();
    const { control, formState, watch, reset, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
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

    function handleSaveOfficeWork() {
        dispatch(saveOfficeWork(getValues())).then((res) => {
            console.log("saveOfficeWorkRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("officeWorkAlert", "saveOfficeWork")
                history.push('/apps/officeWork-management/officeWork/new');
                reset({})
                dispatch(setAlert("save success"))
            }
        });
    }

    function handleUpdateOfficeWork() {
        dispatch(updateOfficeWork(getValues())).then((res) => {
            console.log("updateOfficeWorkRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("officeWorkAlert", "updateOfficeWork")
                history.push('/apps/officeWork-management/officeWork/new');
                reset({})
                dispatch(setAlert("update success"))
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.officeWorkId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveOfficeWork()
                console.log("saved")
            }
            else if (routeParams.officeWorkId !== "new" && watch('passenger')) {
                handleUpdateOfficeWork()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name="police_clearance_status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.police_clearance_status}
                        helperText={errors?.police_clearance_status?.message}
                        label="Police Clearance Status"
                        id="police_clearance_status"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="driving_license_status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.driving_license_status}
                        helperText={errors?.driving_license_status?.message}
                        label="Driving License Status"
                        id="driving_license_status"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="finger_status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.finger_status}
                        helperText={errors?.finger_status?.finger_status}
                        label="Finger Status"
                        id="finger_status"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="finger_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.finger_date}
                        helperText={errors?.finger_date?.message}
                        type="date"
                        label="Finger Date"
                        id="finger_date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
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