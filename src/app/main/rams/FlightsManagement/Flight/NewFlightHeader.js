import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { activeRetrnCncl, removeAlertMsg, saveAlertMsg, updateAlertMsg } from 'app/@data/data';
import { setAlert } from 'app/store/alertSlice';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeFlight, saveFlight, updateFlight } from '../store/flightSlice';

const NewFlightHeader = () => {
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

    function handleSaveFlight() {
        dispatch(saveFlight(getValues())).then((res) => {
            console.log("saveFlightRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("flightAlert", "saveFlight")
                history.push('/apps/flight-management/flight/new');
                reset({ ticket_status: activeRetrnCncl.find(data => data.default)?.id })
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateFlight() {
        dispatch(updateFlight(getValues())).then((res) => {
            console.log("updateFlightRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("flightAlert", "updateFlight")
                history.push('/apps/flight-management/flight/new');
                reset({ ticket_status: activeRetrnCncl.find(data => data.default)?.id })
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    function handleRemoveFlight() {
        dispatch(removeFlight(getValues())).then((res) => {
            console.log("removeFlightRes", res)
            if (res.payload) {
                localStorage.setItem("flightAlert", "deleteFlight")
                history.push('/apps/flight-management/flight/new');
                reset({ ticket_status: activeRetrnCncl.find(data => data.default)?.id })
                dispatch(setAlert(removeAlertMsg))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/flight-management/flight/new')
        reset({ ticket_status: activeRetrnCncl.find(data => data.default)?.id })
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.flightId === "new" ? 'Create New Flight' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.flightId !== "new" && "Flights Detail"}
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
                {routeParams.flightId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveFlight}
                >
                    Save
                </Button>}
                {routeParams?.flightId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateFlight}
                >
                    Update
                </Button>}
                {routeParams?.flightId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveFlight}
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

export default NewFlightHeader;
