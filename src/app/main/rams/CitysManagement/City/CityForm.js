import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCountries } from '../../../../store/dataSlice';
import { saveCity, updateCity } from '../store/citySlice';


function CityForm(props) {
    const dispatch = useDispatch()
    const countries = useSelector(state => state.data.countries)
    const methods = useFormContext();
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const history = useHistory();
    const handleDelete = localStorage.getItem('cityEvent');

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    function handleSaveCity() {
        dispatch(saveCity(getValues())).then((res) => {
            if (res.payload) {
                localStorage.setItem("cityAlert", "saveCity")
                history.push('/apps/city-management/cities')
            }
        });
    }

    function handleUpdateCity() {
        dispatch(updateCity(getValues())).then((res) => {
            if (res.payload) {
                localStorage.setItem("cityAlert", "updateCity")
                history.push('/apps/city-management/cities')
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.cityId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveCity()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.cityName) {
                handleUpdateCity()
                console.log("updated")
            }
        }
    }

    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        label="Name"
                        id="name"
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
                        value={value ? countries.find(data => data.id === value) : null}
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
                            />
                        )}
                    />
                )}
            />
        </div>
    );
}

export default CityForm