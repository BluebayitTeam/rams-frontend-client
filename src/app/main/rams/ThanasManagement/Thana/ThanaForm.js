import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCities } from '../../../../store/dataSlice';
import { saveThana, updateThana } from '../store/thanaSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function ThanaForm(props) {

    const userID = localStorage.getItem('user_id')

    const citys = useSelector(state => state.data.cities)

    const classes = useStyles(props);

    const methods = useFormContext();
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const { thanaId } = routeParams;
    const history = useHistory();
    const handleDelete = localStorage.getItem('thanaEvent');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCities())
    }, [])


    function handleSaveThana() {
        dispatch(saveThana(getValues())).then((res) => {
            console.log("saveThanaRes", res)
            if (res.payload) {
                localStorage.setItem("thanaAlert", "saveThana")
                history.push('/apps/thana-management/thanas');
            }
        });
    }

    function handleUpdateThana() {
        dispatch(updateThana(getValues())).then((res) => {
            console.log("updateThanaRes", res)
            if (res.payload) {
                localStorage.setItem("thanaAlert", "updateThana")
                history.push('/apps/thana-management/thanas');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.thanaId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveThana()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.thanaName) {
                handleUpdateThana()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={thanaId === 'new' ? 'created_by' : 'updated_by'}
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
                name="city"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? citys.find(data => data.id === value) : null}
                        options={citys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
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



        </div>
    );
}

export default ThanaForm