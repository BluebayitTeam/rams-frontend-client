import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import { getMedicalCenter, newMedicalCenter, resetMedicalCenter } from '../store/medicalCenterSlice';
import MedicalCenterForm from './MedicalCenterForm.js';
import NewMedicalCenterHeader from './NewMedicalCenterHeader.js';



/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
})

const MedicalCenter = () => {

    const dispatch = useDispatch();
    const medicalCenter = useSelector(({ medicalCentersManagement }) => medicalCentersManagement.medicalCenter);

    const [noMedicalCenter, setNoMedicalCenter] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset } = methods;

    useDeepCompareEffect(() => {
        function updateMedicalCenterState() {
            const { medicalCenterId } = routeParams;

            if (medicalCenterId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newMedicalCenter());
            } else {
                /**
                 * Get User data
                 */

                dispatch(getMedicalCenter(medicalCenterId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoMedicalCenter(true);
                    }
                });
            }
        }

        updateMedicalCenterState();
    }, [dispatch, routeParams]);

    useEffect(() => {


    }, [])


    useEffect(() => {
        if (!medicalCenter) {
            return;
        }
        /**
         * Reset the form on medicalCenter state changes
         */
        reset(medicalCenter);
    }, [medicalCenter, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset MedicalCenter on component unload
             */
            dispatch(resetMedicalCenter());
            setNoMedicalCenter(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noMedicalCenter) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such medical center!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Medical Center Page
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
                header={<NewMedicalCenterHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <MedicalCenterForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('medicalCentersManagement', reducer)(MedicalCenter);


