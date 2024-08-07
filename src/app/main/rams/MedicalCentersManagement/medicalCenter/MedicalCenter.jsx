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
import MedicalCenterHeader from './MedicalCenterHeader';
import MedicalCenterModel from './models/MedicalCenterModel';
import { useGetMedicalCenterQuery } from '../MedicalCentersApi';
import MedicalCenterForm from './MedicalCenterForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a medicalCenter name')
		.min(5, 'The medicalCenter name must be at least 5 characters')
});

function MedicalCenter() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { medicalCenterId } = routeParams;

	const {
		data: medicalCenter,
		isLoading,
		isError
	} = useGetMedicalCenterQuery(medicalCenterId, {
		skip: !medicalCenterId || medicalCenterId === 'new'
	});
	console.log('medicalCenterId', medicalCenter, medicalCenterId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (medicalCenterId === 'new') {
			reset(MedicalCenterModel({}));
		}
	}, [medicalCenterId, reset]);

	useEffect(() => {
		if (medicalCenter) {
			reset({ ...medicalCenter });
		}
	}, [medicalCenter, reset, medicalCenter?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested medicalCenters is not exists
	 */
	if (isError && medicalCenterId !== 'new') {
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
					There is no such medicalCenter!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/medicalCenter/medicalCenters"
					color="inherit"
				>
					Go to MedicalCenters Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<MedicalCenterHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<MedicalCenterForm medicalCenterId={medicalCenterId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default MedicalCenter;
