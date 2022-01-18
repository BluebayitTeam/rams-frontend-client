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
import { getPassengerType, newPassengerType, resetPassengerType } from '../store/passengerTypeSlice';
import NewPassengerTypeHeader from './NewPassengerTypeHeader.js';
import PassengerTypeForm from './PassengerTypeForm.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('Name is required')
});

const PassengerType = () => {
	const dispatch = useDispatch();
	const passengerType = useSelector(({ passengerTypesManagement }) => passengerTypesManagement.passengerType);

	const [noPassengerType, setNoPassengerType] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updatePassengerTypeState() {
			const { passengerTypeId } = routeParams;

			if (passengerTypeId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newPassengerType());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getPassengerType(passengerTypeId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoPassengerType(true);
					}
				});
			}
		}

		updatePassengerTypeState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!passengerType) {
			return;
		}
		/**
		 * Reset the form on passengerType state changes
		 */
		reset(passengerType);
	}, [passengerType, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset PassengerType on component unload
			 */
			dispatch(resetPassengerType());
			setNoPassengerType(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noPassengerType) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such passengerType!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to PassengerType Page
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
				header={<NewPassengerTypeHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<PassengerTypeForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('passengerTypesManagement', reducer)(PassengerType);
