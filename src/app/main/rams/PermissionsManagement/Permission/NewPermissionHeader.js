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
import { removePermission, savePermission, updatePermission } from '../store/permissionSlice';

const NewPermissionHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues, setError } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('name');
    const theme = useTheme();
    const history = useHistory();

    const routeParams = useParams();

    const handleDelete = localStorage.getItem('permissionEvent');

    function handleSavePermission() {
        dispatch(savePermission(getValues())).then((res) => {
            if (!res.payload.data?.detail) {
                localStorage.setItem("permissionAlert", "savePermission")
                history.push('/apps/permission-management/permissions')
            }
            else {
                console.log("dublicate")
                setError("name", { type: "manual", message: res.payload.data.detail })
            }
        });
    }

    function handleUpdatePermission() {
        dispatch(updatePermission(getValues())).then(() => {
            localStorage.setItem("permissionAlert", "deletePermission")
            history.push('/apps/permission-management/permissions');
        });
    }

    function handleRemovePermission() {
        dispatch(removePermission(getValues())).then(() => {
            localStorage.removeItem("permissionEvent")
            localStorage.setItem("permissionAlert", "updatePermission")
            history.push('/apps/permission-management/permissions');
        });
    }

    function handleCancel() {
        history.push('/apps/permission-management/permissions')
    }

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/permission-management/permissions"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">Permissions</span>
                    </Typography>
                </motion.div>

                <div className="flex items-center max-w-full">
                    <motion.div
                        className="hidden sm:flex"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                    />

                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                            <Typography className="text-16 sm:text-20 truncate font-semibold">
                                {name || 'Create New Permission'}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                Permissions Detail
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
                    handleDelete === 'Delete' &&
                    <Typography
                        className='mt-6'
                        variant="subtitle2"
                    >
                        Do you want to remove this Permission?
                    </Typography>
                }
                {handleDelete === 'Delete' && routeParams.permissionId !== "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemovePermission}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {routeParams.permissionId === "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSavePermission}
                >
                    Save
                </Button>}
                {handleDelete !== 'Delete' && routeParams?.permissionName && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    //disabled={_.isEmpty(dirtyFields) || !isValid}
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdatePermission}
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

export default NewPermissionHeader;
