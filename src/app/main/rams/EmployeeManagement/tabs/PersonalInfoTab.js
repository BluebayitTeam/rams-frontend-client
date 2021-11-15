import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { maritalStatuses } from 'app/@data/@data';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDesignations } from '../../../../store/dataSlice';
import { saveEmployee, updateEmployee } from '../store/employeeSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function EmployeeForm(props) {
    const userID = localStorage.getItem('user_id')
    const designations = useSelector(state => state.data.designations)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { employeeId } = routeParams;
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('employeeEvent');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDesignations())
    }, [])

    function handleSaveEmployee() {
        const data = getValues();
        data.primary_phone = data.country_code1 + data.primary_phone;
        if (data.country_code2 && data.secondary_phone)
            data.secondary_phone = data.country_code2 + data.secondary_phone;
        console.log(data.primary_phone);
        dispatch(saveEmployee(data)).then((res) => {
            if (res.payload) {
                localStorage.setItem('employeeAlertPermission', 'saveEmployeeSuccessfully')
                history.push('/apps/employee-management/employees')
            }
        });
    }

    function handleUpdateEmployee() {
        dispatch(updateEmployee(getValues())).then((res) => {
            if (res.payload) {
                localStorage.setItem('employeeAlertPermission', 'updateEmployeeSuccessfully')
                history.push('/apps/employee-management/employees')
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.employeeId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveEmployee()
                console.log("saved")
            }
            else if (!handleDelete && routeParams?.employeeName) {
                handleUpdateEmployee()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={employeeId === 'new' ? 'created_by' : 'updated_by'}
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
                name="designation"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? designations.find(data => data.id == value) : null}
                        options={designations}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Designation"
                                label="Designation"
                                error={!!errors.designation}
                                required
                                helperText={errors?.designation?.message}
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
                name="marital_status"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? maritalStatuses.find(data => data.id == value) : null}
                        options={maritalStatuses}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Marital Status"
                                label="Marital Status"
                                error={!!errors.marital_status}
                                required
                                helperText={errors?.marital_status?.message}
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
                name="spouse_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.spouse_name}
                        helperText={errors?.spouse_name?.message}
                        label="Spouse Name"
                        id="spouse_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="marriage_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.marriage_date}
                        helperText={errors?.marriage_date?.message}
                        label="Marriage Date"
                        id="marriage_date"
                        type="date"
                        required
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

        </div>
    );
}

export default EmployeeForm
