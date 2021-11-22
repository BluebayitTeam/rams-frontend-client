import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../constant/constants';
import { getAgents, getCountries, getProfessions } from '../../../../store/dataSlice';
import { saveDemand, updateDemand } from '../store/demandSlice';

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


function DemandForm(props) {

    const [previewImage, setPreviewImage] = useState()
    const userID = localStorage.getItem('user_id')
    const professions = useSelector(state => state.data.professions)
    const countries = useSelector(state => state.data.countries)
    const visaAgents = useSelector(state => state.data.agents)
    const classes = useStyles(props);
    const methods = useFormContext();
    const routeParams = useParams();
    const { demandId } = routeParams;
    const { control, formState, watch, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('demandEvent');
    const dispatch = useDispatch()
    const image = watch('image');

    useEffect(() => {
        dispatch(getProfessions()),
            dispatch(getCountries()),
            dispatch(getAgents())
    }, [])

    function handleSaveDemand() {
        dispatch(saveDemand(getValues())).then((res) => {
            console.log("saveDemandRes", res)
            if (res.payload) {
                localStorage.setItem("demandAlert", "saveDemand")
                history.push('/apps/demand-management/demands');
            }
        });
    }

    function handleUpdateDemand() {
        dispatch(updateDemand(getValues())).then((res) => {
            console.log("updateDemandRes", res)
            if (res.payload) {
                localStorage.setItem("demandAlert", "updateDemand")
                history.push('/apps/demand-management/demands');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.demandId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveDemand()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.demandName) {
                handleUpdateDemand()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={demandId === 'new' ? 'created_by' : 'updated_by'}
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
                name="profession"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? professions.find(data => data.id == value) : null}
                        options={professions}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Profession"
                                label="Profession"
                                error={!!errors.profession}
                                required
                                helperText={errors?.profession?.message}
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
                name="company_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.company_name}
                        helperText={errors?.company_name?.message}
                        label="Company Name"
                        id="company_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                        type="number"
                        required
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
                        className="mt-8 mb-16"
                        error={!!errors.salary}
                        helperText={errors?.salary?.message}
                        label="Salary"
                        id="salary"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="purchase_rate"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.purchase_rate}
                        helperText={errors?.purchase_rate?.message}
                        label="Purchase Rate"
                        id="purchase_rate"
                        type="number"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="purchase_foreign_corrency"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.purchase_foreign_corrency}
                        helperText={errors?.purchase_foreign_corrency?.message}
                        label="Purchase Foreign Corrency"
                        id="purchase_foreign_corrency"
                        type="number"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="office_rate"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.office_rate}
                        helperText={errors?.office_rate?.message}
                        label="Office Rate"
                        id="office_rate"
                        type="number"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.status}
                        helperText={errors?.status?.message}
                        label="Status"
                        id="status"
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
                        helperText={errors.notes?.message}
                        label="Notes *"
                        id="notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />

            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <label
                            htmlFor="button-file"
                            className={clsx(
                                classes.productImageUpload,
                                'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                            )}
                        >
                            <input
                                accept="image/*"
                                className="hidden"
                                id="button-file"
                                type="file"
                                onChange={async e => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        if (reader.readyState === 2) {
                                            setPreviewImage(reader.result);
                                        }
                                    }
                                    reader.readAsDataURL(e.target.files[0]);

                                    const file = e.target.files[0];
                                    onChange(file);
                                }}
                            />
                            <Icon fontSize="large" color="action">
                                cloud_upload
                            </Icon>
                        </label>
                    )}
                />
                {
                    image && !previewImage && <img src={`${BASE_URL}${image}`} />
                }

                <div style={{ width: '100px', height: '100px' }}>
                    <img
                        src={previewImage}
                    //alt="no image found"
                    />
                </div>
            </div>
        </div>
    );
}

export default DemandForm