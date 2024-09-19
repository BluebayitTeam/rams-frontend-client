import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import setIdIfValueIsObjArryData from 'src/app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'src/app/@helpers/setIdIfValueIsObject2';
import JournalIDHeader from './JournalIDHeader';
import JournalIDModel from './models/JournalIDModel';
import { useGetJournalIDQuery } from '../JournalIDsApi';
import JournalIDForm from './JournalIDForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function JournalID() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { journalIDId, invoice_no } = routeParams;

	const {
		data: journalID,
		isLoading,
		isError
	} = useGetJournalIDQuery(invoice_no, {
		skip: !journalIDId || journalIDId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (journalIDId === 'new') {
			reset(JournalIDModel({}));
		}
	}, [journalIDId, reset]);

	useEffect(() => {
		if (journalID) {
			const convertedJournalIDItems = setIdIfValueIsObjArryData(journalID?.items);
			const convertedJournalID = setIdIfValueIsObject2(journalID);
			reset({
				...convertedJournalID,
				items: convertedJournalIDItems
			});
		}
	}, [journalID, reset, journalID?.id]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested journalIDs is not exists
	 */
	if (isError && journalIDId !== 'new') {
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
					There is no such journalID!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/journalID/journalIDs"
					color="inherit"
				>
					Go to JournalIDs Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('IDJOURNAL_DETAILS') && (
        <FusePageCarded
          header={<JournalIDHeader />}
          content={
            <div className='p-16 '>
              <div>
                <JournalIDForm journalIDId={journalIDId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default JournalID;
