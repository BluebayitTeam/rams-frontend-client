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
import FormContentDetailHeader from './FormContentDetailHeader';
import FormContentDetailModel from './models/FormContentDetailModel';
import { useGetFormContentDetailQuery } from '../FormContentDetailsApi';
import FormContentDetailForm from './FormContentDetailForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a formContentDetail name')
		.min(5, 'The formContentDetail name must be at least 5 characters')
});

function FormContentDetail() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { formContentDetailId } = routeParams;

	const {
		data: formContentDetail,
		isLoading,
		isError
	} = useGetFormContentDetailQuery(formContentDetailId, {
		skip: !formContentDetailId || formContentDetailId === 'new'
	});
	console.log('formContentDetailId', formContentDetail, formContentDetailId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (formContentDetailId === 'new') {
			reset(FormContentDetailModel({}));
		}
	}, [formContentDetailId, reset]);

	useEffect(() => {
		if (formContentDetail) {
			reset({ ...formContentDetail });
		}
	}, [formContentDetail, reset, formContentDetail?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested formContentDetails is not exists
	 */
	if (isError && formContentDetailId !== 'new') {
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
					There is no such formContentDetail!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/formContentDetail/formContentDetails"
					color="inherit"
				>
					Go to FormContentDetails Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<FormContentDetailHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<FormContentDetailForm formContentDetailId={formContentDetailId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default FormContentDetail;
