import { Box } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';
import countryCodes from 'app/@data/@Countrycodes';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../constant/constants';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));

function SitesettingForm(props) {

    const userID = localStorage.getItem('UserID');
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState, watch } = methods;
    const { errors } = formState;
    const routeParams = useParams();
    const { sitesettingId } = routeParams;
    const image1 = watch('logo');
    const image2 = watch('favicon');
    const getCountryCode1 = watch('country_code1');
    const [previewImage1, setPreviewImage1] = useState();
    const [previewImage2, setPreviewImage2] = useState();

    return (

        <div>
            <Controller
                name="title"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.title}
                        helperText={errors?.title?.message}
                        label="Title"
                        id="title"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />
            <Controller
                name="site_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.site_name}
                        helperText={errors?.site_name?.message}
                        label="Site Name"
                        id="site_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />
            <Controller
                name="site_address"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.site_address}
                        helperText={errors?.site_address?.message}
                        label="Site Address"
                        id="site_address"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
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
                                    InputLabelProps={{ shrink: true }}
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
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.phone}
                            helperText={errors?.phone?.message}
                            //onBlur={(event) => handleOnChange("phone", event)}
                            label="Phone"
                            id="primary_phone"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={field.value && { shrink: true }}
                        />
                    )}
                />
            </Box>
            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        required
                        label="Address"
                        id="address"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="facebook_url"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.facebook_url}
                        helperText={errors?.facebook_url?.message}
                        required
                        label="Facebook Url"
                        id="facebook_url"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="twitter_url"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.twitter_url}
                        helperText={errors?.twitter_url?.message}
                        required
                        label="Twitter Url"
                        id="twitter_url"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Controller
                name="instagram_url"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.instagram_url}
                        helperText={errors?.instagram_url?.message}
                        required
                        label="Instagram Url"
                        id="instagram_url"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                )}
            />
            <Typography className="mt-8 mb-8" variant="subtitle1" color="primary">
                Upload a logo
            </Typography>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Controller
                    name="logo"
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
                                            setPreviewImage1(reader.result);
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
                    image1 && !previewImage1 && <img src={`${BASE_URL}${image1}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
                }

                <div style={{ width: '100px', height: '100px' }}>
                    <img
                        src={previewImage1}
                        alt="Not found"
                    />
                </div>
            </div>
            <Typography className="mt-8 mb-8" variant="subtitle1" color="primary">
                Upload a Favicon
            </Typography>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
                <Controller
                    name="favicon"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <label
                            htmlFor="button-file2"
                            className={clsx(
                                classes.productImageUpload,
                                'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                            )}
                        >
                            <input
                                accept="image/*"
                                className="hidden"
                                id="button-file2"
                                type="file"
                                onChange={async e => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        if (reader.readyState === 2) {
                                            setPreviewImage2(reader.result);
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
                    image2 && !previewImage2 && <img src={`${BASE_URL}${image2}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
                }

                <div style={{ width: '100px', height: '100px' }}>
                    <img
                        src={previewImage2}
                        alt="Not found"
                    />
                </div>
            </div>
        </div>
    );
}

export default SitesettingForm;