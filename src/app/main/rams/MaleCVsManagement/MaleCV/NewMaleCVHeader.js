import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeMaleCV, saveMaleCV, updateMaleCV } from '../store/maleCVSlice';

const NewMaleCVHeader = () => {
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

    function handleSaveMaleCV() {
        dispatch(saveMaleCV(getValues())).then((res) => {
            console.log("saveMaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("maleCVAlert", "saveMaleCV")
                history.push('/apps/maleCV-management/maleCV/new');
                reset({})
            }
        });
    }

    function handleUpdateMaleCV() {
        dispatch(updateMaleCV(getValues())).then((res) => {
            console.log("updateMaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("maleCVAlert", "updateMaleCV")
                history.push('/apps/maleCV-management/maleCV/new');
                reset({})
            }
        });
    }

    function handleRemoveMaleCV() {
        dispatch(removeMaleCV(getValues())).then((res) => {
            console.log("removeMaleCVRes", res)
            if (res.payload) {
                localStorage.setItem("maleCVAlert", "deleteMaleCV")
                history.push('/apps/maleCV-management/maleCV/new');
                reset({})
            }
        });
    }

    function handleCancel() {
        history.push('/apps/maleCV-management/maleCV/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.maleCVId === "new" ? 'Create New MaleCV' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.maleCVId !== "new" && "MaleCVs Detail"}
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
                {routeParams.maleCVId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveMaleCV}
                >
                    Save
                </Button>}
                {routeParams?.maleCVId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateMaleCV}
                >
                    Update
                </Button>}
                {routeParams?.maleCVId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveMaleCV}
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

export default NewMaleCVHeader;