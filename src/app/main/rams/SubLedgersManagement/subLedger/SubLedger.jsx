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
import SubLedgerHeader from './SubLedgerHeader';
import SubLedgerModel from './models/SubLedgerModel';
import { useGetSubLedgerQuery } from '../SubLedgersApi';
import SubLedgerForm from './SubLedgerForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a subLedger name')
		.min(5, 'The subLedger name must be at least 5 characters')
});

function SubLedger() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { subLedgerId } = routeParams;

	const {
		data: subLedger,
		isLoading,
		isError
	} = useGetSubLedgerQuery(subLedgerId, {
		skip: !subLedgerId || subLedgerId === 'new'
	});
	console.log('subLedgerId', subLedger, subLedgerId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (subLedgerId === 'new') {
			reset(SubLedgerModel({}));
		}
	}, [subLedgerId, reset]);

	useEffect(() => {
		if (subLedger) {
			reset({ ...subLedger });
		}
	}, [subLedger, reset, subLedger?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested subLedgers is not exists
	 */
	if (isError && subLedgerId !== 'new') {
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
					There is no such subLedger!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/subLedger/subLedgers"
					color="inherit"
				>
					Go to SubLedgers Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<SubLedgerHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<SubLedgerForm subLedgerId={subLedgerId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default SubLedger;
