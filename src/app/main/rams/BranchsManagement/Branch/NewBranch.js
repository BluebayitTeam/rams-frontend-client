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
import { getBranch, newBranch, resetBranch } from '../store/branchSlice';
import reducer from '../store/index';
import BranchForm from './BranchForm';
import NewBranchHeader from './NewBranchHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('Group Name is required')
});

const Branch = () => {
	const dispatch = useDispatch();
	const branch = useSelector(({ branchsManagement }) => branchsManagement.branch);

	const [noBranch, setNoBranch] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset, watch, control, onChange, formState } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateBranchState() {
			const { branchId } = routeParams;

			if (branchId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newBranch());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getBranch(branchId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoBranch(true);
					}
				});
			}
		}

		updateBranchState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!branch) {
			return;
		}
		/**
		 * Reset the form on branch state changes
		 */
		reset(branch);
	}, [branch, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Branch on component unload
			 */
			dispatch(resetBranch());
			setNoBranch(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noBranch) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such branch!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Branch Page
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
				header={<NewBranchHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<BranchForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('branchsManagement', reducer)(Branch);
