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
import { useGetGroupQuery } from '../GroupsApi';
import GroupForm from './GroupForm';
import GroupHeader from './GroupHeader';
import GroupModel from './models/GroupModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
	name: z
		.string()
		.nonempty('You must enter a group name')
		.min(5, 'The group name must be at least 5 characters'),
	head_group: z
		.number()
});

function Group() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { groupId } = routeParams;

	const {
		data: group,
		isLoading,
		isError
	} = useGetGroupQuery(groupId, {
		skip: !groupId || groupId === 'new'
	});
	console.log('groupId', group, groupId);

	const [tabValue, setTabValue] = useState(0);
	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};
	const form = watch();
	useEffect(() => {
		if (groupId === 'new') {
			reset(GroupModel({}));
		}
	}, [groupId, reset]);

	useEffect(() => {
		if (group) {
			reset({ ...group });
		}
	}, [group, reset, group?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested groups is not exists
	 */
	if (isError && groupId !== 'new') {
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
					There is no such group!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/group/groups"
					color="inherit"
				>
					Go to Groups Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods} key={formKey}>
			{hasPermission('GROUP_DETAILS') && (
				<FusePageCarded
					header={<GroupHeader />}
					content={
						<div className='p-16 '>
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<GroupForm groupId={groupId} handleReset={handleReset} />
							</div>
						</div>
					}
					scroll={isMobile ? 'normal' : 'content'}
				/>
			)}
		</FormProvider>
	);
}

export default Group;
