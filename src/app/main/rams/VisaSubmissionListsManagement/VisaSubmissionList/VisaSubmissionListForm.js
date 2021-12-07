import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getAgencys, getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';




function VisaSubmissionListForm(props) {



    const agencys = useSelector(state => state.data.agencies)
    const currentStatuss = useSelector(state => state.data.currentStatuss)

    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getAgencys());
        dispatch(getCurrentStatuss())

    }, [])


    return (
        <div>

            <Controller
                name="agency"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? agencys.find(data => data.id == value) : null}
                        options={agencys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Agency"
                                label="Agency"
                                error={!!errors.agency}
                                helperText={errors?.agency?.message}
                                variant="outlined"
                                required
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="submission_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.submission_date}
                        helperText={errors?.submission_date?.message}
                        type="date"
                        label="Submission Date"
                        id="submission_date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
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

        </div>
    );
}

export default VisaSubmissionListForm