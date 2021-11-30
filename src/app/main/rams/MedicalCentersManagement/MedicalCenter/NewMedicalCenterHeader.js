import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeMedicalCenter, saveMedicalCenter, updateMedicalCenter } from '../store/medicalCenterSlice';


const NewMedicalCenterHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('name');
    const theme = useTheme();
    const history = useHistory();



    const routeParams = useParams();

    function handleSaveMedicalCenter() {
        dispatch(saveMedicalCenter(getValues())).then((res) => {
            console.log("saveMedicalCenterRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalCenterAlert", "saveMedicalCenter")
                history.push('/apps/medicalCenter-management/medicalCenter/new');
                reset({})
            }
        });
    }

    function handleUpdateMedicalCenter() {
        dispatch(updateMedicalCenter(getValues())).then((res) => {
            console.log("updateMedicalCenterRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("medicalCenterAlert", "updateMedicalCenter")
                history.push('/apps/medicalCenter-management/medicalCenter/new');
                reset({})
            }
        });
    }

    function handleRemoveMedicalCenter() {
        dispatch(removeMedicalCenter(getValues())).then((res) => {
            console.log("removeMedicalCenterRes", res)
            if (res.payload) {
                localStorage.setItem("medicalCenterAlert", "deleteMedicalCenter")
                history.push('/apps/medicalCenter-management/medicalCenter/new');
                reset({})
            }
        });
    }

    function handleCancel() {
        history.push('/apps/medicalCenter-management/medicalCenter/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.medicalCenterId === "new" ? 'Create New MedicalCenter' : routeParams.medicalCenterId}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.medicalCenterId !== "new" && "MedicalCenters Detail"}
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
                {routeParams.medicalCenterId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveMedicalCenter}
                >
                    Save
                </Button>}
                {routeParams?.medicalCenterId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateMedicalCenter}
                >
                    Update
                </Button>}
                {routeParams?.medicalCenterId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveMedicalCenter}
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

export default NewMedicalCenterHeader;