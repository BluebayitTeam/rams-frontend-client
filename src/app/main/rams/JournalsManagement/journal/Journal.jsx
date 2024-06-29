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
import JournalHeader from './JournalHeader';
import JournalModel from './models/JournalModel';
import { useGetJournalQuery } from '../JournalsApi';
import JournalForm from './JournalForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function Journal() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { journalId, invoice_no } = routeParams;

	const {
		data: journal,
		isLoading,
		isError
	} = useGetJournalQuery(invoice_no, {
		skip: !journalId || journalId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (journalId === 'new') {
			reset(JournalModel({}));
		}
	}, [journalId, reset]);

	useEffect(() => {
		if (journal) {
			const convertedJournalItems = setIdIfValueIsObjArryData(journal?.items);
			const convertedJournal = setIdIfValueIsObject2(journal);
			reset({
				...convertedJournal,
				items: convertedJournalItems
			});
		}
	}, [journal, reset, journal?.id]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested journals is not exists
	 */
	if (isError && journalId !== 'new') {
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
					There is no such journal!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/journal/journals"
					color="inherit"
				>
					Go to Journals Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<JournalHeader />}
				content={
					<div className="p-16 ">
						<div>
							<JournalForm journalId={journalId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Journal;
