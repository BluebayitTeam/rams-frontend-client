import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeFemaleCV, saveFemaleCV, updateFemaleCV } from '../store/femaleCVSlice';

const NewFemaleCVHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    function handleSaveFemaleCV() {
        dispatch(saveFemaleCV(getValues())).then((res) => {
            console.log("saveFemaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("femaleCVAlert", "saveFemaleCV")
                history.push('/apps/femaleCV-management/femaleCV/new');
                reset({})
            }
        });
    }

    function handleUpdateFemaleCV() {
        dispatch(updateFemaleCV(getValues())).then((res) => {
            console.log("updateFemaleCVRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("femaleCVAlert", "updateFemaleCV")
                history.push('/apps/femaleCV-management/femaleCV/new');
                reset({})
            }
        });
    }

    function handleRemoveFemaleCV() {
        dispatch(removeFemaleCV(getValues())).then((res) => {
            console.log("removeFemaleCVRes", res)
            if (res.payload) {
                localStorage.setItem("femaleCVAlert", "deleteFemaleCV")
                history.push('/apps/femaleCV-management/femaleCV/new');
                reset({})
            }
        });
    }

    function handleCancel() {
        history.push('/apps/femaleCV-management/femaleCV/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.femaleCVId === "new" ? 'Create New FemaleCV' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.femaleCVId !== "new" && "FemaleCVs Detail"}
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
                {routeParams.femaleCVId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveFemaleCV}
                >
                    Save
                </Button>}
                {routeParams?.femaleCVId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateFemaleCV}
                >
                    Update
                </Button>}
                {routeParams?.femaleCVId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveFemaleCV}
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

export default NewFemaleCVHeader;
