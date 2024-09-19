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
import RecruitingAgencyHeader from './RecruitingAgencyHeader';
import RecruitingAgencyModel from './models/RecruitingAgencyModel';
import { useGetRecruitingAgencyQuery } from '../RecruitingAgencysApi';
import RecruitingAgencyForm from './RecruitingAgencyForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a recruitingAgency name')
		.min(5, 'The recruitingAgency name must be at least 5 characters')
});

function RecruitingAgency() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { recruitingAgencyId } = routeParams;

	const {
		data: recruitingAgency,
		isLoading,
		isError
	} = useGetRecruitingAgencyQuery(recruitingAgencyId, {
		skip: !recruitingAgencyId || recruitingAgencyId === 'new'
	});
	console.log('recruitingAgencyId', recruitingAgency, recruitingAgencyId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (recruitingAgencyId === 'new') {
			reset(RecruitingAgencyModel({}));
		}
	}, [recruitingAgencyId, reset]);

	useEffect(() => {
		if (recruitingAgency) {
			reset({ ...recruitingAgency });
		}
	}, [recruitingAgency, reset, recruitingAgency?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested recruitingAgencys is not exists
	 */
	if (isError && recruitingAgencyId !== 'new') {
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
					There is no such recruitingAgency!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/recruitingAgency/recruitingAgencys"
					color="inherit"
				>
					Go to RecruitingAgencys Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('RECRUITING_AGENCY_DETAILS') && (
        <FusePageCarded
          header={<RecruitingAgencyHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <RecruitingAgencyForm recruitingAgencyId={recruitingAgencyId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default RecruitingAgency;
