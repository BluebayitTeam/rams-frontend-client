import _ from '@lodash';
import { Box, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import countryCodes from 'app/@data/@Countrycodes';
import { genders } from 'app/@data/@data';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../constant/constants';
import { getCities, getCountries, getGroups, getThanas } from '../../../../store/dataSlice';
import { saveAgent, updateAgent } from '../store/agentSlice';


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


function AgentForm(props) {

    const [previewImage, setPreviewImage] = useState()
    const userID = localStorage.getItem('user_id')

    const thanas = useSelector(state => state.data.thanas)
    const cities = useSelector(state => state.data.cities)
    const countries = useSelector(state => state.data.countries)
    const groups = useSelector(state => state.data.groups)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { agentId } = routeParams;
    const { control, formState, watch, getValues, setValue } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('agentEvent');
    const dispatch = useDispatch()
    const image = watch('image');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [_reRender, setreRender] = useState(0)
    useEffect(() => {
        setreRender(Math.random())
    }, [getValues().balancce_type, getValues().balance_date, getValues().balance_amount, getValues().balance_note])

    useEffect(() => {
        dispatch(getThanas()),
            dispatch(getCities()),
            dispatch(getCountries()),
            dispatch(getGroups())
    }, [])

    function handleSaveAgent() {
        dispatch(saveAgent(getValues())).then((res) => {
            console.log("saveAgentRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("agentAlert", "saveAgent")
                history.push('/apps/agent-management/agents')
            }
            else if (res.payload?.data) {
                const detail = res.payload.data
                for (let name in detail) {
                    setError(`${name}`, {
                        type: 'manual',
                        message: detail[name]
                    })
                }
            }
        });
    }

    function handleUpdateAgent() {
        dispatch(updateAgent(getValues())).then((res) => {
            console.log("updateAgentRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("agentAlert", "updateAgent")
                history.push('/apps/agent-management/agents');
            }
            else if (res.payload?.data) {
                const detail = res.payload.data
                for (let name in detail) {
                    setError(`${name}`, {
                        type: 'manual',
                        message: detail[name]
                    })
                }
            }
        });
    }


    const handleSubmitOnKeyDownEnter = (ev) => {

        console.log("dirtyFields", dirtyFields)
        console.log("isValid", isValid)

        if (ev.key === 'Enter') {
            if (routeParams.agentId === "new" && !(_.isEmpty(dirtyFields) || !isValid || ((getValues().balancce_type || getValues().balance_date || getValues().balance_amount || getValues().balance_note)) ? !(getValues().balancce_type && getValues().balance_date && getValues().balance_amount && getValues().balance_note) : false)) {
                handleSaveAgent()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.agentName) {
                handleUpdateAgent()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={agentId === 'new' ? 'created_by' : 'updated_by'}
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
                name="first_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.first_name}
                        helperText={errors?.first_name?.message}
                        label="First Name"
                        id="first_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="last_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.last_name}
                        helperText={errors?.last_name?.message}
                        label="Last Name"
                        id="last_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="father_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.father_name}
                        helperText={errors?.father_name?.message}
                        label="Father Name"
                        id="father_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="mother_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.mother_name}
                        helperText={errors?.mother_name?.message}
                        label="Mother Name"
                        id="mother_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        label="User Name"
                        id="username"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        label="Email"
                        id="email"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            {agentId === "new" && <>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            label="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                className: 'pr-2',
                                type: showPassword ? 'text' : 'password',
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            <Icon className="text-20" color="action">
                                                {showPassword ? 'visibility' : 'visibility_off'}
                                            </Icon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            required
                            InputLabelProps={field.value && { shrink: true }}
                        />
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            label="Confirm Password"
                            type="password"
                            error={!!errors.confirmPassword}
                            helperText={errors?.confirmPassword?.message}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                className: 'pr-2',
                                type: showConfirmPassword ? 'text' : 'password',
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            <Icon className="text-20" color="action">
                                                {showConfirmPassword ? 'visibility' : 'visibility_off'}
                                            </Icon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            required
                            InputLabelProps={field.value && { shrink: true }}
                        />
                    )}
                />
            </>
            }

            <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? genders.find(data => data.id == value) : null}
                        options={genders}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Gender"
                                label="Gender"
                                error={!!errors.gender}
                                required
                                helperText={errors?.gender?.message}
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

            <div style={{
                display: "flex"
            }}>
                <div>
                    <Controller
                        name="country_code1"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                className="mt-8"
                                id="country-select-demo"
                                value={value ? countryCodes.find(country => country.value === value) : null}
                                options={countryCodes}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                renderOption={(prop, option) => {
                                    console.log(prop);
                                    return (
                                        <Box
                                            component="li"
                                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                            {...prop}
                                        >
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`https://flagcdn.com/w20/${prop?.code?.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${prop?.code?.toLowerCase()}.png 2x`}
                                                alt=""
                                            />
                                            {prop.label} ({prop.code}) +{prop.value}
                                        </Box>
                                    );
                                }}
                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    onChange(newValue?.value);
                                    setValue("primary_phone", newValue?.value)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a country"
                                        variant="outlined"
                                        style={{ width: '150px' }}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        )}
                    />
                </div>
                <Controller
                    name="primary_phone"
                    control={control}
                    render={({ field }) => {
                        return (<TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.primary_phone}
                            helperText={errors?.primary_phone?.message}
                            label="Primary Phone"
                            id="primary_phone"
                            required
                            variant="outlined"
                            InputLabelProps={field.value && { shrink: true }}
                            fullWidth
                            onKeyDown={handleSubmitOnKeyDownEnter}
                        />)
                    }}
                />
            </div>

            <div style={{ display: "flex" }}>
                <Controller
                    name="country_code2"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            className="mt-8 mb-16"
                            id="country-select-demo"
                            sx={{ width: 300 }}
                            value={value ? countryCodes.find(country => country.value === value) : null}
                            options={countryCodes}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(pro, option) => {
                                console.log(pro);
                                return (
                                    <Box
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...pro}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${pro?.code?.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${pro?.code?.toLowerCase()}.png 2x`}
                                            alt=""
                                        />
                                        {pro.label} ({pro.code}) +{pro.value}
                                    </Box>
                                );
                            }}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                onChange(newValue?.value);
                                setValue("secondary_phone", newValue?.value)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a country"
                                    variant="outlined"
                                    style={{ width: '150px' }}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    )}
                />

                <Controller
                    name="secondary_phone"
                    control={control}
                    render={({ field }) => {
                        return (<TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.secondary_phone}
                            helperText={errors?.secondary_phone?.message}
                            label="Secondary Phone"
                            id="secondary_phone"
                            required
                            variant="outlined"
                            InputLabelProps={field.value && { shrink: true }}
                            fullWidth
                            onKeyDown={handleSubmitOnKeyDownEnter}
                        />)
                    }}
                />
            </div>


            <Controller
                name="user_type"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.user_type}
                        helperText={errors?.user_type?.message}
                        label="User Type"
                        id="user_type"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="date_of_birth"
                        label="Birthday"
                        error={!!errors.date_of_birth}
                        required
                        helperText={errors?.date_of_birth?.message}
                        type="date"
                        // defaultValue="2017-05-24"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            />

            <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                    <FormControl>
                        <FormControlLabel
                            required
                            label="Is active"
                            control={<Checkbox
                                {...field}
                                color="primary"
                                checked={field.value || false}
                            />}
                        />
                    </FormControl>
                )}
            />

            <Controller
                name="street_address_one"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.street_address_one}
                        helperText={errors?.street_address_one?.message}
                        label="Street Address One"
                        id="street_address_one"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="street_address_two"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.street_address_two}
                        helperText={errors?.street_address_two?.message}
                        label="Street Address Two"
                        id="street_address_two"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="thana"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? thanas.find(data => data.id == value) : null}
                        options={thanas}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Police Station"
                                label="Police Station"
                                error={!!errors.thana}
                                required
                                helperText={errors?.thana?.message}
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
                name="city"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? cities.find(data => data.id == value) : null}
                        options={cities}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select District"
                                label="District"
                                error={!!errors.city}
                                required
                                helperText={errors?.city?.message}
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
                name="postal_code"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.postal_code}
                        helperText={errors?.postal_code?.message}
                        label="Postal Code"
                        id="postal_code"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="nid"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.nid}
                        helperText={errors?.nid?.message}
                        label="NID"
                        id="nid"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="group"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? groups.find(data => data.id == value) : null}
                        options={groups}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Group"
                                label="Group"
                                error={!!errors.group}
                                required
                                helperText={errors?.group?.message}
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
                name="notes"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                        label="Notes*"
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

export default AgentForm
