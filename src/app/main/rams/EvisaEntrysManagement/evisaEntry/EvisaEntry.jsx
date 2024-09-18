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
import EvisaEntryHeader from './EvisaEntryHeader';
import EvisaEntryModel from './models/EvisaEntryModel';
import { useGetEvisaEntryQuery } from '../EvisaEntrysApi';
import EvisaEntryForm from './EvisaEntryForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a evisaEntry name')
		.min(5, 'The evisaEntry name must be at least 5 characters')
});

function EvisaEntry() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { evisaEntryId } = routeParams;

	const {
		data: evisaEntry,
		isLoading,
		isError
	} = useGetEvisaEntryQuery(evisaEntryId, {
		skip: !evisaEntryId || evisaEntryId === 'new'
	});
	console.log('evisaEntryId', evisaEntry, evisaEntryId);

	const [tabValue, setTabValue] = useState(0);

	console.log('tabValue', tabValue);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (evisaEntryId === 'new') {
			reset(EvisaEntryModel({}));
		}
	}, [evisaEntryId, reset]);

	useEffect(() => {
		if (evisaEntry) {
			reset({ ...evisaEntry });
		}
	}, [evisaEntry, reset, evisaEntry?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested evisaEntry is not exists
	 */
	if (isError && evisaEntryId !== 'new') {
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
					There is no such evisaEntry!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/evisaEntry/evisaEntry"
					color="inherit"
				>
					Go to EvisaEntrys Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('EVISA_ENTRY_DETAILS') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<EvisaEntryHeader />}
          content={
            <div className='p-16 '>
              <EvisaEntryForm evisaEntryId={evisaEntryId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default EvisaEntry;
