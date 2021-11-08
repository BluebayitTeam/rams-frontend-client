import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getParentMenus } from '../../../../store/dataSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function MenuForm(props) {
    const userID = localStorage.getItem('UserID')
    const dispatch = useDispatch()
    const parents = useSelector(state => state.data.parentMenus)
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const routeParams = useParams();
    const { menuId } = routeParams;

    useEffect(() => {
        dispatch(getParentMenus())
    }, [])

    return (
        <div>

            <Controller
                name={menuId === 'new' ? 'created_by' : 'updated_by'}
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
                name="parent"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? parents.find(data => data.id == value) : null}
                        options={parents}
                        getOptionLabel={(option) => `${option?.translate}`}
                        onChange={(event, newValue) => {
                            onChange(newValue.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Parent"
                                label="Parent"
                                error={!!errors.parent}
                                required
                                helperText={errors?.parent?.message}
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
                name="menu_id"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.menu_id}
                        helperText={errors?.menu_id?.message}
                        label="Menu ID"
                        id="menu_id"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />


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
                name="translate"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.translate}
                        helperText={errors?.translate?.message}
                        label="Translate"
                        id="translate"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <Controller
                name="type"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.type}
                        helperText={errors?.type?.message}
                        label="Type"
                        id="type"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <Controller
                name="icon"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.icon}
                        helperText={errors?.icon?.message}
                        label="Icon"
                        id="icon"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <Controller
                name="url"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.url}
                        helperText={errors?.url?.message}
                        label="Url"
                        id="url"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    />)
                }}
            />

            <Controller
                name="exact"
                control={control}
                render={({ field }) => (
                    <FormControl>
                        <FormControlLabel
                            required
                            label="Exact"
                            control={<Checkbox
                                {...field}
                                checked={field.value ? field.value : false}
                            />}
                        />
                    </FormControl>
                )}
            />

        </div>
    );
}

export default MenuForm