import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetSupportQuery } from '../SupportsApi';

import NewSupportForm from './NewSupportForm';
import NewSupportHeader from './NewSupportHeader';
import NewSupportModel from './models/NewSupportModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a newSupport name')
		.min(5, 'The newSupport name must be at least 5 characters')
});

function NewSupport() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { supportId } = routeParams;

	const {
		data: newSupport,
		isLoading,
		isError,
		refetch
	} = useGetSupportQuery(supportId, {
		skip: !supportId || supportId === 'new'
	});
	console.log('supportId', newSupport, supportId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useEffect(() => {
		if (supportId === 'new') {
			reset(NewSupportModel({}));
		}
	}, [supportId, reset]);

	useEffect(() => {
		if (newSupport) {
			reset({ ...newSupport });
		}
	}, [newSupport, reset, newSupport?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested supports is not exists
	 */
	if (isError && supportId !== 'new') {
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
					There is no such newSupport!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/newSupport/supports"
					color="inherit"
				>
					Go to NewSupports Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={
					<NewSupportHeader
						refetch={refetch}
						supportId={supportId}
					/>
				}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<NewSupportForm
								newSupport={newSupport || []}
								refetch={refetch}
								supportId={supportId}
							/>
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default NewSupport;
