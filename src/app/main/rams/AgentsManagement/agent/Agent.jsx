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
import AgentHeader from './AgentHeader';
import AgentModel from './models/AgentModel';
import { useGetAgentQuery } from '../AgentsApi';
import AgentForm from './AgentForm';
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
	const { clientId } = routeParams;

	const {
		data: agent,
		isLoading,
		isError
	} = useGetAgentQuery(clientId, {
		skip: !clientId || clientId === 'new'
	});
	console.log('clientId', agent, clientId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (clientId === 'new') {
			reset(AgentModel({}));
		}
	}, [clientId, reset]);

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
	if (isError && clientId !== 'new') {
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
				header={<AgentHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<AgentForm clientId={clientId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Agent;
