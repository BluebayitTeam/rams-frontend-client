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
import MakeAListsManagementColumnHeader from './MakeAListsManagementColumnHeader';
import MakeAListsManagementColumnForm from './MakeAListsManagementColumnForm';
import MakeAListsManagementColumnModel from './models/MakeAListsManagementColumnModel';
import { useGetMakeAListsManagementColumnQuery } from '../MakeAListsManagementColumnsApi';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a makeAListsManagementColumn name')
		.min(5, 'The makeAListsManagementColumn name must be at least 5 characters')
});

function MakeAListsManagementColumn() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { makeAListsManagementColumnId } = routeParams;

	const {
		data: makeAListsManagementColumn,
		isLoading,
		isError,
		refetch
	} = useGetMakeAListsManagementColumnQuery(makeAListsManagementColumnId, {
		skip: !makeAListsManagementColumnId || makeAListsManagementColumnId === 'new'
	});
	console.log('makeAListsManagementColumnIdsdsdds', makeAListsManagementColumn, makeAListsManagementColumnId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		if (makeAListsManagementColumnId === 'new') {
			reset(MakeAListsManagementColumnModel({}));
		}
	}, [makeAListsManagementColumnId, reset]);

	useEffect(() => {
		refetch();

		if (makeAListsManagementColumn) {
			reset(makeAListsManagementColumn);
		}
	}, [reset, makeAListsManagementColumn?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested makeAListsManagementColumns is not exists
	 */
	if (isError && makeAListsManagementColumnId !== 'new') {
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
					There is no such makeAListsManagementColumn!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/makeAListsManagementColumn/makeAListsManagementColumns"
					color="inherit"
				>
					Go to MakeAListsManagementColumns Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<MakeAListsManagementColumnHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<MakeAListsManagementColumnForm makeAListsManagementColumns={makeAListsManagementColumn} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default MakeAListsManagementColumn;
