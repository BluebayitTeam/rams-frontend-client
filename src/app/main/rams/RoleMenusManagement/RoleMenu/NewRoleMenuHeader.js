import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { removeRoleMenu, saveRoleMenu, updateRoleMenu } from '../store/roleMenuSlice';


const NewRoleMenuHeader = () => {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const { formState, watch, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const name = watch('role');
    const theme = useTheme();
    const history = useHistory();

    const routeParams = useParams();

    const handleDelete = localStorage.getItem('roleMenuEvent');

    function handleSaveRoleMenu() {
        dispatch(saveRoleMenu(getValues())).then(() => {
            localStorage.setItem("roleMenuAlert", "saveRoleMenu")
            history.push('/apps/roleMenu-management/roleMenus');
        });
    }

    function handleUpdateRoleMenu() {
        dispatch(updateRoleMenu(getValues())).then(() => {
            localStorage.setItem("roleMenuAlert", "updateRoleMenu")
            history.push('/apps/roleMenu-management/roleMenus');
        });
    }

    function handleRemoveRoleMenu() {
        dispatch(removeRoleMenu(getValues())).then(() => {
            localStorage.removeItem("roleMenuEvent")
            localStorage.setItem("roleMenuAlert", "deleteRoleMenu")
            history.push('/apps/roleMenu-management/roleMenus');
        });
    }

    function handleCancel() {
        history.push('/apps/roleMenu-management/roleMenus')
    }


    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full min-w-0">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                    <Typography
                        className="flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/roleMenu-management/roleMenus"
                        color="inherit"
                    >
                        <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                        <span className="hidden sm:flex mx-4 font-medium">RoleMenus</span>
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
                                {name || 'Create New RoleMenu'}
                            </Typography>
                            <Typography variant="caption" className="font-medium">
                                RoleMenus Detail
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
                        Do you want to remove this RoleMenu?
                    </Typography>
                }
                {handleDelete == 'Delete' && routeParams.roleMenuId !== "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    onClick={handleRemoveRoleMenu}
                    startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                    style={{ backgroundColor: '#ea5b78', color: 'white' }}
                >
                    Remove
                </Button>}
                {routeParams.roleMenuId == "new" && <Button
                    className="whitespace-nowrap mx-4"
                    variant="contained"
                    color="secondary"
                    disabled={!name}
                    onClick={handleSaveRoleMenu}
                >
                    Save
                </Button>}
                {handleDelete !== 'Delete' && routeParams?.roleMenuName && <Button
                    className="whitespace-nowrap mx-4"
                    color="secondary"
                    variant="contained"
                    style={{ backgroundColor: "#4dc08e", color: 'white' }}
                    onClick={handleUpdateRoleMenu}
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

export default NewRoleMenuHeader;