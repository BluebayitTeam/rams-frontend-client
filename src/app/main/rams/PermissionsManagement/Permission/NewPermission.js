import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { getPermission, newPermission, resetPermission } from '../store/permissionSlice';
import NewPermissionHeader from './NewPermissionHeader';
import PermissionForm from './PermissionForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({

    name: yup.string()
        .required("Name is required"),
})

const Permission = () => {

    const dispatch = useDispatch();
    const permission = useSelector(({ permissionsManagement }) => permissionsManagement.permission);

    const [noPermission, setNoPermission] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset } = methods;

    useDeepCompareEffect(() => {
        function updatePermissionState() {
            const { permissionId } = routeParams;

            if (permissionId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newPermission());
            } else {
                /**
                 * Get User data
                 */
                dispatch(getPermission(permissionId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoPermission(true);
                    }
                });
            }
        }

        updatePermissionState();
    }, [dispatch, routeParams]);

    useEffect(() => {


    }, [])


    useEffect(() => {
        if (!permission) {
            return;
        }
        /**
         * Reset the form on permission state changes
         */
        reset(permission);
    }, [permission, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Permission on component unload
             */
            dispatch(resetPermission());
            setNoPermission(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noPermission) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such permission!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Permission Page
                </Button>
            </motion.div>
        );
    }


    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    content: 'flex',
                    contentCard: 'overflow-hidden',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                }}
                header={<NewPermissionHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl" style={{ width: "100%" }}>
                        <PermissionForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('permissionsManagement', reducer)(Permission);