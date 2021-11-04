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
import { getDepartment, newDepartment, resetDepartment } from '../store/departmentSlice';
import reducer from '../store/index';
import DepartmentForm from './DepartmentForm';
import NewDepartmentHeader from './NewDepartmentHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup.string()
        .required("name is required"),
})

const Department = () => {

    const dispatch = useDispatch();
    const department = useSelector(({ departmentsManagement }) => departmentsManagement.department);

    const [noDepartment, setNoDepartment] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset, watch } = methods;

    useDeepCompareEffect(() => {
        function updateDepartmentState() {
            const { departmentId } = routeParams;

            if (departmentId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newDepartment());
            } else {
                /**
                 * Get User data
                 */
                console.log("depid", departmentId);
                dispatch(getDepartment(departmentId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoDepartment(true);
                    }
                });
            }
        }

        updateDepartmentState();
    }, [dispatch, routeParams]);

    useEffect(() => {


    }, [])


    useEffect(() => {
        if (!department) {
            return;
        }
        /**
         * Reset the form on department state changes
         */
        reset(department);
    }, [department, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Department on component unload
             */
            dispatch(resetDepartment());
            setNoDepartment(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noDepartment) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such department!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Department Page
                </Button>
            </motion.div>
        );
    }


    console.log(routeParams);
    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                }}
                header={<NewDepartmentHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <DepartmentForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('departmentsManagement', reducer)(Department);