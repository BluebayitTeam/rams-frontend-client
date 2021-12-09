import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { removeAlertMsg, saveAlertMsg, updateAlertMsg } from 'app/@data/@data';
import { setAlert } from "app/store/alertSlice";
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeManPower, saveManPower, updateManPower } from '../store/manPowerSlice';

const NewManPowerHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    function handleSaveManPower() {
        dispatch(saveManPower(getValues())).then((res) => {
            console.log("saveManPowerRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("manPowerAlert", "saveManPower")
                history.push('/apps/manPower-management/manPower/new');
                reset({})
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateManPower() {
        dispatch(updateManPower(getValues())).then((res) => {
            console.log("updateManPowerRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("manPowerAlert", "updateManPower")
                history.push('/apps/manPower-management/manPower/new');
                reset({})
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    function handleRemoveManPower() {
        dispatch(removeManPower(getValues())).then((res) => {
            console.log("removeManPowerRes", res)
            if (res.payload) {
                localStorage.setItem("manPowerAlert", "deleteManPower")
                history.push('/apps/manPower-management/manPower/new');
                reset({})
                dispatch(setAlert(removeAlertMsg))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/manPower-management/manPower/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.manPowerId === "new" ? 'Create New ManPower' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.manPowerId !== "new" && "ManPower Detail"}
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                {routeParams.manPowerId === 'new' && watch("createPermission") && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveManPower}
                >
                    Save
                </Button>}
                {routeParams?.manPowerId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateManPower}
                >
                    Update
                </Button>}
                {routeParams?.manPowerId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveManPower}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    style={{ backgroundColor: '#FFAA4C', color: 'white' }}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                }
            </motion.div>
        </div>
    );
};

export default NewManPowerHeader;

