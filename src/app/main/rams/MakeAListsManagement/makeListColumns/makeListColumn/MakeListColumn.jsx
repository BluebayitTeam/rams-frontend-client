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
import MakeListColumnHeader from './MakeListColumnHeader';
import MakeListColumnModel from './models/MakeColumnModel';
import { useGetMakeListColumnQuery } from '../MakeListColumnApi';
import MakeListColumnForm from './MakeListColumnForm';

/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a makeListColumn name')
		.min(5, 'The makeListColumn name must be at least 5 characters')
});

function MakeListColumn() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { makeListColumnId } = routeParams;

	const {
		data: makeListColumn,
		isLoading,
		isError,
		refetch
	} = useGetMakeListColumnQuery(makeListColumnId, {
		skip: !makeListColumnId || makeListColumnId === 'new'
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
		if (makeListColumnId && makeListColumnId !== 'new') {
			refetch();
		}
	}, [makeListColumnId, refetch]);

	useEffect(() => {
		if (makeListColumnId === 'new') {
			reset(MakeListColumnModel({}));
		} else if (makeListColumn) {
			reset(makeListColumn);
		}
	}, [makeListColumnId, reset, makeListColumn]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested makeListColumns is not exists
	 */
	if (isError && makeListColumnId !== 'new') {
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
					There is no such makeListColumn!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/makeListColumn/makeListColumns"
					color="inherit"
				>
					Go to MakeListColumns Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<MakeListColumnHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<MakeListColumnForm makeListColumns={makeListColumn} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default MakeListColumn;
