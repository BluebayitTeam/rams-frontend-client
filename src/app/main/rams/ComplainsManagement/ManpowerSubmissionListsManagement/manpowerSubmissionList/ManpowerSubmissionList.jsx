import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import ManpowerSubmissionListHeader from './ManpowerSubmissionListHeader';
import ManpowerSubmissionListModel from './models/ManpowerSubmissionListModel';
import {
	selectFilteredManpowerSubmissionLists,
	useCreateManpowerSubmissionListMutation,
	useGetManpowerSubmissionListsQuery
} from '../ManpowerSubmissionListsApi';
import ManpowerSubmissionListForm from './ManpowerSubmissionListForm';
import ManpowerSubmissionLists from '../manpowerSubmissionLists/ManpowerSubmissionLists';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function ManpowerSubmissionList(props) {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { manpowerSubmissionListId } = routeParams;
	const [tabileShow, setTableShow] = useState(false);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch, getValues } = methods;

	const passenger = watch('passenger');
	const manPowerDate = watch('man_power_date');

	const navigate = useNavigate();

	const { data, refetch: getPassengerList } = useGetManpowerSubmissionListsQuery({
		passenger,
		manPowerDate
	});

	function handleSearchPassengerClick() {
		const selectedPassenger = watch('passenger');

		if (selectedPassenger) {
			refetch({
				passenger: selectedPassenger.passenger_id
			});

			// Show the table after data is fetched
			setTableShow(true);
		} else {
			// Hide the table if no passenger is selected
			setTableShow(false);
		}
	}

	console.log('manpowerSubmissionListDtatalist', data);

	const [createManpowerSubmissionList] = useCreateManpowerSubmissionListMutation();

	function handleCreateManpowerSubmissionList() {
		createManpowerSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();
				}

				setTableShow(true);

				navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/new`);
			})
			.catch((error) => {
				CustomNotification('errorhfghgfhg', `${error.response.data.passenger}`);
			});
	}

	// For debugging purposes

	function handleSearchManPowerDateClick() {
		const selectedManPowerDate = watch('man_power_date');

		if (selectedManPowerDate) {
			selectFilteredManpowerSubmissionLists({
				manPowerDate: selectedManPowerDate
			});
			setTableShow(true);
		}
	}

	console.log('fdksdfhsdkfhsdkf', data);
	useEffect(() => {
		if (manpowerSubmissionListId === 'new') {
			reset(ManpowerSubmissionListModel({}));
		}
	}, [manpowerSubmissionListId, reset]);

	// useEffect(() => {
	// 	if (manpowerSubmissionList) {
	// 		reset({ ...manpowerSubmissionList });
	// 	}
	// }, [manpowerSubmissionList, reset, manpowerSubmissionList?.id]);

	// function handleTabChange(event, value) {
	// 	setTabValue(value);
	// }

	// if (isLoading) {
	// 	return <FuseLoading />;
	// }

	/**
	 * Show Message if the requested manpowerSubmissionLists is not exists
	 */
	// if (isError && manpowerSubmissionListId !== 'new') {
	// 	return (
	// 		<motion.div
	// 			initial={{ opacity: 0 }}
	// 			animate={{ opacity: 1, transition: { delay: 0.1 } }}
	// 			className="flex flex-col flex-1 items-center justify-center h-full"
	// 		>
	// 			<Typography
	// 				color="text.secondary"
	// 				variant="h5"
	// 			>
	// 				There is no such manpowerSubmissionList!
	// 			</Typography>
	// 			<Button
	// 				className="mt-24"
	// 				component={Link}
	// 				variant="outlined"
	// 				to="/apps/manpowerSubmissionList/manpowerSubmissionLists"
	// 				color="inherit"
	// 			>
	// 				Go to ManpowerSubmissionLists Page
	// 			</Button>
	// 		</motion.div>
	// 	);
	// }

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
							handleCreateManpowerSubmissionList={handleCreateManpowerSubmissionList}
						/>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<ManpowerSubmissionLists
							data={data}
							tabileShow={tabileShow}
						/>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ManpowerSubmissionList;
