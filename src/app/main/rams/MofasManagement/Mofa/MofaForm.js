import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAgencys, getPassengers } from '../../../../store/dataSlice';
import { saveMofa, updateMofa } from '../store/mofaSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
}));


function MofaForm(props) {
    const userID = localStorage.getItem('user_id')

    const mofaAgencys = useSelector(state => state.data.agencies)

    const classes = useStyles(props);

    const methods = useFormContext();
    const routeParams = useParams();
    const { mofaId } = routeParams;
    const { control, formState, getValues, reset } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPassengers());
        dispatch(getAgencys());
    }, [])


    function handleSaveMofa() {
        dispatch(saveMofa(getValues())).then((res) => {
            console.log("saveMofaRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("mofaAlert", "saveMofa")
                history.push('/apps/mofa-management/mofa/new');
                reset({})
            }
        });
    }

    function handleUpdateMofa() {
        dispatch(updateMofa(getValues())).then((res) => {
            console.log("updateMofaRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("mofaAlert", "updateMofa")
                history.push('/apps/mofa-management/mofa/new');
                reset({})
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.mofaId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveMofa()
                console.log("saved")
            }
            else if (routeParams.mofaId !== "new" && watch('passenger')) {
                handleUpdateMofa()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={mofaId === 'new' ? 'created_by' : 'updated_by'}
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
                        variant="outlined"
                        fullWidth
                    />)
                }}
            />

            <Controller
                name="mofa_agency"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? mofaAgencys.find(data => data.id == value) : null}
                        options={mofaAgencys}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Mofa Agency"
                                label="Mofa Agency"
                                error={!!errors.mofa_agency}
                                helperText={errors?.mofa_agency?.message}
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
                name="mofa_no"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.mofa_no}
                        helperText={errors?.mofa_no?.message}
                        label="Mofa No"
                        id="mofa_no"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="mofa_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.mofa_date}
                        helperText={errors?.mofa_date?.message}
                        type="date"
                        label="Mofa Date"
                        id="mofa_date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />)
                }}
            />


            <Controller
                name="re_mofa_charge"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.re_mofa_charge}
                        helperText={errors?.re_mofa_charge?.message}
                        label="Re Mofa Charge"
                        id="re_mofa_charge"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="re_mofa_status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.re_mofa_status}
                        helperText={errors?.re_mofa_status?.message}
                        label="Re Mofa Status"
                        id="re_mofa_status"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="why_re_mofa"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.why_re_mofa}
                        helperText={errors?.why_re_mofa?.message}
                        label="Why Re Mofa"
                        id="why_re_mofa"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <Controller
                name="mofa_status"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        value={field.value || ""}
                        className="mt-8 mb-16"
                        error={!!errors.mofa_status}
                        helperText={errors?.mofa_status?.message}
                        label="Mofa Status"
                        id="mofa_status"
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

export default MofaForm