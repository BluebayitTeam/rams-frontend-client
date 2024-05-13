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
import MedicalHeader from './MedicalHeader';
import MedicalModel from './models/MedicalModel';
import { useGetMedicalQuery } from '../MedicalsApi';
import MedicalForm from './MedicalForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a medical name')
		.min(5, 'The medical name must be at least 5 characters')
});

function Medical() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { medicalId } = routeParams;

	const {
		data: medical,
		isLoading,
		isError
	} = useGetMedicalQuery(medicalId, {
		skip: !medicalId || medicalId === 'new'
	});
	console.log('medicalId', medical, medicalId);

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
		if (medicalId === 'new') {
			reset(MedicalModel({}));
		}
	}, [medicalId, reset]);

	useEffect(() => {
		if (medical) {
			reset({ ...medical });
		}
	}, [medical, reset, medical?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested medical is not exists
	 */
	if (isError && medicalId !== 'new') {
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
					There is no such medical!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/medical/medical"
					color="inherit"
				>
					Go to Medicals Page
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
				header={<MedicalHeader />}
				content={
					<div className="p-16 ">
						<MedicalForm medicalId={medicalId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Medical;
