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
import MakeListRowHeader from './MakeListRowHeader';
import MakeListRowModel from './models/MakeListRowModel';
import { useGetMakeListRowQuery } from '../MakeListRowApi';
import MakeListRowForm from './MakeListRowForm';

/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a makeListRow name')
		.min(5, 'The makeListRow name must be at least 5 characters')
});

function MakeListRow() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { makeListRowId } = routeParams;

	const {
		data: makeListRow,
		isLoading,
		isError,
		refetch
	} = useGetMakeListRowQuery(makeListRowId, {
		skip: !makeListRowId || makeListRowId === 'new'
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
		if (makeListRowId && makeListRowId !== 'new') {
			refetch();
		}
	}, [makeListRowId, refetch]);

	useEffect(() => {
		if (makeListRowId === 'new') {
			reset(MakeListRowModel({}));
		} else if (makeListRow) {
			reset(makeListRow);
		}
	}, [makeListRowId, reset, makeListRow]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested makeListRows is not exists
	 */
	if (isError && makeListRowId !== 'new') {
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
					There is no such makeListRow!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/makeListRow/makeListRows"
					color="inherit"
				>
					Go to MakeListRows Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<MakeListRowHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<MakeListRowForm makeListRows={makeListRow} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default MakeListRow;
