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
import CallingAssignHeader from './CallingAssignHeader';
import CallingAssignModel from './models/CallingAssignModel';
import { useGetCallingAssignQuery } from '../CallingAssignsApi';
import CallingAssignForm from './CallingAssignForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a callingAssign name')
		.min(5, 'The callingAssign name must be at least 5 characters')
});

function CallingAssign() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { callingAssignId } = routeParams;

	const {
		data: callingAssign,
		isLoading,
		isError
	} = useGetCallingAssignQuery(callingAssignId, {
		skip: !callingAssignId || callingAssignId === 'new'
	});
	console.log('callingAssignId', callingAssign, callingAssignId);

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
		if (callingAssignId === 'new') {
			reset(CallingAssignModel({}));
		}
	}, [callingAssignId, reset]);

	useEffect(() => {
		if (callingAssign) {
			reset({ ...callingAssign });
		}
	}, [callingAssign, reset, callingAssign?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested callingAssign is not exists
	 */
	if (isError && callingAssignId !== 'new') {
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
					There is no such callingAssign!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/callingAssign/callingAssign"
					color="inherit"
				>
					Go to CallingAssigns Page
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
				header={<CallingAssignHeader />}
				content={
					<div className="p-16 ">
						<CallingAssignForm callingAssignId={callingAssignId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default CallingAssign;
