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
import JournalIdHeader from './JournalIdHeader';
import JournalIdModel from './models/JournalIdModel';
import { useGetJournalIdQuery } from '../JournalIdsApi';
import JournalIdForm from './JournalIdForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function JournalId() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { journalIdId, invoice_no } = routeParams;

	const {
		data: journalId,
		isLoading,
		isError
	} = useGetJournalIdQuery(invoice_no, {
		skip: !journalIdId || journalIdId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (journalIdId === 'new') {
			reset(JournalIdModel({}));
		}
	}, [journalIdId, reset]);

	useEffect(() => {
		if (journalId) {
			const convertedJournalIdItems = setIdIfValueIsObjArryData(journalId?.items);
			const convertedJournalId = setIdIfValueIsObject2(journalId);
			reset({
				...convertedJournalId,
				items: convertedJournalIdItems
			});
		}
	}, [journalId, reset, journalId?.id]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested journalIds is not exists
	 */
	if (isError && journalIdId !== 'new') {
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
					There is no such journalId!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/journalId/journalIds"
					color="inherit"
				>
					Go to JournalIds Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<JournalIdHeader />}
				content={
					<div className="p-16 ">
						<div>
							<JournalIdForm journalIdId={journalIdId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default JournalId;
