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
import { getEmployee, newEmployee, resetEmployee } from '../store/employeeSlice';
import reducer from '../store/index';
import EmployeeForm from './EmployeeForm';
import NewEmployeeHeader from './NewEmployeeHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    branch: yup.number()
        .required("Branch is required"),
    emp_id_no: yup.string().
        required('Id is required'),
    first_name: yup.string()
        .required('First name is required')
        .min(5, 'First name must be at least 5 characters'),
    last_name: yup.string()
        .required('Last name is required'),
    username: yup.string()
        .required('User name is required'),
    email: yup.string()
        .email('You must enter a valid email address')
        .required('You must enter a email address'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    primary_phone: yup.string()
        .required('Primary phone is required'),
    street_address_one: yup.string()
        .required('Primary address is required'),
    // date_of_birth: yup.string()
    //     .required('Date of Birth is required'),
    gender: yup.string()
        .required('Gender is required'),
    thana: yup.number()
        .required('Police station is required'),
    city: yup.number()
        .required('District is required'),
    country: yup.number()
        .required('Country is required'),
    role: yup.number()
        .required('Role is required'),
    department: yup.number()
        .required('Department is required'),
    // emp_join_date: yup.string()
    //     .required('Join date is required'),
    // is_active: yup.bool()
    //     .oneOf([true], 'Is active is required')
});


const NewEmployee = () => {
    const dispatch = useDispatch();
    const employee = useSelector(({ employeesManagement }) => employeesManagement.employee);
    const routeParams = useParams();
    //console.log(routeParams);
    const [noEmployee, setNoEmployee] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const { reset, watch, control, onChange, formState } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updateEmployeeState() {
            const { employeeId } = routeParams;
            //console.log(employeeId);
            if (employeeId === 'new') {

                localStorage.removeItem('deleteEmployee');
                localStorage.removeItem('updateEmployee');
                /**
                 * Create New User data
                 */
                //console.log(employeeId);
                dispatch(newEmployee());
            } else {
                /**
                 * Get User data
                 */
                console.log(routeParams);
                dispatch(getEmployee(routeParams)).then(action => {
                    console.log(action.payload);
                    /**
                     * If the requested product is not exist show message
                     */
                    if (!action.payload) {
                        setNoEmployee(true);
                    }
                });
            }
        }

        updateEmployeeState();
    }, [dispatch, routeParams]);


    useEffect(() => {
        if (!employee) {
            return;
        }
        /**
         * Reset the form on employee state changes
         */
        reset({ ...employee, country_code1: "+880", country_code2: "+880", show_country_code1: "+880", show_country_code2: "+880" });
    }, [employee, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Employee on component unload
             */
            dispatch(resetEmployee());
            setNoEmployee(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noEmployee) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such employee!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Employee Page
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
                    root: {},
                    toolbar: 'p-0'
                }}
                header={<NewEmployeeHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <EmployeeForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('employeesManagement', reducer)(NewEmployee);