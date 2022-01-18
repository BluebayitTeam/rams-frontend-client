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
import { getSitesetting, newSitesetting, resetSitesetting } from '../store/sitesettingSlice';
import NewSitesettingHeader from './NewSitesettingHeader';
import SitesettingForm from './SitesettingForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	site_address: yup.string().required('Site address is required'),
	email: yup.string().email('You must enter a valid email address').required('You must enter a email address'),
	phone: yup.string().required('Phone is required'),
	address: yup.string().required('Address is required'),
	facebook_url: yup.string().required('Facebook url is required'),
	twitter_url: yup.string().required('Twitter url is required'),
	instagram_url: yup.string().required('Instragram url is required')
});

const Sitesetting = () => {
	const dispatch = useDispatch();
	const sitesetting = useSelector(({ sitesettingsManagement }) => sitesettingsManagement.sitesetting);
	const [noSitesetting, setNoSitesetting] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();
	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateSitesettingState() {
			const { sitesettingId } = routeParams;

			if (sitesettingId === 'new') {
				localStorage.removeItem('deleteSitesettingEvent');
				localStorage.removeItem('updateSitesettingEvent');
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newSitesetting());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getSitesetting(sitesettingId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoSitesetting(true);
					}
				});
			}
		}

		updateSitesettingState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!sitesetting) {
			return;
		}
		/**
		 * Reset the form on sitesetting state changes
		 */
		reset({ ...sitesetting, country_code1: '+880', show_country_code1: '+880' });
	}, [sitesetting, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Sitesetting on component unload
			 */
			dispatch(resetSitesetting());
			setNoSitesetting(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noSitesetting) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such sitesetting!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Sitesetting Page
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
				header={<NewSitesettingHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<SitesettingForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};

export default withReducer('sitesettingsManagement', reducer)(Sitesetting);
