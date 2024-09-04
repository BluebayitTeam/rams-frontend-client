import FusePageCarded from '@fuse/core/FusePageCarded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddedSuccessfully, CustomNotification } from 'src/app/@customHooks/notificationAlert';
import ManpowerSubmissionListHeader from './ManpowerSubmissionListHeader';
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
const schema = z.object();

function ManpowerSubmissionList(props) {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [tabileShow, setTabileShow] = useState(false);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch, getValues } = methods;

	const passenger = watch('passenger');
	const manPowerDate = watch('man_power_date');

	const navigate = useNavigate();

	const { data, refetch } = useGetManpowerSubmissionListsQuery({
		passenger,
		manPowerDate
	});

	const manpowerSubmissionListId = data && data.length > 0 ? data[0].man_power_list.id : null;

	const [createManpowerSubmissionList] = useCreateManpowerSubmissionListMutation();

	function handleCreateManpowerSubmissionList() {
		createManpowerSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();

					// Pass only manPowerDate to refetch
					refetch({
						manPowerDate: getValues().manPowerDate
					});
				}

				setTabileShow(true);

				// Navigate to the new page
				navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/new`);
			})
			.catch((error) => {
				// Show a custom error notification
				CustomNotification('error', `${error.response.data.passenger}`);
			});
	}

	function handleSearchPassengerClick() {
		const selectedPassenger = watch('passenger');

		if (selectedPassenger) {
			selectFilteredManpowerSubmissionLists({
				passenger: selectedPassenger.passenger_id
			});
			setTabileShow(true);
		} else {
			setTabileShow(false);
		}
	}

	// For debugging purposes

	function handleSearchManPowerDateClick() {
		const selectedManPowerDate = watch('man_power_date');

		if (selectedManPowerDate) {
			selectFilteredManpowerSubmissionLists({
				manPowerDate: selectedManPowerDate
			});
			setTabileShow(true);
		}
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
							manpowerSubmissionListId={manpowerSubmissionListId}
						/>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ManpowerSubmissionList;
