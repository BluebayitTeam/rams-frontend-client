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
import { GET_PACKAGE_DETAIL_BY_ID } from 'src/app/constant/constants';
import PackageDetailHeader from './PackageDetailHeader';
import PackageDetailModel from './models/PackageDetailModel';
import { useGetPackageDetailQuery } from '../PackageDetailsApi';
import PackageDetailForm from './PackageDetailForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a packageDetail name')
		.min(5, 'The packageDetail name must be at least 5 characters')
});

function PackageDetail() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { packageDetailId } = routeParams;

	const {
		data: packageDetail,
		isLoading,
		isError
	} = useGetPackageDetailQuery(packageDetailId, {
		skip: !packageDetailId || packageDetailId === 'new'
	});
	console.log('packageDetailId', packageDetail, packageDetailId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	const [packageDetails, setPackageDetails] = useState([]);
	useEffect(() => {
		reset(packageDetails);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_PACKAGE_DETAIL_BY_ID}${packageDetailId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setPackageDetails(data || []);
				reset(data || []);
			})
			.catch(() => {});
	}, []);
	useEffect(() => {
		if (packageDetailId === 'new') {
			reset(PackageDetailModel({}));
		}
	}, [packageDetailId, reset]);

	useEffect(() => {
		if (packageDetail) {
			reset({ ...packageDetail });
		}
	}, [packageDetail, reset, packageDetail?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested packageDetails is not exists
	 */
	if (isError && packageDetailId !== 'new') {
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
					There is no such packageDetail!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/packageDetail/packageDetails"
					color="inherit"
				>
					Go to PackageDetails Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PackageDetailHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PackageDetailForm packageDetails={packageDetails} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PackageDetail;
