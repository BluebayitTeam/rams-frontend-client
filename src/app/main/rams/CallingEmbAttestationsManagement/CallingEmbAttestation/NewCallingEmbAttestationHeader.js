import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { setAlert } from "app/store/alertSlice";
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeCallingEmbAttestation, saveCallingEmbAttestation, updateCallingEmbAttestation } from '../store/callingEmbAttestationSlice';

const NewCallingEmbAttestationHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('name');
    const theme = useTheme();
    const history = useHistory();

    const image = watch('image');
    const featuredImageId = watch('featuredImageId');

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    function handleSaveCallingEmbAttestation() {
        dispatch(saveCallingEmbAttestation(getValues())).then((res) => {
            console.log("saveCallingEmbAttestationRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("callingEmbAttestationAlert", "saveCallingEmbAttestation")
                history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                reset({})
                dispatch(setAlert("save success"))
            }
        });
    }

    function handleUpdateCallingEmbAttestation() {
        dispatch(updateCallingEmbAttestation(getValues())).then((res) => {
            console.log("updateCallingEmbAttestationRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("callingEmbAttestationAlert", "updateCallingEmbAttestation")
                history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                reset({})
                dispatch(setAlert("update success"))
            }
        });
    }

    function handleRemoveCallingEmbAttestation() {
        dispatch(removeCallingEmbAttestation(getValues())).then((res) => {
            console.log("removeCallingEmbAttestationRes", res)
            if (res.payload) {
                localStorage.setItem("callingEmbAttestationAlert", "deleteCallingEmbAttestation")
                history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new');
                reset({})
                dispatch(setAlert("remove success"))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/callingEmbAttestation-management/callingEmbAttestation/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.callingEmbAttestationId === "new" ? 'Create New CallingEmbAttestation' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.callingEmbAttestationId !== "new" && "CallingEmbAttestation Detail"}
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
                {routeParams.callingEmbAttestationId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveCallingEmbAttestation}
                >
                    Save
                </Button>}
                {routeParams?.callingEmbAttestationId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateCallingEmbAttestation}
                >
                    Update
                </Button>}
                {routeParams?.callingEmbAttestationId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveCallingEmbAttestation}
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

export default NewCallingEmbAttestationHeader;
