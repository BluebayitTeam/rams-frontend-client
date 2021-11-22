import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { removePassenger, savePassenger, updatePassenger } from '../store/passengerSlice';

const NewPassengerHeader = ({ disableUpdate }) => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('passenger_id');
    const theme = useTheme();
    const history = useHistory();

    const routeParams = useParams();

    const handleDelete = localStorage.getItem('passengerEvent');

    function handleSavePassenger() {
        dispatch(savePassenger(getValues())).then((res) => {
            console.log("savePassengerRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("passengerAlert", "savePassenger")
                history.push('/apps/passenger-management/passengers');
            }
        });
    }

    function handleUpdatePassenger() {
        dispatch(updatePassenger(getValues())).then((res) => {
            console.log("updatePassengerRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("passengerAlert", "updatePassenger")
                history.push('/apps/passenger-management/passengers');
            }
        });
    }

    function handleRemovePassenger() {
        dispatch(removePassenger(getValues())).then((res) => {
            console.log("removePassengerRes", res)
            if (res.payload) {
                localStorage.removeItem("passengerEvent")
                localStorage.setItem("passengerAlert", "deletePassenger")
                history.push('/apps/passenger-management/passengers');
            }
        });
    }

    function handleCancel() {
        history.push('/apps/passenger-management/passengers')
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/passenger-management/passengers"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Passengers</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    {/* <motion.div
                        className="hidden sm:flex"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >
                        {image && featuredImageId ? (
                            <img
                                className="w-32 sm:w-48 rounded"
                                src={_.find(image, { id: featuredImageId }).url}
                                alt={name}
                            />
                        ) : (
                            <img
                                className="w-32 sm:w-48 rounded"
                                src={`${BASE_URL}${image}`}
                                alt={name}
                            />
                        )}

                    </motion.div> */}
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {name || 'Create New Passenger'}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                Passengers Detail
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
                {
                    handleDelete == 'Delete' &&
                    <Typography
                        className='mt-6'
                        variant="subtitle2"
                    >
                        Do you want to remove this Passenger?
                    </Typography>
                }
                {handleDelete == 'Delete' && routeParams.passengerId !== "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemovePassenger}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {routeParams.passengerId == "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSavePassenger}
                >
                    Save
                </Button>}
                {handleDelete !== 'Delete' && routeParams?.passengerName && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    disabled={disableUpdate}
                    style={{ backgroundColor: disableUpdate || "#4dc08e", color: 'white' }}
                    onClick={handleUpdatePassenger}
                >
                    Update
                </Button>}
                <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    style={{ backgroundColor: '#FFAA4C', color: 'white' }}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
            </motion.div>
        </div>
    );
};

export default NewPassengerHeader;