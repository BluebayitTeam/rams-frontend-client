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
import VisaEntryHeader from './VisaEntryHeader';
import VisaEntryModel from './models/VisaEntryModel';
import { useGetVisaEntryQuery } from '../VisaEntrysApi';
import VisaEntryForm from './VisaEntryForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a visaEntry name')
		.min(5, 'The visaEntry name must be at least 5 characters')
});

function VisaEntry() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { visaEntryId } = routeParams;

	const {
		data: visaEntry,
		isLoading,
		isError
	} = useGetVisaEntryQuery(visaEntryId, {
		skip: !visaEntryId || visaEntryId === 'new'
	});
	console.log('visaEntryId', visaEntry, visaEntryId);

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
		if (visaEntryId === 'new') {
			reset(VisaEntryModel({}));
		}
	}, [visaEntryId, reset]);

	useEffect(() => {
		if (visaEntry) {
			reset({ ...visaEntry });
		}
	}, [visaEntry, reset, visaEntry?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested visaEntry is not exists
	 */
	if (isError && visaEntryId !== 'new') {
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
					There is no such visaEntry!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/visaEntry/visaEntry"
					color="inherit"
				>
					Go to VisaEntrys Page
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
				header={<VisaEntryHeader />}
				content={
					<div className="p-16 ">
						<VisaEntryForm visaEntryId={visaEntryId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default VisaEntry;
