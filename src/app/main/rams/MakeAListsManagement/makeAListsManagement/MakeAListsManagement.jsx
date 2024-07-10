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
import MakeAListsManagementHeader from './MakeAListsManagementHeader';
import MakeAListsManagementModel from './models/MakeAListsManagementModel';
import { useGetMakeAListsManagementQuery } from '../MakeAListsManagementsApi';
import MakeAListsManagementForm from './MakeAListsManagementForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a makeAListsManagement name')
		.min(5, 'The makeAListsManagement name must be at least 5 characters')
});

function MakeAListsManagement() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { makeAListsManagementId } = routeParams;

	const {
		data: makeAListsManagement,
		isLoading,
		isError
	} = useGetMakeAListsManagementQuery(makeAListsManagementId, {
		skip: !makeAListsManagementId || makeAListsManagementId === 'new'
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
		if (makeAListsManagementId === 'new') {
			reset(MakeAListsManagementModel({}));
		}
	}, [makeAListsManagementId, reset]);

	useEffect(() => {
		if (makeAListsManagement) {
			reset({ ...makeAListsManagement });
		}
	}, [makeAListsManagement, reset, makeAListsManagement?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested makeAListsManagements is not exists
	 */
	if (isError && makeAListsManagementId !== 'new') {
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
					There is no such makeAListsManagement!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/makeAListsManagement/makeAListsManagements"
					color="inherit"
				>
					Go to MakeAListsManagements Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<MakeAListsManagementHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<MakeAListsManagementForm makeAListsManagementId={makeAListsManagementId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default MakeAListsManagement;
