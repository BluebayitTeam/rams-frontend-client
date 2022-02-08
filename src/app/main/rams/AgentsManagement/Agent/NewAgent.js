import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Tab, Tabs } from '@material-ui/core';
import setIdIfValueIsObject2 from 'app/@helpers/setIdIfValueIsObject2';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getAgent, newAgent, resetAgent } from '../store/agentSlice';
import reducer from '../store/index.js';
import AgentForm from './AgentForm.js';
import NewAgentHeader from './NewAgentHeader.js';
import OpeningBalance from './tabs/OpeningBalanceTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	first_name: yup.string().required('First Name is required'),
	last_name: yup.string().required('Last Name is required'),
	username: yup.string().required('User Name is required'),
	email: yup.string().required('Email is required'),
	gender: yup.string().required('Gender is required'),
	group: yup.string().required('Group is required'),
	password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Agent = () => {
	const dispatch = useDispatch();
	const agent = useSelector(({ agentsManagement }) => agentsManagement.agent);

	const [tabValue, setTabValue] = useState(0);
	const [noAgent, setNoAgent] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateAgentState() {
			const { agentId } = routeParams;

			if (agentId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newAgent());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getAgent(agentId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoAgent(true);
					}
				});
			}
		}

		updateAgentState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!agent) {
			return;
		}
		/**
		 * Reset the form on agent state changes
		 */
		reset(setIdIfValueIsObject2(agent));
	}, [agent, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Agent on component unload
			 */
			dispatch(resetAgent());
			setNoAgent(false);
		};
	}, [dispatch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noAgent) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such agent!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Agent Page
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
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab className="h-64" label="Basic Info" />
						<Tab className="h-64" label="Opening Balance" />
					</Tabs>
				}
				header={<NewAgentHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<AgentForm />
						</div>
						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<OpeningBalance />
						</div>
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('agentsManagement', reducer)(Agent);
