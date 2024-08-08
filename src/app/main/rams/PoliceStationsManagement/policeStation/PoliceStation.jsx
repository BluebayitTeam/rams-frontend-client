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
import PoliceStationHeader from './PoliceStationHeader';
import PoliceStationModel from './models/PoliceStationModel';
import { useGetPoliceStationQuery } from '../PoliceStationsApi';
import PoliceStationForm from './PoliceStationForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a policeStation name')
		.min(5, 'The policeStation name must be at least 5 characters')
});

function PoliceStation() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { policeStationId } = routeParams;

	const {
		data: policeStation,
		isLoading,
		isError
	} = useGetPoliceStationQuery(policeStationId, {
		skip: !policeStationId || policeStationId === 'new'
	});
	console.log('policeStationId', policeStation, policeStationId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (policeStationId === 'new') {
			reset(PoliceStationModel({}));
		}
	}, [policeStationId, reset]);

	useEffect(() => {
		if (policeStation) {
			reset({ ...policeStation });
		}
	}, [policeStation, reset, policeStation?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested policeStations is not exists
	 */
	if (isError && policeStationId !== 'new') {
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
					There is no such policeStation!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/policeStation/policeStations"
					color="inherit"
				>
					Go to PoliceStations Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PoliceStationHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PoliceStationForm policeStationId={policeStationId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PoliceStation;
