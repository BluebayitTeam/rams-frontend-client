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
import setIdIfValueIsObject2 from '../../../../@helpers/setIdIfValueIsObject2';
import { getCity, newCity, resetCity } from '../store/citySlice';
import reducer from '../store/index';
import CityForm from './CityForm';
import NewCityHeader from './NewCityHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	country: yup.number().required('Country is required'),
	name: yup.string().required('Name is required')
});

const City = () => {
	const dispatch = useDispatch();
	const city = useSelector(({ citysManagement }) => citysManagement.city);

	const [noCity, setNoCity] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset, watch } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateCityState() {
			const { cityId } = routeParams;
			console.log(cityId);

			if (cityId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newCity());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getCity(cityId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoCity(true);
					}
				});
			}
		}

		updateCityState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!city) {
			return;
		}
		/**
		 * Reset the form on city state changes
		 */
		reset(setIdIfValueIsObject2(city));
	}, [city, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset City on component unload
			 */
			dispatch(resetCity());
			setNoCity(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noCity) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such city!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to City Page
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
				header={<NewCityHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<CityForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('citysManagement', reducer)(City);
