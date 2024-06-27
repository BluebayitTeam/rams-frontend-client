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
import CallingEntryHeader from './CallingEntryHeader';
import CallingEntryModel from './models/CallingEntryModel';
import { useGetCallingEntryQuery } from '../CallingEntrysApi';
import CallingEntryForm from './CallingEntryForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	sponsor_id_no: z
		.string()
		.nonempty('You must enter a callingEntry name')
		.min(5, 'The callingEntry name must be at least 5 characters')
});

function CallingEntry() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { callingEntryId } = routeParams;

	const {
		data: callingEntry,
		isLoading,
		isError
	} = useGetCallingEntryQuery(callingEntryId, {
		skip: !callingEntryId || callingEntryId === 'new'
	});
	console.log('callingEntryId', callingEntry, callingEntryId);

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
		if (callingEntryId === 'new') {
			reset(CallingEntryModel({}));
		}
	}, [callingEntryId, reset]);

	useEffect(() => {
		if (callingEntry) {
			reset({ ...callingEntry });
		}
	}, [callingEntry, reset, callingEntry?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested callingEntry is not exists
	 */
	if (isError && callingEntryId !== 'new') {
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
					There is no such callingEntry!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/callingEntry/callingEntry"
					color="inherit"
				>
					Go to CallingEntrys Page
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
				header={<CallingEntryHeader />}
				content={
					<div className="p-16 ">
						<CallingEntryForm callingEntryId={callingEntryId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default CallingEntry;
