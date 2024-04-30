import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AgentHeader from './AgentHeader';
import AgentModel from './models/AgentModel';
import { useGetAgentQuery } from '../AgentsApi';
import AgentForm from './AgentForm';
import OpeningBalance from './tabs/OpeningBalance';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a agent name')
		.min(5, 'The agent name must be at least 5 characters')
});

function Agent() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { agentId } = routeParams;

	const {
		data: agent,
		isLoading,
		isError
	} = useGetAgentQuery(agentId, {
		skip: !agentId || agentId === 'new'
	});
	console.log('agentId', agent, agentId);

	const [tabValue, setTabValue] = useState(0);

	console.log('tabValue', tabValue);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (agentId === 'new') {
			reset(AgentModel({}));
		}
	}, [agentId, reset]);

	useEffect(() => {
		if (agent) {
			reset({ ...agent });
		}
	}, [agent, reset, agent?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested agent is not exists
	 */
	if (isError && agentId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such agent!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/agent/agent"
					color="inherit"
				>
					Go to Agents Page
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
						<Tab
							className="h-64"
							label="Basic Info"
						/>
						<Tab
							className="h-64"
							label="Opening Balance"
						/>
					</Tabs>
				}
				header={<AgentHeader />}
				content={
					<>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							indicatorColor="secondary"
							textColor="secondary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64 border-b-1' }}
						>
							<Tab
								className="h-64"
								label="Basic Info"
							/>
							<Tab
								className="h-64"
								label="Opening Balance"
							/>
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<AgentForm agentId={agentId} />
							</div>

							<div className={tabValue !== 1 ? 'hidden' : ''}>
								<OpeningBalance />
								{/* Opening Balance */}
							</div>
						</div>
					</>
					// <div className="p-16  ">
					// 	<div className="p-16 ">
					// 		<div className={tabValue !== 0 ? 'hidden' : ''}>
					// 			<AgentForm agentId={agentId} />
					// 		</div>
					// 		<div className={tabValue !== 1 ? 'hidden' : ''}>
					// 			{/* <OpeningBalance /> */}
					// 			dsfsdsf
					// 		</div>
					// 	</div>
					// </div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Agent;
