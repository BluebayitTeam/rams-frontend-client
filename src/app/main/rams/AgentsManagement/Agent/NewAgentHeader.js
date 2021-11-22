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
import { BASE_URL } from '../../../../constant/constants';
import { removeAgent, saveAgent, updateAgent } from '../store/agentSlice';

const NewAgentHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, setError } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('username');
    const theme = useTheme();
    const history = useHistory();

    const image = watch('image');
    const featuredImageId = watch('featuredImageId');

    const routeParams = useParams();

    const handleDelete = localStorage.getItem('agentEvent');

    function handleSaveAgent() {
        dispatch(saveAgent(getValues())).then((res) => {
            console.log("saveAgentRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("agentAlert", "saveAgent")
                history.push('/apps/agent-management/agents')
            }
            else if (res.payload?.data) {
                const detail = res.payload.data
                for (let name in detail) {
                    setError(`${name}`, {
                        type: 'manual',
                        message: detail[name]
                    })
                }
            }
        });
    }

    function handleUpdateAgent() {
        dispatch(updateAgent(getValues())).then((res) => {
            console.log("updateAgentRes", res)
            if (res.payload?.data?.id) {
                localStorage.setItem("agentAlert", "updateAgent")
                history.push('/apps/agent-management/agents');
            }
            else if (res.payload?.data) {
                const detail = res.payload.data
                for (let name in detail) {
                    setError(`${name}`, {
                        type: 'manual',
                        message: detail[name]
                    })
                }
            }
        });
    }

    function handleRemoveAgent() {
        dispatch(removeAgent(getValues())).then((res) => {
            console.log("removeAgentRes", res)
            if (res.payload?.data) {
                localStorage.removeItem("agentEvent")
                localStorage.setItem("agentAlert", "deleteAgent")
                history.push('/apps/agent-management/agents');
            }
        });
    }

    function handleCancel() {
        history.push('/apps/agent-management/agents')
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/agent-management/agents"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Agents</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div
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

                    </motion.div>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {name || 'Create New Agent'}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                Agents Detail
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
                        Do you want to remove this Agent?
                    </Typography>
                }
                {handleDelete == 'Delete' && routeParams.agentId !== "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveAgent}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {routeParams.agentId == "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    // disabled={_.isEmpty(dirtyFields) || !isValid || ((getValues().balancce_type || getValues().balance_date || getValues().balance_amount || getValues().balance_note)) ? !(getValues().balancce_type && getValues().balance_date && getValues().balance_amount && getValues().balance_note) : false}
                    onClick={handleSaveAgent}
                >
                    Save
                </Button>}
                {handleDelete !== 'Delete' && routeParams?.agentName && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateAgent}
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

export default NewAgentHeader;