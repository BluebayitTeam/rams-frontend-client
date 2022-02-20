import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@material-ui/core';
import useUserInfo from 'app/@customHooks/useUserInfo.js';
import setIdIfValueIsObjArryData from 'app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'app/@helpers/setIdIfValueIsObject2';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getContra, newContra, resetContra, setUserBasedBranch } from '../store/contraSlice';
import reducer from '../store/index.js';
import ContraForm from './ContraForm.js';
import NewContraHeader from './NewContraHeader.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	contra_date: yup.date().required('Branch is required')
});

const Contra = () => {
	const dispatch = useDispatch();
	const contra = useSelector(({ contrasManagement }) => contrasManagement.contra);
	const [noContra, setNoContra] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const routeParams = useParams();

	const { reset } = methods;

	const [letFormSave, setLetFormSave] = useState(false);

	const { userId } = useUserInfo();

	useDeepCompareEffect(() => {
		function updateContraState() {
			const { contraId, contraName } = routeParams;

			if (contraId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newContra());
				dispatch(setUserBasedBranch(userId));
			} else {
				/**
				 * Get User data
				 */

				dispatch(getContra(contraName)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoContra(true);
					}
				});
			}
		}

		updateContraState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!contra) {
			return;
		}
		/**
		 * Reset the form on contra state changes
		 */
		const convertedContraItems = setIdIfValueIsObjArryData(contra?.items);
		const convertedContra = setIdIfValueIsObject2(contra);
		reset({ ...convertedContra, items: convertedContraItems });
	}, [contra, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Contra on component unload
			 */
			dispatch(resetContra());
			setNoContra(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noContra) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such contra!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Contra Page
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
				header={<NewContraHeader letFormSave={letFormSave} />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<ContraForm setLetFormSave={setLetFormSave} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('contrasManagement', reducer)(Contra);
