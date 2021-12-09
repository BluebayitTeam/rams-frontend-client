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
import { removeVisaSubmissionList, saveVisaSubmissionList, updateVisaSubmissionList } from '../store/visaSubmissionListSlice';


const NewVisaSubmissionListHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const history = useHistory();

    const routeParams = useParams();

    const passengers = useSelector(state => state.data.passengers)

    function handleSaveVisaSubmissionList() {
        dispatch(saveVisaSubmissionList(getValues())).then((res) => {
            console.log("saveVisaSubmissionListRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("visaSubmissionListAlert", "saveVisaSubmissionList")
                history.push('/apps/visaSubmissionList-management/visaSubmissionList/new');
                reset({})
                dispatch(setAlert(saveAlertMsg))
            }
        });
    }

    function handleUpdateVisaSubmissionList() {
        dispatch(updateVisaSubmissionList(getValues())).then((res) => {
            console.log("updateVisaSubmissionListRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("visaSubmissionListAlert", "updateVisaSubmissionList")
                history.push('/apps/visaSubmissionList-management/visaSubmissionList/new');
                reset({})
                dispatch(setAlert(updateAlertMsg))
            }
        });
    }

    function handleRemoveVisaSubmissionList() {
        dispatch(removeVisaSubmissionList(getValues())).then((res) => {
            console.log("removeVisaSubmissionListRes", res)
            if (res.payload) {
                localStorage.setItem("visaSubmissionListAlert", "deleteVisaSubmissionList")
                history.push('/apps/visaSubmissionList-management/visaSubmissionList/new');
                reset({})
                dispatch(setAlert(removeAlertMsg))
            }
        });
    }

    function handleCancel() {
        history.push('/apps/visaSubmissionList-management/visaSubmissionList/new')
        reset({})
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {routeParams.visaSubmissionListId === "new" ? 'Create New VisaSubmissionList' : passengers?.find(({ id }) => id == watch("passenger"))?.passenger_name || ""}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                {routeParams.visaSubmissionListId !== "new" && "VisaSubmissionList Detail"}
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
                {routeParams.visaSubmissionListId === 'new' && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveVisaSubmissionList}
                >
                    Save
                </Button>}
                {routeParams?.visaSubmissionListId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateVisaSubmissionList}
                >
                    Update
                </Button>}
                {routeParams?.visaSubmissionListId !== 'new' && watch('passenger') && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveVisaSubmissionList}
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

export default NewVisaSubmissionListHeader;
