import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddedSuccessfully, CustomNotification } from 'src/app/@customHooks/notificationAlert';
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

	const { refetch: refetch2 } = useGetManpowerSubmissionListsQuery({
		manPowerDate
	});

	function handleSearchPassengerClick() {
		const selectedPassenger = watch('passenger');

		if (selectedPassenger) {
			refetch({
				passenger: selectedPassenger.passenger_id
			});

			setTabileShow(true);
		} else {
			setTabileShow(false);
		}
	}

	const [createManpowerSubmissionList] = useCreateManpowerSubmissionListMutation();

	function handleCreateManpowerSubmissionList() {
		createManpowerSubmissionList();
		createManpowerSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();

					refetch2({
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

	useEffect(() => {
		if (manpowerSubmissionListId === 'new') {
			reset(ManpowerSubmissionListModel({}));
		}
	}, [manpowerSubmissionListId, reset]);

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
