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
import { getPassenger, newPassenger, resetPassenger } from '../store/passengerSlice';
import NewPassengerHeader from './NewPassengerHeader.js';
import PassengerForm from './PassengerForm.js';



/**
 * Form Validation Schema
 */
const schema = yup.object().shape({

    // marital_status: yup.string()
    //     .required("Marital Status is required"),

    gender: yup.string()
        .required("Gender is required"),

    agent: yup.string()
        .required("Agent is required"),

    demand: yup.string()
        .required("Demand is required"),

    agency: yup.string()
        .required("Agency is required"),

    target_country: yup.string()
        .required("Target Country is required"),

    passenger_type: yup.string()
        .required("Passenger Type is required"),

    // current_status: yup.string()
    //     .required("Current Status is required"),

    // visa_entry: yup.string()
    //     .required("Visa Entry is required"),

    // police_station: yup.string()
    //     .required("Police Station is required"),

    // district: yup.string()
    //     .required("District is required"),


    // passenger_id: yup.string()
    //     .required("Passenger ID is required"),

    passenger_name: yup.string()
        .required("Passenger Name is required"),

    date_of_birth: yup.string()
        .required("Date Of Birth is required"),

    // nid: yup.string()
    //     .required("NID is required"),

    // father_name: yup.string()
    //     .required("Father Name is required"),

    // mother_name: yup.string()
    //     .required("Mother Name is required"),

    // spouse_name: yup.string()
    //     .required("Spouse Name is required"),

    // religion: yup.string()
    //     .required("Religion is required"),

    passport_no: yup.string()
        .required("Passport No is required"),

    profession: yup.string()
        .required("profession is required"),

    // passport_type: yup.string()
    //     .required("Passport Type is required"),

    // passport_issue_date: yup.string()
    //     .required("Passport Issue Date is required"),

    // passport_expiry_date: yup.string()
    //     .required("Passport Expiry Date is required"),

    // village: yup.string()
    //     .required("Village is required"),

    // post_office: yup.string()
    //     .required("Post Office is required"),

    // contact_no: yup.string()
    //     .required("Contact No is required"),

    // emergency_contact_no: yup.string()
    //     .required("Emergency Contact No is required"),

    // place_of_birth: yup.string()
    //     .required("Place Of Birth is required"),

    // place_of_residence: yup.string()
    //     .required("Place Of Residence is required"),

    // passport_issue_place: yup.string()
    //     .required("Passport Issue Place is required"),

    // notes: yup.string()
    //     .required("Notes is required"),
})

const Passenger = () => {

    const dispatch = useDispatch();
    const passenger = useSelector(({ passengersManagement }) => passengersManagement.passenger);
    const [disableUpdate, setDisableUpdate] = useState(false)

    const [noPassenger, setNoPassenger] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset } = methods;

    useDeepCompareEffect(() => {
        function updatePassengerState() {
            const { passengerId } = routeParams;

            if (passengerId === 'new') {

                localStorage.removeItem('event')
                /**
                 * Create New User data
                 */
                dispatch(newPassenger());
            } else {
                /**
                 * Get User data
                 */

                dispatch(getPassenger(passengerId)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoPassenger(true);
                    }
                });
            }
        }

        updatePassengerState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        if (!passenger) {
            return;
        }
        /**
         * Reset the form on passenger state changes
         */
        // reset({ ...passenger, date_of_birth: passenger?.date_of_birth?.slice(0, 10), passport_issue_date: passenger?.passport_issue_date?.slice(0,10) });
        reset(passenger);
    }, [passenger, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Passenger on component unload
             */
            dispatch(resetPassenger());
            setNoPassenger(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noPassenger) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such passenger!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Passenger Page
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
                header={<NewPassengerHeader disableUpdate={disableUpdate}/>}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <PassengerForm disableUpdate={disableUpdate} setDisableUpdate={setDisableUpdate}/>
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('passengersManagement', reducer)(Passenger);