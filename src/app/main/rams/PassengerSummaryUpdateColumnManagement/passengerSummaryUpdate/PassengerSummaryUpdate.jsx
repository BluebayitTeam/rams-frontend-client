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
import PassengerSummaryUpdateHeader from './PassengerSummaryUpdateHeader';
import PassengerSummaryUpdateModel from './models/PassengerSummaryUpdateModel';
import { useGetPassengerSummaryUpdateQuery } from '../PassengerSummaryUpdatesApi';
import PassengerSummaryUpdateForm from './PassengerSummaryUpdateForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	country: z.string().nonempty('You must enter a passengerSummaryUpdate name').min(5, 'The passengerSummaryUpdate name must be at least 5 characters')
});

function PassengerSummaryUpdate() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { passengerSummaryUpdateId } = routeParams;

	const {
		data: passengerSummaryUpdate,
		isLoading,
		isError
	} = useGetPassengerSummaryUpdateQuery(passengerSummaryUpdateId, {
		skip: !passengerSummaryUpdateId || passengerSummaryUpdateId === 'new'
	});
	console.log('passengerSummaryUpdateId', passengerSummaryUpdate, passengerSummaryUpdateId);

	const [tabValue, setTabValue] = useState(0);

	

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (passengerSummaryUpdateId === 'new') {
			reset(PassengerSummaryUpdateModel({}));
		}
	}, [passengerSummaryUpdateId, reset]);

	useEffect(() => {
		if (passengerSummaryUpdate) {
			reset({ ...passengerSummaryUpdate });
		}
	}, [passengerSummaryUpdate, reset, passengerSummaryUpdate?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested passengerSummaryUpdate is not exists
	 */
	if (isError && passengerSummaryUpdateId !== 'new') {
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
					There is no such passengerSummaryUpdate!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/passengerSummaryUpdate/passengerSummaryUpdate"
					color="inherit"
				>
					Go to PassengerSummaryUpdates Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('DEMAND_DETAILS') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<PassengerSummaryUpdateHeader />}
          content={
            <div className='p-16 '>
              <PassengerSummaryUpdateForm passengerSummaryUpdateId={passengerSummaryUpdateId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default PassengerSummaryUpdate;
