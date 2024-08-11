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
import SiteSettingHeader from './SiteSettingHeader';
import SiteSettingModel from './models/SiteSettingModel';
import { useGetSiteSettingQuery } from '../SiteSettingsApi';
import SiteSettingForm from './SiteSettingForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a siteSetting name')
		.min(5, 'The siteSetting name must be at least 5 characters')
});

function SiteSetting() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { siteSettingId } = routeParams;

	const {
		data: siteSetting,
		isLoading,
		isError
	} = useGetSiteSettingQuery(siteSettingId, {
		skip: !siteSettingId || siteSettingId === 'new'
	});
	console.log('siteSettingId', siteSetting, siteSettingId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (siteSettingId === 'new') {
			reset(SiteSettingModel({}));
		}
	}, [siteSettingId, reset]);

	useEffect(() => {
		if (siteSetting) {
			reset({ ...siteSetting });
		}
	}, [siteSetting, reset, siteSetting?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested siteSettings is not exists
	 */
	if (isError && siteSettingId !== 'new') {
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
					There is no such siteSetting!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/siteSetting/siteSettings"
					color="inherit"
				>
					Go to SiteSettings Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<SiteSettingHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<SiteSettingForm siteSettingId={siteSettingId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default SiteSetting;
