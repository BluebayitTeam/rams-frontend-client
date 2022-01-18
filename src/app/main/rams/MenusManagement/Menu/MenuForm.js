import _ from '@lodash';
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getParentMenus } from '../../../../store/dataSlice';
import { saveMenu, updateMenu } from '../store/menuSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function MenuForm(props) {
    const userID = localStorage.getItem('user_id')
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const { menuId } = routeParams;
    const history = useHistory();
    const handleDelete = localStorage.getItem('menuEvent');
    const dispatch = useDispatch()
    const parents = useSelector(state => state.data.parentMenus)

    useEffect(() => {
        dispatch(getParentMenus())
    }, [])

    function handleSaveMenu() {
        dispatch(saveMenu(getValues())).then((res) => {
            console.log("saveMenuRes", res)
            if (res.payload) {
                localStorage.setItem("menuAlert", "saveMenu")
                history.push('/apps/menu-management/menus');
            }
        });
    }

    function handleUpdateMenu() {
        dispatch(updateMenu(getValues())).then((res) => {
            console.log("updateMenuRes", res)
            if (res.payload) {
                localStorage.setItem("menuAlert", "updateMenu")
                history.push('/apps/menu-management/menus');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.menuId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveMenu()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.menuName) {
                handleUpdateMenu()
                console.log("updated")
            }
        }
    }


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
                            onChange(newValue?.id)
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
                                onKeyDown={handleSubmitOnKeyDownEnter}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                        onKeyDown={handleSubmitOnKeyDownEnter}
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
                                color="primary"
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