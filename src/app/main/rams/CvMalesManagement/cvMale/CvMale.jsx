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
import CvMaleHeader from './CvMaleHeader';
import CvMaleModel from './models/CvMaleModel';
import { useGetCvMaleQuery } from '../CvMalesApi';
import CvMaleForm from './CvMaleForm';

/**
 * Form Validation Schema
 */
const schema = z.object({
	passenger: z.number().refine((val) => val !== null && val !== undefined, {
		message: 'Passenger is required'
	}),
	country: z.number().refine((val) => val !== null && val !== undefined, {
		message: 'Country is required'
	})
});

function CvMale() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { cvMaleId } = routeParams;

	const {
		data: cvMale,
		isLoading,
		isError
	} = useGetCvMaleQuery(cvMaleId, {
		skip: !cvMaleId || cvMaleId === 'new'
	});
	console.log('cvMaleId', cvMale, cvMaleId);

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
		if (cvMaleId === 'new') {
			reset(CvMaleModel({}));
		}
	}, [cvMaleId, reset]);

	useEffect(() => {
		if (cvMale) {
			reset({ ...cvMale });
		}
	}, [cvMale, reset, cvMale?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested cvMale is not exists
	 */
	if (isError && cvMaleId !== 'new') {
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
					There is no such cvMale!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/cvMale/cvMale"
					color="inherit"
				>
					Go to CvMales Page
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
				header={<CvMaleHeader />}
				content={
					<div className="p-16">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<CvMaleForm cvMaleId={cvMaleId} />
						</div>
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default CvMale;
