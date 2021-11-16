import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getDemand, newDemand, resetDemand } from '../store/demandSlice';
import reducer from '../store/index.js';
import DemandForm from './DemandForm.js';
import NewDemandHeader from './NewDemandHeader.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({

    profession: yup.string()
        .required("Profession is required"),

    country: yup.string()
        .required("Country is required"),

    visa_agent: yup.string()
        .required("Visa Agent is required"),

    company_name: yup.string()
        .required("Company Name is required"),

    quantity: yup.string()
        .required("Quantity is required"),

    // salary: yup.string()
    //     .required("Salary is required"),

    // purchase_rate: yup.string()
    //     .required("Purchase Rate is required"),

    // purchase_foreign_corrency: yup.string()
    //     .required("Purchase Foreign Corrency is required"),

    // office_rate: yup.string()
    //     .required("Office Rate is required"),

    // status: yup.string()
    //     .required("Status is required"),

    // notes: yup.string()
    //     .required("Notes is required"),
})

const Demand = () => {

    const dispatch = useDispatch();
    const demand = useSelector(({ demandsManagement }) => demandsManagement.demand);

    const [noDemand, setNoDemand] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset } = methods;

    useDeepCompareEffect(() => {
        function updateDemandState() {
            const { demandId } = routeParams;

            if (demandId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newDemand());
            } else {
                /**
                 * Get User data
                 */

                dispatch(getDemand(demandId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoDemand(true);
                    }
                });
            }
        }

        updateDemandState();
    }, [dispatch, routeParams]);

    useEffect(() => {


    }, [])


    useEffect(() => {
        if (!demand) {
            return;
        }
        /**
         * Reset the form on demand state changes
         */
        reset(demand);
    }, [demand, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Demand on component unload
             */
            dispatch(resetDemand());
            setNoDemand(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noDemand) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such demand!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Demand Page
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
                header={<NewDemandHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <DemandForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('demandsManagement', reducer)(Demand);