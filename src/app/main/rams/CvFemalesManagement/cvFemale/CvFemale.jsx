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
import CvFemaleHeader from './CvFemaleHeader';
import CvFemaleModel from './models/CvFemaleModel';
import { useGetCvFemaleQuery } from '../CvFemalesApi';
import CvFemaleForm from './CvFemaleForm';

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

function CvFemale() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { cvFemaleId } = routeParams;

	const {
		data: cvFemale,
		isLoading,
		isError
	} = useGetCvFemaleQuery(cvFemaleId, {
		skip: !cvFemaleId || cvFemaleId === 'new'
	});
	console.log('cvFemaleId', cvFemale, cvFemaleId);

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
		if (cvFemaleId === 'new') {
			reset(CvFemaleModel({}));
		}
	}, [cvFemaleId, reset]);

	useEffect(() => {
		if (cvFemale) {
			reset({ ...cvFemale });
		}
	}, [cvFemale, reset, cvFemale?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested cvFemale is not exists
	 */
	if (isError && cvFemaleId !== 'new') {
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
					There is no such cvFemale!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/cvFemale/cvFemale"
					color="inherit"
				>
					Go to CvFemales Page
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
				header={<CvFemaleHeader />}
				content={
					<>
						{/* <Tabs
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
							{cvFemaleId !== 'new' && (
								<Tab
									className="h-64"
									label="Opening Balance"
								/>
							)}
						</Tabs> */}
						<div className="p-16">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<CvFemaleForm cvFemaleId={cvFemaleId} />
							</div>

							{/* <div className={tabValue !== 1 ? 'hidden' : ''}>
								<OpeningBalance />
							</div> */}
						</div>
					</>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default CvFemale;
