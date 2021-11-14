import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCities, getCountries, getThanas } from '../../../../store/dataSlice';
import { saveBranch, updateBranch } from '../store/branchSlice';

function BranchForm(props) {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;

    const history = useHistory();
    const routeParams = useParams();
    const handleDelete = localStorage.getItem('branchEvent');

    const thanas = useSelector(state => state.data.thanas);
    const cities = useSelector(state => state.data.cities);
    const countrys = useSelector(state => state.data.countries);

    useEffect(() => {
        dispatch(getThanas());
        dispatch(getCountries());
        dispatch(getCities());
    }, []);

    function handleSaveBranch() {
        dispatch(saveBranch(getValues())).then((res) => {
            if (res.payload) {
                localStorage.setItem("branchAlert", "saveBranch")
                history.push('/apps/branch-management/branchs');
            }
        });
    }

    function handleUpdateBranch() {
        dispatch(updateBranch(getValues())).then((res) => {
            if (res.payload) {
                localStorage.setItem("branchAlert", "updateBranch")
                history.push('/apps/branch-management/branchs');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.branchId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveBranch()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.branchName) {
                handleUpdateBranch()
                console.log("updated")
            }
        }
    }


    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        InputLabelProps={field.value && { shrink: true }}
                        helperText={errors?.name?.message}
                        label="Name"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />
                )}
            />
            <Controller
                name="short_desc"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.short_desc}
                        InputLabelProps={field.value && { shrink: true }}
                        helperText={errors?.short_desc?.message}
                        id="short_desc"
                        label="Short Description"
                        type="text"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <Controller
                name="full_desc"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        id="full_desc"
                        label="Full Description"
                        type="text"
                        error={!!errors.full_desc}
                        InputLabelProps={field.value && { shrink: true }}
                        helperText={errors?.full_desc?.message}
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
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
                name="street_address_one"
                control={control}
                render={({ field }) => {
                    return (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.street_address_one}
                            helperText={errors?.street_address_one?.message}
                            label="Primary address"
                            id="street_address_one"
                            required
                            variant="outlined"
                            InputLabelProps={field.value && { shrink: true }}
                            fullWidth
                            onKeyDown={handleSubmitOnKeyDownEnter}
                        />
                    );
                }}
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
                        id="street_address_two"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />
                )}
            />
            <Controller
                name="postal_code"
                control={control}
                render={({ field }) => {
                    return (
                        <TextField
                            {...field}
                            className="mt-8 mb-16"
                            error={!!errors.postal_code}
                            helperText={errors?.postal_code?.message}
                            label="Postal Code"
                            id="postal_code"
                            variant="outlined"
                            InputLabelProps={field.value && { shrink: true }}
                            fullWidth
                            onKeyDown={handleSubmitOnKeyDownEnter}
                        />
                    );
                }}
            />
            <Controller
                name="thana"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? thanas.find(data => data.id === value) : null}
                        options={thanas}
                        getOptionLabel={option => `${option?.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id);
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select Thana"
                                label="Thana"
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
                        value={value ? cities?.find(data => data.id === value) : null}
                        options={cities}
                        getOptionLabel={option => `${option?.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id);
                        }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                placeholder="Select City"
                                label="City"
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
                        value={value ? countrys.find(data => data.id === value) : null}
                        options={countrys}
                        getOptionLabel={option => `${option?.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id);
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
        </div>
    );
}
export default BranchForm;