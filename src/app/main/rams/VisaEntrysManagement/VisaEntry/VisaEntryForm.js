import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAgents, getCountries, getDemands } from '../../../../store/dataSlice';
import { saveVisaEntry, updateVisaEntry } from '../store/visaEntrySlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));

function VisaEntryForm(props) {
    const userID = localStorage.getItem('user_id')
    const demands = useSelector(state => state.data.demands)
    const visaAgents = useSelector(state => state.data.agents)
    const countries = useSelector(state => state.data.countries)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { visaEntryId } = routeParams;
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('visaEntryEvent');
    const dispatch = useDispatch()

    const { visaEntryName } = useParams()

    useEffect(() => {
        dispatch(getDemands())
        dispatch(getAgents())
        dispatch(getCountries())
    }, [])

    function handleSaveVisaEntry() {
        dispatch(saveVisaEntry(getValues())).then((res) => {
            console.log("saveVisaEntryRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("visaEntryAlert", "saveVisaEntry")
                history.push('/apps/visaEntry-management/visaEntrys');
            }
        });
    }

    function handleUpdateVisaEntry() {
        dispatch(updateVisaEntry(getValues())).then((res) => {
            console.log("updateVisaEntryRes", res)
            if (res.payload?.data?.id) {
                if (visaEntryName === 'fromSearch') {
                    history.goBack()
                }
                else {
                    localStorage.setItem("visaEntryAlert", "updateVisaEntry")
                    history.push('/apps/visaEntry-management/visaEntrys');
                }
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.visaEntryId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveVisaEntry()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.visaEntryName) {
                handleUpdateVisaEntry()
                console.log("updated")
            }
        }
    }


    console.log("values", getValues())
    return (
        <div>

            <Controller
                name={visaEntryId === 'new' ? 'created_by' : 'updated_by'}
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
                        required
                        variant="outlined"
                        fullWidth
                    />)
                }}
            />

            <Controller
                name="demand"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? demands.find(data => data.id == value) : null}
                        options={demands}
                        getOptionLabel={(option) => `${option.company_name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Demand"
                                label="Demand"
                                error={!!errors.demand}
                                required
                                helperText={errors?.demand?.message}
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
                name="country"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? countries.find(data => data.id == value) : null}
                        options={countries}
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
                                required
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
                name="visa_agent"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? visaAgents.find(data => data.id == value) : null}
                        options={visaAgents}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select Visa Agent"
                                label="Visa Agent"
                                error={!!errors.visa_agent}
                                required
                                helperText={errors?.visa_agent?.message}
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
                name="visa_number"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.visa_number}
                        helperText={errors?.visa_number?.message}
                        label="Visa Number"
                        id="visa_number"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="visa_issue_date"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Visa Issue Date"
                        format="yyyy/MM/dd"
                        placeholder="yyyy/MM/dd"
                    />)
                }}
            />


            <Controller
                name="profession_english"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.profession_english}
                        helperText={errors?.profession_english?.message}
                        label="Profession English"
                        id="profession_english"
                        required
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
                        className="mt-8 mb-16"
                        error={!!errors.profession_arabic}
                        helperText={errors?.profession_arabic?.message}
                        label="Profession Arabic"
                        id="profession_arabic"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="group_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.group_no}
                        helperText={errors?.group_no?.message}
                        label="Group No"
                        id="group_no"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="quantity"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.quantity}
                        helperText={errors?.quantity?.message}
                        label="Quantity"
                        id="quantity"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="sponsor_id_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_id_no}
                        helperText={errors?.sponsor_id_no?.message}
                        label="Sponsor ID No"
                        id="sponsor_id_no"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="sponsor_dob"
                control={control}
                render={({ field }) => {
                    return (<CustomDatePicker
                        field={field}
                        label="Sponsor Date Of Birth"
                    />)
                }}
            />


            <Controller
                name="sponsor_name_english"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_name_english}
                        helperText={errors?.sponsor_name_english?.message}
                        label="Sponsor Name English"
                        id="sponsor_name_english"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="sponsor_name_arabic"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_name_arabic}
                        helperText={errors?.sponsor_name_arabic?.message}
                        label="Sponsor Name Arabic"
                        id="sponsor_name_arabic"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="sponsor_mobile"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_mobile}
                        helperText={errors?.sponsor_mobile?.message}
                        label="Sponsor Mobile"
                        id="sponsor_mobile"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="sponsor_address"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.sponsor_address}
                        helperText={errors?.sponsor_address?.message}
                        label="Sponsor Address"
                        id="sponsor_address"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="notes"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.notes}
                        helperText={errors?.notes?.message}
                        label="Notes"
                        id="notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

        </div>
    );
}

export default VisaEntryForm