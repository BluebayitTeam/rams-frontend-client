import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { doneNotDone, medicalResults, removeAlertMsg, saveAlertMsg, updateAlertMsg } from 'app/@data/data';
import { setAlert } from 'app/store/alertSlice';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeMedical, saveMedical, updateMedical } from '../store/medicalSlice';

const NewMedicalHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    function handleSaveMedical() {
        dispatch(saveMedical(getValues())).then((res) => {
            console.log("saveMedicalRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalAlert", "saveMedical")
                history.push('/apps/medical-management/medical/new');
                reset({ medical_card: doneNotDone.find(data => data.default)?.id, medical_result: medicalResults.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateMedical() {
        dispatch(updateMedical(getValues())).then((res) => {
            console.log("updateMedicalRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalAlert", "updateMedical")
                history.push('/apps/medical-management/medical/new');
                reset({ medical_card: doneNotDone.find(data => data.default)?.id, medical_result: medicalResults.find(data => data.default)?.id })
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    function handleRemoveMedical() {
        dispatch(removeMedical(getValues())).then((res) => {
            console.log("removeMedicalRes", res)
            if (res.payload) {
                localStorage.setItem("medicalAlert", "deleteMedical")
                history.push('/apps/medical-management/medical/new');
                reset({ medical_card: doneNotDone.find(data => data.default)?.id, medical_result: medicalResults.find(data => data.default)?.id })
                dispatch(setAlert(removeAlertMsg))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/medical-management/medical/new')
        reset({ medical_card: doneNotDone.find(data => data.default)?.id, medical_result: medicalResults.find(data => data.default)?.id })
    }

    console.log("getValues", getValues())


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                {/* <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/medical-management/medical/new"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Medicals</span>
                    </Typography>
                </motion.div> */}

                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.medicalId === "new" ? 'Create New Medical' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.medicalId !== "new" && "Medicals Detail"}
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
                {routeParams.medicalId == 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveMedical}
                >
                    Save
                </Button>}
                {routeParams?.medicalId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateMedical}
                >
                    Update
                </Button>}
                {routeParams?.medicalId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveMedical}
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

export default NewMedicalHeader;