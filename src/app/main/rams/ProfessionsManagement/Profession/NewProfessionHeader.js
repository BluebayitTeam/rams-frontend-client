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
import { removeProfession, saveProfession, updateProfession } from '../store/professionSlice';


const NewProfessionHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, setError } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('name');
    const theme = useTheme();
    const history = useHistory();
    const routeParams = useParams();
    const handleDelete = localStorage.getItem('professionEvent');

    function handleSaveProfession() {
        dispatch(saveProfession(getValues())).then((res) => {
            console.log("saveProfessionRes", res)
            if (res.payload) {
                if (res.payload.data?.detail) {
                    setError("name", { type: "manual", message: res.payload.data.detail })
                } else {
                    localStorage.setItem("professionAlert", "saveProfession")
                    history.push('/apps/profession-management/professions');
                }
            }
        });
    }

    function handleUpdateProfession() {
        dispatch(updateProfession(getValues())).then((res) => {
            console.log("updateProfessionRes", res)
            if (res.payload) {
                if (res.payload.data?.detail) {
                    setError("name", { type: "manual", message: res.payload.data.detail })
                } else {
                    localStorage.setItem("professionAlert", "updateProfession")
                    history.push('/apps/profession-management/professions')
                }
            }
        });
    }

    function handleRemoveProfession() {
        dispatch(removeProfession(getValues())).then((res) => {
            console.log("removeProfessionRes", res)
            if (res.payload) {
                localStorage.removeItem("professionEvent")
                localStorage.setItem("professionAlert", "deleteProfession")
                history.push('/apps/profession-management/professions');
            }
        });
    }

    function handleCancel() {
        history.push('/apps/profession-management/professions')
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/profession-management/professions"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Professions</span>
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
                                {name || 'Create New Profession'}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                Professions Detail
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
                        Do you want to remove this Profession?
                    </Typography>
                }
                {handleDelete == 'Delete' && routeParams.professionId !== "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveProfession}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {routeParams.professionId == "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSaveProfession}
                >
                    Save
                </Button>}
                {handleDelete !== 'Delete' && routeParams?.professionName && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateProfession}
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

export default NewProfessionHeader;