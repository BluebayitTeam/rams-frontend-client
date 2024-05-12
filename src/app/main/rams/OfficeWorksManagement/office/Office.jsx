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
import OfficeHeader from './OfficeHeader';
import OfficeModel from './models/OfficeModel';
import { useGetOfficeQuery } from '../OfficesApi';
import OfficeForm from './OfficeForm';
import NewOffice from './tabs/NewOffice';
// import OfficeForm from './OfficeForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a Office name')
		.min(5, 'The Office name must be at least 5 characters')
});

function Office() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { officeId } = routeParams;

	const {
		data: Office,
		isLoading,
		isError
	} = useGetOfficeQuery(officeId, {
		skip: !officeId || officeId === 'new'
	});
	// console.log('officeId', Office, officeId);

	const [tabValue, setTabValue] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	// eslint-disable-next-line unused-imports/no-unused-vars
	const form = watch();
	useEffect(() => {
		if (officeId === 'new') {
			reset(OfficeModel({}));
		}
	}, [officeId, reset]);

	useEffect(() => {
		if (Office) {
			reset({ ...Office });
		}
	}, [Office, reset, Office?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested Office is not exists
	 */
	if (isError && officeId !== 'new') {
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
					There is no such Office!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/Office/Office"
					color="inherit"
				>
					Go to offices Page
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
				header={<OfficeHeader />}
				content={
					<div className="p-16 ">
						<NewOffice />
						<OfficeForm officeId={officeId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Office;
