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
import { getRecruitingAgency, newRecruitingAgency, resetRecruitingAgency } from '../store/recruitingAgencySlice';
import NewRecruitingAgencyHeader from './NewRecruitingAgencyHeader.js';
import RecruitingAgencyForm from './RecruitingAgencyForm.js';



/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    address: yup.string()
        .required("Address is required"),
})

const RecruitingAgency = () => {

    const dispatch = useDispatch();
    const recruitingAgency = useSelector(({ recruitingAgencysManagement }) => recruitingAgencysManagement.recruitingAgency);

    const [noRecruitingAgency, setNoRecruitingAgency] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset } = methods;

    useDeepCompareEffect(() => {
        function updateRecruitingAgencyState() {
            const { recruitingAgencyId } = routeParams;

            if (recruitingAgencyId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newRecruitingAgency());
            } else {
                /**
                 * Get User data
                 */

                dispatch(getRecruitingAgency(recruitingAgencyId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoRecruitingAgency(true);
                    }
                });
            }
        }

        updateRecruitingAgencyState();
    }, [dispatch, routeParams]);

    useEffect(() => {


    }, [])


    useEffect(() => {
        if (!recruitingAgency) {
            return;
        }
        /**
         * Reset the form on recruitingAgency state changes
         */
        reset(recruitingAgency);
    }, [recruitingAgency, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset RecruitingAgency on component unload
             */
            dispatch(resetRecruitingAgency());
            setNoRecruitingAgency(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noRecruitingAgency) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such recruitingAgency!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to RecruitingAgency Page
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
                header={<NewRecruitingAgencyHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <RecruitingAgencyForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('recruitingAgencysManagement', reducer)(RecruitingAgency);