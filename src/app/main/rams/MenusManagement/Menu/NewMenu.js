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
import { getMenu, newMenu, resetMenu } from '../store/menuSlice';
import MenuForm from './MenuForm';
import NewMenuHeader from './NewMenuHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	translate: yup.string().required('Translate is required'),

	type: yup.string().required('Type is required')

	// url: yup.string()
	//     .required("Url is required"),
});

const Menu = () => {
	const dispatch = useDispatch();
	const menu = useSelector(({ menusManagement }) => menusManagement.menu);

	const [noMenu, setNoMenu] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateMenuState() {
			const { menuId } = routeParams;

			if (menuId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newMenu());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getMenu(menuId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoMenu(true);
					}
				});
			}
		}

		updateMenuState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!menu) {
			return;
		}
		/**
		 * Reset the form on menu state changes
		 */
		reset(menu);
	}, [menu, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Menu on component unload
			 */
			dispatch(resetMenu());
			setNoMenu(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noMenu) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such menu!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Menu Page
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
				header={<NewMenuHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<MenuForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('menusManagement', reducer)(Menu);
