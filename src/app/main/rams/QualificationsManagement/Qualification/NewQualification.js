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
import { getQualification, newQualification, resetQualification } from '../store/qualificationSlice';
import NewQualificationHeader from './NewQualificationHeader';
import QualificationForm from './QualificationForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({

    employee_id: yup.number()
        .required("Employee ID is required"),
    degree_name: yup.string()
        .required("Degree Name is required"),
    passign_year: yup.string()
        .required("Passign Year is required")
        .max(4, "Passign cann't be more than 4 characters"),
    board: yup.string()
        .required("Board is required"),
    institute_name: yup.string()
        .required("Institute Name is required"),
    grade: yup.string()
        .matches(/^\d{0,3}(\.\d{0,100})?$/i, "Grade cann't be more than 3 digit")
        .matches(/^\d{0,3}(\.\d{0,2})?$/i, "Grade cann't be more than 5 digit in total")
})

const Qualification = () => {

    const dispatch = useDispatch();
    const qualification = useSelector(({ qualificationsManagement }) => qualificationsManagement.qualification);

    const [noQualification, setNoQualification] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset, watch, control, onChange, formState } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateQualificationState() {
            const { qualificationId } = routeParams;

            if (qualificationId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newQualification());
            } else {
                /**
                 * Get User data
                 */

                dispatch(getQualification(qualificationId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoQualification(true);
                    }
                });
            }
        }

        updateQualificationState();
    }, [dispatch, routeParams]);

    useEffect(() => {


    }, [])


    useEffect(() => {
        if (!qualification) {
            return;
        }
        /**
         * Reset the form on qualification state changes
         */
        reset(qualification);
    }, [qualification, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Qualification on component unload
             */
            dispatch(resetQualification());
            setNoQualification(false);
        };
    }, [dispatch]);


    /**
     * Show Message if the requested products is not exists
     */
    if (noQualification) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such qualification!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Qualification Page
                </Button>
            </motion.div>
        );
    }


    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                }}
                header={<NewQualificationHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <QualificationForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('qualificationsManagement', reducer)(Qualification);