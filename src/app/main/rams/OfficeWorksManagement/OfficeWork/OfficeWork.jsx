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
import OfficeWorkHeader from './OfficeWorkHeader';
import OfficeWorkModel from './models/OfficeWorkModel';
import { useGetOfficeWorkQuery } from '../OfficeWorksApi';
import OfficeWorkForm from './OfficeWorkForm';
import NewOfficeWork from './tabs/NewOfficeWork';
// import OfficeWorkForm from './OfficeWorkForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a officeWork name')
		.min(5, 'The officeWork name must be at least 5 characters')
});

function OfficeWork() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { officeWorkId } = routeParams;

	const {
		data: officeWork,
		isLoading,
		isError
	} = useGetOfficeWorkQuery(officeWorkId, {
		skip: !officeWorkId || officeWorkId === 'new'
	});
	// console.log('officeWorkId', officeWork, officeWorkId);

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
		if (officeWorkId === 'new') {
			reset(OfficeWorkModel({}));
		}
	}, [officeWorkId, reset]);

	useEffect(() => {
		if (officeWork) {
			reset({ ...officeWork });
		}
	}, [officeWork, reset, officeWork?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested officeWork is not exists
	 */
	if (isError && officeWorkId !== 'new') {
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
					There is no such officeWork!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/officeWork/officeWork"
					color="inherit"
				>
					Go to OfficeWorks Page
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
				header={<OfficeWorkHeader />}
				content={
					<div className="p-16 ">
						<NewOfficeWork />
						<OfficeWorkForm officeWorkId={officeWorkId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default OfficeWork;
