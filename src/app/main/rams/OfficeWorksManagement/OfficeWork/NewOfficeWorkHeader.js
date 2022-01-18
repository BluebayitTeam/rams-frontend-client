import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { doneNotDone, removeAlertMsg, saveAlertMsg, updateAlertMsg } from 'app/@data/data';
import { setAlert } from "app/store/alertSlice";
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeOfficeWork, saveOfficeWork, updateOfficeWork } from '../store/officeWorkSlice';

const NewOfficeWorkHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    const { fromSearch } = useParams()

    function handleSaveOfficeWork() {
        dispatch(saveOfficeWork(getValues())).then((res) => {
            console.log("saveOfficeWorkRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("officeWorkAlert", "saveOfficeWork")
                history.push('/apps/officeWork-management/officeWork/new');
                reset({ police_clearance_status: doneNotDone.find(data => data.default)?.id, driving_license_status: doneNotDone.find(data => data.default)?.id, finger_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateOfficeWork() {
        dispatch(updateOfficeWork(getValues())).then((res) => {
            console.log("updateOfficeWorkRes", res)
            if (res.payload?.data?.id) {
                if (fromSearch) {
                    history.goBack()
                }
                else {
                    localStorage.setItem("officeWorkAlert", "updateOfficeWork")
                    history.push('/apps/officeWork-management/officeWork/new');
                    reset({ police_clearance_status: doneNotDone.find(data => data.default)?.id, driving_license_status: doneNotDone.find(data => data.default)?.id, finger_status: doneNotDone.find(data => data.default)?.id })
                    dispatch(setAlert(updateAlertMsg))
                }
            }
        });
    }

    function handleRemoveOfficeWork() {
        dispatch(removeOfficeWork(getValues())).then((res) => {
            console.log("removeOfficeWorkRes", res)
            if (res.payload) {
                if (fromSearch) {
                    history.goBack()
                }
                else {
                    localStorage.setItem("officeWorkAlert", "deleteOfficeWork")
                    history.push('/apps/officeWork-management/officeWork/new');
                    reset({ police_clearance_status: doneNotDone.find(data => data.default)?.id, driving_license_status: doneNotDone.find(data => data.default)?.id, finger_status: doneNotDone.find(data => data.default)?.id })
                    dispatch(setAlert(removeAlertMsg))
                }
            }
        });
    }

    function handleCancel() {
        if (fromSearch) {
            history.goBack()
        }
        else {
            history.push('/apps/officeWork-management/officeWork/new')
            reset({ police_clearance_status: doneNotDone.find(data => data.default)?.id, driving_license_status: doneNotDone.find(data => data.default)?.id, finger_status: doneNotDone.find(data => data.default)?.id })
        }
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.officeWorkId === "new" ? 'Create New OfficeWork' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.officeWorkId !== "new" && "OfficeWork Detail"}
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
                {routeParams.officeWorkId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveOfficeWork}
                >
                    Save
                </Button>}
                {routeParams?.officeWorkId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateOfficeWork}
                >
                    Update
                </Button>}
                {routeParams?.officeWorkId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveOfficeWork}
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

export default NewOfficeWorkHeader;