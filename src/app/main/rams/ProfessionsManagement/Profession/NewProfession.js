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
import { getProfession, newProfession, resetProfession } from '../store/professionSlice';
import NewProfessionHeader from './NewProfessionHeader.js';
import ProfessionForm from './ProfessionForm.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('Name is required')
});

const Profession = () => {
	const dispatch = useDispatch();
	const profession = useSelector(({ professionsManagement }) => professionsManagement.profession);
	const [noProfession, setNoProfession] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateProfessionState() {
			const { professionId } = routeParams;

			if (professionId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newProfession());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getProfession(professionId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoProfession(true);
					}
				});
			}
		}

		updateProfessionState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!profession) {
			return;
		}
		/**
		 * Reset the form on profession state changes
		 */
		reset(profession);
	}, [profession, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Profession on component unload
			 */
			dispatch(resetProfession());
			setNoProfession(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noProfession) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such profession!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Profession Page
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
				header={<NewProfessionHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<ProfessionForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('professionsManagement', reducer)(Profession);
