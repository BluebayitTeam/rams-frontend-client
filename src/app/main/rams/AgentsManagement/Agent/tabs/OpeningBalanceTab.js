import _ from '@lodash';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveAgent, updateAgent } from '../../store/agentSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));


function OpeningBalance(props) {
    const userID = localStorage.getItem('user_id')
    const classes = useStyles(props);
    const methods = useFormContext();
    const routeParams = useParams();
    const { agentId } = routeParams;
    const { control, formState, getValues, setError } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const history = useHistory();
    const handleDelete = localStorage.getItem('agentEvent');
    const dispatch = useDispatch()

    function handleSaveAgent() {
        dispatch(saveAgent(getValues())).then((res) => {
            console.log("saveAgentRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("agentAlert", "saveAgent")
                history.push('/apps/agent-management/agents')
            }
            else if (res.payload?.data) {
                const detail = res.payload.data
                for (let name in detail) {
                    setError(`${name}`, {
                        type: 'manual',
                        message: detail[name]
                    })
                }
            }
        });
    }

    function handleUpdateAgent() {
        dispatch(updateAgent(getValues())).then((res) => {
            console.log("updateAgentRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("agentAlert", "updateAgent")
                history.push('/apps/agent-management/agents');
            }
            else if (res.payload?.data) {
                const detail = res.payload.data
                for (let name in detail) {
                    setError(`${name}`, {
                        type: 'manual',
                        message: detail[name]
                    })
                }
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.agentId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveAgent()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.agentName) {
                handleUpdateAgent()
                console.log("updated")
            }
        }
    }

    return (
        <div>

            <Controller
                name={agentId === 'new' ? 'created_by' : 'updated_by'}
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
                name="balance_type"
                control={control}
                render={({ field }) => (
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className="text-14">
                            Balance Type
                        </FormLabel>
                        <RadioGroup {...field} aria-label="Layout Direction" className={classes.group} row>
                            <FormControlLabel key="creditors" value="creditors" control={<Radio checked={getValues().balance_type === "creditors" ? true : false} color="primary" />} label="Creditor's" />
                            <FormControlLabel key="debtors" value="debtors" control={<Radio checked={getValues().balance_type === "debtors" ? true : false} color="primary" />} label="Debtor's" />
                        </RadioGroup>
                    </FormControl>
                )}
            />

            <Controller
                name="balance_date"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.balance_date}
                        helperText={errors?.balance_date?.message}
                        label="Date"
                        id="balance_date"
                        required
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="balance_amount"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.balance_amount}
                        helperText={errors?.balance_amount?.message}
                        label="Amount"
                        id="balance_amount"
                        type="number"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="balance_note"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.balance_note}
                        helperText={errors?.balance_note?.message}
                        label="Balance Notes *"
                        id="balance_note"
                        multiline
                        rows={4}
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                    // onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


        </div>
    );
}

export default OpeningBalance