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
import SupportHeader from './SupportHeader';
import SupportModel from './models/SupportModel';
import { useGetSupportQuery } from '../SupportsApi';
import SupportForm from './SupportForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a support name')
		.min(5, 'The support name must be at least 5 characters')
});

function Support() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { supportId } = routeParams;

	const {
		data: support,
		isLoading,
		isError,
		refetch
	} = useGetSupportQuery(supportId, {
		skip: !supportId || supportId === 'new'
	});
	console.log('supportId', support, supportId);

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
			reset(SupportModel({}));
		}
	}, [supportId, reset]);

	useEffect(() => {
		if (support) {
			reset({ ...support });
		}
	}, [support, reset, support?.id]);

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
					There is no such support!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/support/supports"
					color="inherit"
				>
					Go to Supports Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={
					<SupportHeader
						refetch={refetch}
						supportId={supportId}
					/>
				}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<SupportForm
								support={support || []}
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

export default Support;
