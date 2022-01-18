
import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveDepartment, updateDepartment } from '../store/departmentSlice';

function DepartmentForm(props) {

    const methods = useFormContext();
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const history = useHistory();
    const handleDelete = localStorage.getItem('departmentEvent');
    const dispatch = useDispatch()

    function handleSaveDepartment() {
        dispatch(saveDepartment(getValues())).then((res) => {
            console.log("saveDepartmentRes", res)
            if (res.payload) {
                localStorage.setItem("departmentAlert", "saveDepartment")
                history.push('/apps/department-management/departments');
            }
        });
    }

    function handleUpdateDepartment() {
        dispatch(updateDepartment(getValues())).then((res) => {
            console.log("updateDepartmentRes", res)
            if (res.payload) {
                localStorage.setItem("departmentAlert", "updateDepartment")
                history.push('/apps/department-management/departments');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.departmentId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveDepartment()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.departmentName) {
                handleUpdateDepartment()
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
                    console.log(field)
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

        </div>
    );
}

export default DepartmentForm
