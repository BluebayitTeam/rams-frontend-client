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
import ClientTypeHeader from './ClientTypeHeader';
import ClientTypeModel from './models/ClientTypeModel';
import { useGetClientTypeQuery } from '../ClientTypesApi';
import ClientTypeForm from './ClientTypeForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a clientType name')
		.min(5, 'The clientType name must be at least 5 characters')
});

function ClientType() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { clientTypeId } = routeParams;

	const {
		data: clientType,
		isLoading,
		isError
	} = useGetClientTypeQuery(clientTypeId, {
		skip: !clientTypeId || clientTypeId === 'new'
	});
	console.log('clientTypeId', clientType, clientTypeId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (clientTypeId === 'new') {
			reset(ClientTypeModel({}));
		}
	}, [clientTypeId, reset]);

	useEffect(() => {
		if (clientType) {
			reset({ ...clientType });
		}
	}, [clientType, reset, clientType?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested clientTypes is not exists
	 */
	if (isError && clientTypeId !== 'new') {
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
					There is no such clientType!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/clientType/clientTypes"
					color="inherit"
				>
					Go to Client Types Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ClientTypeHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<ClientTypeForm clientTypeId={clientTypeId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ClientType;
