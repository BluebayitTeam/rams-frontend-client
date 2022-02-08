import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import setIdIfValueIsObject2 from 'app/@helpers/setIdIfValueIsObject2';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getGroup, newGroup, resetGroup } from '../store/groupSlice';
import reducer from '../store/index.js';
import GroupForm from './GroupForm.js';
import NewGroupHeader from './NewGroupHeader.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('Name is required')
});

const Group = () => {
	const dispatch = useDispatch();
	const group = useSelector(({ groupsManagement }) => groupsManagement.group);

	const [noGroup, setNoGroup] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateGroupState() {
			const { groupId } = routeParams;

			if (groupId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newGroup());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getGroup(groupId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoGroup(true);
					}
				});
			}
		}

		updateGroupState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!group) {
			return;
		}
		/**
		 * Reset the form on group state changes
		 */
		reset(setIdIfValueIsObject2(group));
	}, [group, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Group on component unload
			 */
			dispatch(resetGroup());
			setNoGroup(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noGroup) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such group!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Group Page
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
				header={<NewGroupHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<GroupForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('groupsManagement', reducer)(Group);
