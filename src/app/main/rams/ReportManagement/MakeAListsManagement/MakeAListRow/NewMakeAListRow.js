import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import { getMakeAList, newMakeAList, resetMakeAList } from '../store/makeAListSlice';
import MakeAListForm from './MakeAListRowForm.js';
import NewMakeAListHeader from './NewMakeAListRowHeader.js';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
	title: yup.string().required('Title is required')
});

const MakeAList = () => {
	const dispatch = useDispatch();
	const makeAList = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeAList);

	const [noMakeAList, setNoMakeAList] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateMakeAListState() {
			const { makeAListId } = routeParams;

			if (makeAListId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newMakeAList());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getMakeAList(makeAListId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoMakeAList(true);
					}
				});
			}
		}

		updateMakeAListState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!makeAList) {
			return;
		}
		/**
		 * Reset the form on makeAList state changes
		 */
		reset(makeAList);
	}, [makeAList, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset MakeAList on component unload
			 */
			dispatch(resetMakeAList());
			setNoMakeAList(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noMakeAList) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such makeAList!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to MakeAList Page
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
				header={<NewMakeAListHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<MakeAListForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('makeAListsManagement', reducer)(MakeAList);
