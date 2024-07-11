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
import MakeAListHeader from './MakeAListHeader';
import MakeAListModel from './models/MakeAListModel';
import { useGetMakeAListQuery } from '../MakeAListsApi';
import MakeAListForm from './MakeAListForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a makeAList name')
		.min(5, 'The makeAList name must be at least 5 characters')
});

function MakeAList() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { makeAListId } = routeParams;

	const {
		data: makeAList,
		isLoading,
		isError
	} = useGetMakeAListQuery(makeAListId, {
		skip: !makeAListId || makeAListId === 'new'
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
		if (makeAListId === 'new') {
			reset(MakeAListModel({}));
		}
	}, [makeAListId, reset]);

	useEffect(() => {
		if (makeAList) {
			reset({ ...makeAList });
		}
	}, [makeAList, reset, makeAList?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested makeALists is not exists
	 */
	if (isError && makeAListId !== 'new') {
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
					There is no such makeAList!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/makeAList/makeALists"
					color="inherit"
				>
					Go to MakeALists Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<MakeAListHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<MakeAListForm makeAListId={makeAListId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default MakeAList;
