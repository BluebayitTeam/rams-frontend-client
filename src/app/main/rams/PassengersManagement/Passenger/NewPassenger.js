import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import setIdIfValueIsObject2 from 'app/@helpers/setIdIfValueIsObject2.js';
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
	gender: yup.string().required('Gender is required'),

	agent: yup.string().required('Agent is required'),

	demand: yup.string().required('Demand is required'),

	agency: yup.string().required('Agency is required'),

	target_country: yup.string().required('Target Country is required'),

	passenger_type: yup.string().required('Passenger Type is required'),

	passenger_name: yup.string().required('Passenger Name is required'),

	date_of_birth: yup.string().required('Date Of Birth is required'),

	passport_no: yup.string().required('Passport No is required'),

	profession: yup.string().required('profession is required')
});

const Passenger = () => {
	const dispatch = useDispatch();
	const passenger = useSelector(({ passengersManagement }) => passengersManagement.passenger);
	const [disableUpdate, setDisableUpdate] = useState(false);

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
				localStorage.removeItem('event');
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
		reset(setIdIfValueIsObject2(passenger));
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
					header: 'min-h-80 h-80'
				}}
				header={<NewPassengerHeader disableUpdate={disableUpdate} />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<PassengerForm disableUpdate={disableUpdate} setDisableUpdate={setDisableUpdate} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('passengersManagement', reducer)(Passenger);
