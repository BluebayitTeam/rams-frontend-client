import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { doneNotDone, removeAlertMsg, saveAlertMsg, updateAlertMsg } from 'app/@data/data';
import { setAlert } from 'app/store/alertSlice';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeEmbassy, saveEmbassy, updateEmbassy } from '../store/embassySlice';

const NewEmbassyHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const passengers = useSelector(state => state.data.passengers)

    const routeParams = useParams();

    function handleSaveEmbassy() {
        dispatch(saveEmbassy(getValues())).then((res) => {
            console.log("saveEmbassyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("embassyAlert", "saveEmbassy")
                history.push('/apps/embassy-management/embassy/new');
                reset({ stamping_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateEmbassy() {
        dispatch(updateEmbassy(getValues())).then((res) => {
            console.log("updateEmbassyRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("embassyAlert", "updateEmbassy")
                history.push('/apps/embassy-management/embassy/new');
                reset({ stamping_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    function handleRemoveEmbassy() {
        dispatch(removeEmbassy(getValues())).then((res) => {
            console.log("removeEmbassyRes", res)
            if (res.payload) {
                localStorage.setItem("embassyAlert", "deleteEmbassy")
                history.push('/apps/embassy-management/embassy/new');
                reset({ stamping_status: doneNotDone.find(data => data.default)?.id })
                dispatch(setAlert(removeAlertMsg))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/embassy-management/embassy/new')
        reset({ stamping_status: doneNotDone.find(data => data.default)?.id })
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.embassyId === "new" ? 'Create New Embassy' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.embassyId !== "new" && "Embassy Detail"}
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* <motion.div>
                <Alert />
            </motion.div> */}
            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
            >
                {routeParams.embassyId === 'new' && watch('createPermission') && (<Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveEmbassy}
                >
                    Save
                </Button>)}
                {routeParams?.embassyId !== 'new' && watch('passenger') && watch('updatePermission') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateEmbassy}
                >
                    Update
                </Button>}
                {routeParams?.embassyId !== 'new' && watch('passenger') && watch('updatePermission') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveEmbassy}
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

export default NewEmbassyHeader;
