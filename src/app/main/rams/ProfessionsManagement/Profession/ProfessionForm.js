import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveProfession, updateProfession } from '../store/professionSlice';



const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function ProfessionForm(props) {
    const userID = localStorage.getItem('UserID')
    const classes = useStyles(props);
    const methods = useFormContext();
    const routeParams = useParams();
    const { professionId } = routeParams;
    const { control, formState, getValues, setError } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('professionEvent');
    const dispatch = useDispatch()

    function handleSaveProfession() {
        dispatch(saveProfession(getValues())).then((res) => {
            console.log("saveProfessionRes", res)
            if (res.payload) {
                if (res.payload.data?.detail) {
                    setError("name", { type: "manual", message: res.payload.data.detail })
                } else {
                    localStorage.setItem("professionAlert", "saveProfession")
                    history.push('/apps/profession-management/professions')
                }
            }
        });
    }

    function handleUpdateProfession() {
        dispatch(updateProfession(getValues())).then((res) => {
            if (res.payload) {
                if (res.payload.data?.detail) {
                    setError("name", { type: "manual", message: res.payload.data.detail })
                } else {
                    localStorage.setItem("professionAlert", "updateProfession")
                    history.push('/apps/profession-management/professions')
                }
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.professionId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveProfession()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.professionName) {
                handleUpdateProfession()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={professionId === 'new' ? 'created_by' : 'updated_by'}
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
        </div>
    );
}

export default ProfessionForm