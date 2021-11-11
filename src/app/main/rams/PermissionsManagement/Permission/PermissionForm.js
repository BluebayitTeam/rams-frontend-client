import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { React } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { savePermission, updatePermission } from '../store/permissionSlice';


function PermissionForm(props) {

    const methods = useFormContext();
    const { control, formState, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;

    const routeParams = useParams();
    const history = useHistory();
    const handleDelete = localStorage.getItem('permissionEvent');

    const dispatch = useDispatch();

    function handleSavePermission() {
        dispatch(savePermission(getValues())).then((res) => {
            console.log("savePermissionRes", res)
            if (res.payload.data?.detail) {
                console.log("dublicate")
                setError("name", { type: "manual", message: res.payload.data.detail })
            }
            else {
                localStorage.setItem("permissionAlert", "savePermission")
                history.push('/apps/permission-management/permissions')
            }
        });
    }

    function handleUpdatePermission() {
        dispatch(updatePermission(getValues())).then((res) => {
            if (res.payload?.data?.detail) {
                console.log("dublicate")
                setError("name", { type: "manual", message: res.payload.data.detail })
            }
            else {
                localStorage.setItem("permissionAlert", "updatePermission")
                history.push('/apps/permission-management/permissions');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.permissionId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSavePermission()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.permissionName) {
                handleUpdatePermission()
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
        </div>
    );
}

export default PermissionForm
