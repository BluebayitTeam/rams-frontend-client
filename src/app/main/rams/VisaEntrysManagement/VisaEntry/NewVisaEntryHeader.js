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
import { removeVisaEntry, saveVisaEntry, updateVisaEntry } from '../store/visaEntrySlice';


const NewVisaEntryHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('visa_number');
    const theme = useTheme();
    const history = useHistory();

    const routeParams = useParams();

    const handleDelete = localStorage.getItem('visaEntryEvent');

    function handleSaveVisaEntry() {
        dispatch(saveVisaEntry(getValues())).then((res) => {
            console.log("saveVisaEntryRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("visaEntryAlert", "saveVisaEntry")
                history.push('/apps/visaEntry-management/visaEntrys');
            }
        });
    }

    function handleUpdateVisaEntry() {
        dispatch(updateVisaEntry(getValues())).then((res) => {
            console.log("updateVisaEntryRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("visaEntryAlert", "updateVisaEntry")
                history.push('/apps/visaEntry-management/visaEntrys');
            }
        });
    }

    function handleRemoveVisaEntry() {
        dispatch(removeVisaEntry(getValues())).then((res) => {
            console.log("removeVisaEntryRes", res)
            if (res.payload) {
                localStorage.removeItem("visaEntryEvent")
                localStorage.setItem("visaEntryAlert", "deleteVisaEntry")
                history.push('/apps/visaEntry-management/visaEntrys');
            }
        });
    }

    function handleCancel() {
        history.push('/apps/visaEntry-management/visaEntrys')
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/visaEntry-management/visaEntrys"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">VisaEntries</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div
                        className="hidden sm:flex"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >


                    </motion.div>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {name || 'Create New VisaEntry'}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                VisaEntry Detail
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
                        Do you want to remove this VisaEntry?
                    </Typography>
                }
                {handleDelete == 'Delete' && routeParams.visaEntryId !== "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveVisaEntry}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {routeParams.visaEntryId == "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveVisaEntry}
                >
                    Save
                </Button>}
                {handleDelete !== 'Delete' && routeParams?.visaEntryName && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateVisaEntry}
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

export default NewVisaEntryHeader;