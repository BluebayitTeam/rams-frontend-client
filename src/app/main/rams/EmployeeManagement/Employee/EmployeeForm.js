import {
    Box, Checkbox, FormControl,
    FormControlLabel, Icon,
    IconButton,
    InputAdornment,
    TextField, Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import useRemoveCountryCode from "app/@customHook/@useRemoveCountryCode";
import countryCodes from 'app/@data/@Countrycodes';
import { genders } from 'app/@data/@data';
import clsx from 'clsx';
import { React, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    BASE_URL, CHECK_EMAIL, CHECK_EMAIL_UPDATE, CHECK_PRIMARY_PHONE, CHECK_PRIMARY_PHONE_UPDATE, CHECK_SECONDARY_PHONE, CHECK_SECONDARY_PHONE_UPDATE, CHECK_USERNAME, CHECK_USERNAME_UPDATE
} from '../../../../constant/constants';
import { getBranches, getCities, getCountries, getDepartments, getEmployees, getRoles, getThanas } from '../../../../store/dataSlice';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));


const EmployeeForm = (props) => {
    const dispatch = useDispatch();
    const thanas = useSelector(state => state.data.thanas);
    const branches = useSelector(state => state.data.branches);
    const roles = useSelector(state => state.data.roles);
    const departments = useSelector(state => state.data.departments);
    const cities = useSelector(state => state.data.cities);
    const countries = useSelector(state => state.data.countries);
    const employee = useSelector(state => state.data.employees);
    const methods = useFormContext();
    const { control, watch, setValue, formState, setError, reset, getValues } = methods;
    const image = watch('image');
    const classes = useStyles(props);
    const { errors } = formState;
    console.log("Formstate", getValues());
    const [showPassword, setShowPassword] = useState(false);
    const routeParams = useParams();
    const { employeeId } = routeParams;
    const [previewImage, setPreviewImage] = useState();
    const updateEmployee = localStorage.getItem('updateEmployee');
    const updateEmployeeData = useSelector(({ employeesManagement }) => employeesManagement.employee);
    const phoneNoPrimary = updateEmployeeData?.primary_phone;
    const phoneNoSecondary = updateEmployeeData?.secondary_phone;

    useEffect(() => {
        dispatch(getBranches());
        dispatch(getThanas());
        dispatch(getRoles());
        dispatch(getDepartments());
        dispatch(getCities());
        dispatch(getCountries());
        dispatch(getEmployees())
    }, []);
    const getCountryCode1 = watch('country_code1');
    const getCountryCode2 = watch('country_code2');
    console.log(getCountryCode1);
    console.log(getValues());
    const [primaryPhone, secondaryPhone] = useRemoveCountryCode(phoneNoPrimary, phoneNoSecondary);
    useEffect(() => {
        if (phoneNoPrimary && phoneNoSecondary) {
            console.log(primaryPhone, secondaryPhone);
            console.log(updateEmployeeData);
            reset({ ...updateEmployeeData, primary_phone: primaryPhone, secondary_phone: secondaryPhone, country_code1: "+880", show_country_code1: "+880", country_code2: "+880", show_country_code2: "+880" });
        }
    }, [phoneNoPrimary, phoneNoSecondary]);

    const handleOnChange = (field, event) => {
        // console.log("field name", event.target.name);
        // console.log("field value", event.target.value);

        if (employeeId === 'new') {
            //username
            if (event.target.name === 'username') {
                const username = event.target.value
                //console.log(username)
                fetch(`${CHECK_USERNAME}?username=${username}`)
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.username_exists) {
                            setError('username', {
                                type: 'manual',
                                message: 'Username already exists'
                            });
                        }
                    });
            }

            //email
            if (event.target.name === 'email') {
                const email = event.target.value;
                fetch(`${CHECK_EMAIL}?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data.email_exists) {
                            setError('email', {
                                type: 'manual',
                                message: 'Email already exists'
                            });
                        }
                    });
            }

            //primary_phone
            if (event.target.name === 'primary_phone') {
                const primaryPhn = event.target.value;
                //console.log(event.target.name);
                fetch(`${CHECK_PRIMARY_PHONE}?primary_phone=${primaryPhn}`)
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.primary_phone_exists) {
                            setError('primary_phone', {
                                type: 'manual',
                                message: 'Primary phone already exists'
                            });
                        }
                    });
            }

            //secondary_phone
            if (event.target.name === 'secondary_phone') {
                //console.log(event.target.name);

                const secondaryPhn = event.target.value;
                fetch(`${CHECK_SECONDARY_PHONE}?secondary_phone=${secondaryPhn}`)
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.secondary_phone_exists) {
                            setError('secondary_phone', {
                                type: 'manual',
                                message: 'Secondary phone already exists'
                            });
                        }
                    });
            }
        }
        if (employeeId !== 'new') {
            //username
            if (event.target.name === 'username') {
                const username = event.target.value
                console.log(username)
                fetch(`${CHECK_USERNAME_UPDATE}?username=${username}&user=${employeeId}`)
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.username_exists) {
                            setError('username', {
                                type: 'manual',
                                message: 'Username already exists'
                            });
                        }
                    });
            }

            //email
            if (event.target.name === 'email') {
                const email = event.target.value;
                console.log(email);
                fetch(`${CHECK_EMAIL_UPDATE}?email=${email}&user=${employeeId}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.email_exists)
                        if (data.email_exists) {
                            setError('email', {
                                type: 'manual',
                                message: 'Email already exists'
                            });
                        }
                    });
            }

            //primary_phone
            if (event.target.name === 'primary_phone') {
                const primaryPh = event.target.value;
                console.log(primaryPh);
                fetch(`${CHECK_PRIMARY_PHONE_UPDATE}?primary_phone=${primaryPh}&user=${employeeId}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.primary_phone_exists)
                        if (data.primary_phone_exists) {
                            setError('primary_phone', {
                                type: 'manual',
                                message: 'Primary phone already exists'
                            });
                        }
                    });
            }

            //secondary_phone
            if (event.target.name === 'secondary_phone') {
                //console.log(event.target.name);

                const secondaryPh = event.target.value;
                console.log(secondaryPh);
                fetch(`${CHECK_SECONDARY_PHONE_UPDATE}?secondary_phone=${secondaryPh}&user=${employeeId}`)
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.secondary_phone_exists) {
                            setError('secondary_phone', {
                                type: 'manual',
                                message: 'Secondary phone already exists'
                            });
                        }
                    });
            }
        }

    }

    return (
        <div>
            <Controller
                name="branch"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? branches.find(bnch => bnch.id === value) : null}
                        options={branches}
                        getOptionLabel={(option) => `${option.name}`}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        //value={employee && employee.branch}
                        //defaultValue={{ id: null, name: "Select a branch" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a branch"
                                label="Branch"
                                error={!!errors.branch}
                                required
                                helperText={errors?.branch?.message}
                                variant="outlined"
                                autoFocus
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />
            <Controller
                name="emp_id_no"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.emp_id_no}
                        required
                        helperText={errors?.emp_id_no?.message}
                        label="Employee Id"
                        id="employeeid"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                }
            />
            <Controller
                name="first_name"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.first_name}
                        required
                        helperText={errors?.first_name?.message}
                        label="First Name"
                        id="firstName"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                }
            />
            <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.last_name}
                        required
                        helperText={errors?.last_name?.message}
                        label="Last Name"
                        id="lastName"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="username"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.username}
                        required
                        helperText={errors?.username?.message}
                        onBlur={(event) => handleOnChange("username", event)}
                        label="User Name"
                        id="userName"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        type="text"
                        error={!!errors.email}
                        required
                        helperText={errors?.email?.message}
                        onBlur={(event) => handleOnChange("email", event)}
                        label="Email"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        user
                                    </Icon>
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            {!updateEmployee && <>
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
            </>
            }
            <Box
                style={{ display: "flex" }}
            >
                <Controller
                    name="country_code1"
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
                                //reset({ ...formState, country_code: newValue.value })
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
                <TextField
                    name="show_country_code1"
                    id="filled-read-only-input"
                    label="Country Code"
                    style={{ width: '150px' }}
                    value={getCountryCode1 || ""}
                    //defaultValue="Hello World"
                    className="mt-8 mb-16"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <Controller
                    name="primary_phone"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.primary_phone}
                            helperText={errors?.primary_phone?.message}
                            onBlur={(event) => handleOnChange("primary_phone", event)}
                            label="Phone"
                            id="primary_phone"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={field.value && { shrink: true }}
                        />
                    )}
                />
            </Box>
            <Box
                style={{ display: "flex" }}
            >
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
                                //reset({ ...formState, country_code: newValue.value })
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
                <TextField
                    name="show_country_code2"
                    id="filled-read-only-input"
                    label="Country Code"
                    style={{ width: '150px' }}
                    value={getCountryCode2 || ""}
                    //defaultValue="Hello World"
                    className="mt-8 mb-16"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <Controller
                    name="secondary_phone"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.secondary_phone}
                            helperText={errors?.secondary_phone?.message}
                            onBlur={(event) => handleOnChange("secondary_phone", event)}
                            label="Mobile"
                            id="secondary_phone"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={field.value && { shrink: true }}
                        />
                    )}
                />
            </Box>

            <Controller
                name="street_address_one"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.street_address_one}
                        helperText={errors?.street_address_one?.message}
                        required
                        label="Primary address"
                        id="address1"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="street_address_two"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.street_address_two}
                        helperText={errors?.street_address_two?.message}
                        label="Secondary address"
                        id="address2"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
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
                        defaultValue="2017-05-24"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            />
            <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? genders.find(gender => gender.id === value) : null}
                        options={genders}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        //defaultValue={{ id: null, name: "Select a gender" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a gender"
                                label="Gender"
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
                name="thana"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? thanas.find(thana => thana.id === value) : null}
                        options={thanas}
                        getOptionLabel={(option) => `${option.name}`}
                        //defaultValue={{ id: null, name: "Select a thana" }}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a police station"
                                label="Police Station"
                                variant="outlined"
                                required
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                )}
            />
            <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? cities.find(city => city.id === value) : null}
                        options={cities}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        //defaultValue={{ id: null, name: "Select a city" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a city"
                                label="District"
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
                name="country"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? countries.find(country => country.id === value) : null}
                        options={countries}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        //defaultValue={{ id: null, name: "Select a country" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a country"
                                label="Country"
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
                name="postal_code"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.postal_code}
                        helperText={errors?.postal_code?.message}
                        label="Postal Code"
                        id="postal_code"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="nid"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.nid}
                        helperText={errors?.nid?.message}
                        label="National Id"
                        id="nid"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            /><Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? roles.find(role => role.id === value) : null}
                        options={roles}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        //defaultValue={{ id: null, name: "Select a role" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a employee role"
                                label="Role"
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
                name="department"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? departments.find(department => department.id === value) : null}
                        options={departments}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        //defaultValue={{ id: null, name: "Select a deparment" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select a employee department"
                                label="Department"
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
                name="basic_money"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.basic_money}
                        helperText={errors?.basic_money?.message}
                        label="Basic Money"
                        id="basic_money"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="allowance_money"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.allowance_money}
                        helperText={errors?.allowance_money?.message}
                        label="Allowance Money"
                        id="allowance_money"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="emp_join_date"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="date"
                        label="Join Date"
                        error={!!errors.emp_join_date}
                        required
                        helperText={errors?.emp_join_date?.message}
                        type="date"
                        defaultValue="2017-05-24"
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
                                checked={field.value ? field.value : false}
                            />}
                        />
                    </FormControl>
                )}
            />
            <Controller
                name="is_admin"
                control={control}
                render={({ field }) => (
                    <FormControl>
                        <FormControlLabel
                            label="Is admin"
                            control={<Checkbox
                                {...field}
                                checked={field.value ? field.value : false}
                            />}
                        />
                    </FormControl>
                )}
            />
            <Typography className="mt-8 mb-8" variant="subtitle1" color="primary">
                Upload employee picture
            </Typography>
            {/* <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    hidden
                />
            </Button> */}
            {/* <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <Button
                        {...field}
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                )}
            /> */}
            {/* image upload*/}
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
                                //onChange={handlePreviewImage}
                                onChange={async e => {

                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        if (reader.readyState === 2) {
                                            setPreviewImage(reader.result);
                                        }
                                    }
                                    reader.readAsDataURL(e.target.files[0]);

                                    const file = e.target.files[0];
                                    //console.log(file);
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
                    image && !previewImage && <img src={`${BASE_URL}${image}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
                }

                <div style={{ width: '100px', height: '100px' }}>
                    <img
                        src={previewImage}
                        alt="Not found"
                    />
                </div>
            </div>
        </div >
    );
};

export default EmployeeForm;