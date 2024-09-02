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
import ManpowerSubmissionListHeader from './ManpowerSubmissionListHeader';
import ManpowerSubmissionListModel from './models/ManpowerSubmissionListModel';
import {
	selectFilteredManpowerSubmissionLists,
	useGetManpowerSubmissionListQuery,
	useGetManpowerSubmissionListsQuery
} from '../ManpowerSubmissionListsApi';
import ManpowerSubmissionListForm from './ManpowerSubmissionListForm';
import ManpowerSubmissionLists from '../manpowerSubmissionLists/ManpowerSubmissionLists';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a manpowerSubmissionList name')
		.min(5, 'The manpowerSubmissionList name must be at least 5 characters')
});

function ManpowerSubmissionList(props) {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { manpowerSubmissionListId } = routeParams;
	console.log('manpowerSubmissionListId', manpowerSubmissionListId);

	const {
		data: manpowerSubmissionList,
		isLoading,
		isError
	} = useGetManpowerSubmissionListQuery(manpowerSubmissionListId, {
		skip: !manpowerSubmissionListId || manpowerSubmissionListId === 'new'
	});
	// console.log('manpowerSubmissionListId', manpowerSubmissionList, manpowerSubmissionListId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			man_power_date: ''
		},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	const passenger = watch('passenger');
	const manPowerDate = watch('man_power_date');

	console.log('manPowerDate', manPowerDate);

	const { data, isFetching, error } = useGetManpowerSubmissionListsQuery({
		passenger,
		manPowerDate
	});

	function handleSearchPassengerClick() {
		const selectedPassenger = watch('passenger');
		console.log('selectedPassenger', selectedPassenger);

		if (selectedPassenger) {
			selectFilteredManpowerSubmissionLists({ passenger: selectedPassenger.passenger_id });
		}
	}

	function handleSearchManPowerDateClick() {
		const selectedManPowerDate = watch('man_power_date');
		console.log('selectedDate', selectedManPowerDate);

		if (selectedManPowerDate) {
			selectFilteredManpowerSubmissionLists({ manPowerDate: selectedManPowerDate });
		}
	}

	console.log('fdksdfhsdkfhsdkf', data);
	useEffect(() => {
		if (manpowerSubmissionListId === 'new') {
			reset(ManpowerSubmissionListModel({}));
		}
	}, [manpowerSubmissionListId, reset]);

	useEffect(() => {
		if (manpowerSubmissionList) {
			reset({ ...manpowerSubmissionList });
		}
	}, [manpowerSubmissionList, reset, manpowerSubmissionList?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested manpowerSubmissionLists is not exists
	 */
	if (isError && manpowerSubmissionListId !== 'new') {
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
					There is no such manpowerSubmissionList!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/manpowerSubmissionList/manpowerSubmissionLists"
					color="inherit"
				>
					Go to ManpowerSubmissionLists Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ManpowerSubmissionListHeader />}
				content={
					<div className="p-16 ">
						<ManpowerSubmissionListForm
							manpowerSubmissionListId={manpowerSubmissionListId}
							handleSearchPassengerClick={handleSearchPassengerClick}
							handleSearchManPowerDateClick={handleSearchManPowerDateClick}
						/>
						<br />
						<br />
						<br />
						<br />
						<ManpowerSubmissionLists data={data} />
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ManpowerSubmissionList;
