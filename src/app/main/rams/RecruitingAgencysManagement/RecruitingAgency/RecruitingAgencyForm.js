import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveRecruitingAgency, updateRecruitingAgency } from '../store/recruitingAgencySlice';



const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function RecruitingAgencyForm(props) {


    const userID = localStorage.getItem('user_id')


    const classes = useStyles(props);

    const methods = useFormContext();

    const routeParams = useParams();
    const { recruitingAgencyId } = routeParams;
    const { control, formState, getValues, setError } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('recruitingAgencyEvent');
    const dispatch = useDispatch()



    function handleSaveRecruitingAgency() {
        dispatch(saveRecruitingAgency(getValues())).then((res) => {
            console.log("saveRecruitingAgencyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("recruitingAgencyAlert", "saveRecruitingAgency")
                history.push('/apps/recruitingAgency-management/recruitingAgencys');
            }
            else if (res.payload?.data?.detail) {
                setError("name", { type: "manual", message: res.payload.data.detail })
                console.log(res.payload.data.detail)
            }
        });
    }

    function handleUpdateRecruitingAgency() {
        dispatch(updateRecruitingAgency(getValues())).then((res) => {
            console.log("updateRecruitingAgencyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("recruitingAgencyAlert", "updateRecruitingAgency")
                history.push('/apps/recruitingAgency-management/recruitingAgencys');
            }
            else if (res.payload?.data?.detail) {
                setError("name", { type: "manual", message: res.payload.data.detail })
                console.log(res.payload.data.detail)
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.recruitingAgencyId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveRecruitingAgency()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.recruitingAgencyName) {
                handleUpdateRecruitingAgency()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={recruitingAgencyId === 'new' ? 'created_by' : 'updated_by'}
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
                name="address"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        label="Address"
                        id="address"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="rl_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.rl_no}
                        helperText={errors?.rl_no?.message}
                        label="RL No"
                        id="rl_no"
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

export default RecruitingAgencyForm