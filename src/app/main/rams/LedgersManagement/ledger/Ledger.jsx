import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { z } from 'zod';
import { useGetLedgerQuery } from '../LedgersApi';
import LedgerForm from './LedgerForm';
import LedgerHeader from './LedgerHeader';
import LedgerModel from './models/LedgerModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z
		.string()
		.nonempty('You must enter a ledger name')
		.min(5, 'The ledger name must be at least 5 characters'),
	head_group: z
		.number()
});

function Ledger() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ledgerId } = routeParams;

	const {
		data: ledger,
		isLoading,
		isError
	} = useGetLedgerQuery(ledgerId, {
		skip: !ledgerId || ledgerId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (ledgerId === 'new') {
			reset(LedgerModel({}));
		}
	}, [ledgerId, reset]);

	useEffect(() => {
		if (ledger) {
			reset({ ...ledger });
		}
	}, [ledger, reset, ledger?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested ledgers is not exists
	 */
	if (isError && ledgerId !== 'new') {
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
					There is no such ledger!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/ledger/ledgers"
					color="inherit"
				>
					Go to Ledgers Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			{hasPermission('LEDGER_ACCOUNT_DETAILS') && (
				<FusePageCarded
					header={<LedgerHeader />}
					content={
						<div className='p-16 '>
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<LedgerForm ledgerId={ledgerId} />
							</div>
						</div>
					}
					scroll={isMobile ? 'normal' : 'content'}
				/>
			)}
		</FormProvider>
	);
}

export default Ledger;
