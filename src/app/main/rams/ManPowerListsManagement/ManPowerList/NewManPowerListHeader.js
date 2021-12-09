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
import { removeManPowerList, saveManPowerList, updateManPowerList } from '../store/manPowerListSlice';


const NewManPowerListHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    function handleSaveManPowerList() {
        dispatch(saveManPowerList(getValues())).then((res) => {
            console.log("saveManPowerListRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("manPowerListAlert", "saveManPowerList")
                history.push('/apps/manPowerList-management/manPowerList/new');
                reset({})
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateManPowerList() {
        dispatch(updateManPowerList(getValues())).then((res) => {
            console.log("updateManPowerListRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("manPowerListAlert", "updateManPowerList")
                history.push('/apps/manPowerList-management/manPowerList/new');
                reset({})
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    function handleRemoveManPowerList() {
        dispatch(removeManPowerList(getValues())).then((res) => {
            console.log("removeManPowerListRes", res)
            if (res.payload) {
                localStorage.setItem("manPowerListAlert", "deleteManPowerList")
                history.push('/apps/manPowerList-management/manPowerList/new');
                reset({})
                dispatch(setAlert(removeAlertMsg))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/manPowerList-management/manPowerList/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.manPowerListId === "new" ? 'Create New ManPowerList' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.manPowerListId !== "new" && "ManPower List Detail"}
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
                {routeParams.manPowerListId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveManPowerList}
                >
                    Save
                </Button>}
                {routeParams?.manPowerListId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateManPowerList}
                >
                    Update
                </Button>}
                {routeParams?.manPowerListId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveManPowerList}
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

export default NewManPowerListHeader;