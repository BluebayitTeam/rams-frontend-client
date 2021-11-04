import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { getRole, newRole, resetRole } from '../store/roleSlice';
import NewRoleHeader from './NewRoleHeader';
import RoleForm from './RoleForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup.number()
        .required("Name is required"),
    permissions: yup.string().
        required('Permissions is required')
});


const NewRole = () => {
    const dispatch = useDispatch();
    const role = useSelector(({ rolesManagement }) => rolesManagement.role);
    const routeParams = useParams();
    //console.log(routeParams);
    const [noRole, setNoRole] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const { reset } = methods;

    useDeepCompareEffect(() => {
        function updateRoleState() {
            const { roleId } = routeParams;
            //console.log(roleId);
            if (roleId === 'new') {

                localStorage.removeItem('deleteRole');
                localStorage.removeItem('updateRole');
                /**
                 * Create New User data
                 */
                //console.log(roleId);
                dispatch(newRole());
            } else {
                /**
                 * Get User data
                 */
                console.log(routeParams);
                dispatch(getRole(routeParams)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested role is not exist show message
                     */
                    if (!action.payload) {
                        setNoRole(true);
                    }
                });
            }
        }

        updateRoleState();
    }, [dispatch, routeParams]);


    useEffect(() => {
        if (!role) {
            return;
        }
        /**
         * Reset the form on role state changes
         */
        reset(role);
    }, [role, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Role on component unload
             */
            dispatch(resetRole());
            setNoRole(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested Roles is not exists
     */
    if (noRole) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such role!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/roles-management/roles"
                    color="inherit"
                >
                    Go to Role Page
                </Button>
            </motion.div>
        );
    }

    /**
         * Wait while product data is loading and form is setted
         */
    //  if (_.isEmpty(form) || (employee && routeParams.employeeId !== employee.id && routeParams.employeeId !== 'new')) {
    //     return <FuseLoading />;
    // }
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                }}
                header={<NewRoleHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <RoleForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('rolesManagement', reducer)(NewRole);