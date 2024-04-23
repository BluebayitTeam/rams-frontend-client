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
import moment from 'moment';
import FeatureDetailHeader from './FeatureDetailHeader';
import FeatureDetailModel from './models/FeatureDetailModel';
import { useGetFeatureDetailQuery } from '../FeatureDetailsApi';
import FeatureDetailForm from './FeatureDetailForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function FeatureDetail() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { featureDetailId } = routeParams;

	const {
		data: featureDetail,
		isLoading,
		isError
	} = useGetFeatureDetailQuery(featureDetailId, {
		skip: !featureDetailId || featureDetailId === 'new'
	});
	console.log('featureDetailId', featureDetail, featureDetailId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (featureDetailId === 'new') {
			reset(FeatureDetailModel({}));
		}
	}, [featureDetailId, reset]);

	useEffect(() => {
		if (featureDetail) {
			console.log('featureDetail', featureDetail);

			reset({
				...featureDetail,
				loan_date: moment(featureDetail?.loan_date).toISOString()
			});
		}
	}, [featureDetail, reset, featureDetail?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested featureDetails is not exists
	 */
	if (isError && featureDetailId !== 'new') {
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
					There is no such featureDetail!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/featureDetail/featureDetails"
					color="inherit"
				>
					Go to Feature List Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<FeatureDetailHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<FeatureDetailForm featureDetailId={featureDetailId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default FeatureDetail;
