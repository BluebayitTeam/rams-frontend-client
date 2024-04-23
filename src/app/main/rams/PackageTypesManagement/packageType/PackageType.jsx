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
import PackageTypeHeader from './PackageTypeHeader';
import PackageTypeModel from './models/PackageTypeModel';
import { useGetPackageTypeQuery } from '../PackageTypesApi';
import PackageTypeForm from './PackageTypeForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function PackageType() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { packageTypeId } = routeParams;

	const {
		data: packageType,
		isLoading,
		isError
	} = useGetPackageTypeQuery(packageTypeId, {
		skip: !packageTypeId || packageTypeId === 'new'
	});
	console.log('packageTypeId', packageType, packageTypeId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (packageTypeId === 'new') {
			reset(PackageTypeModel({}));
		}
	}, [packageTypeId, reset]);

	useEffect(() => {
		if (packageType) {
			console.log('packageType', packageType);

			reset({
				...packageType,
				loan_date: moment(packageType?.loan_date).toISOString()
			});
		}
	}, [packageType, reset, packageType?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested packageTypes is not exists
	 */
	if (isError && packageTypeId !== 'new') {
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
					There is no such packageType!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/packageType/packageTypes"
					color="inherit"
				>
					Go to Package Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PackageTypeHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PackageTypeForm packageTypeId={packageTypeId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PackageType;
