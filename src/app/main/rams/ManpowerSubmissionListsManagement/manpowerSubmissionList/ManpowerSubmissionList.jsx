import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const emptyValue = {
		agency: '',
		passenger: '',

		country: '',
		man_power_date: ''
	};

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [tabileShow, setTabileShow] = useState(false);
	const [formKey, setFormKey] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});
	const { reset, watch, getValues } = methods;

	const handleReset = (defaultValues) => {
		reset(defaultValues);
		setFormKey((prevKey) => prevKey + 1); // Trigger re-render with new form key
	};

	const passenger = watch('passenger');
	const manPowerDate = watch('man_power_date');

	const navigate = useNavigate();

	const { data, refetch } = useGetManpowerSubmissionListsQuery({
		passenger,
		manPowerDate
	});
	const manpowerSubmissionListId = data && data.length > 0 ? data[0].man_power_list.id : null;

	const { data: data2, refetch: refetch2 } = useGetManpowerSubmissionListsQuery({
		manPowerDate
	});

	// console.log('refetch2', data2);

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

	function handleCancel() {
		handleReset({
			...emptyValue
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
		<FormProvider
			{...methods}
			key={formKey}
		>
			<FusePageCarded
				header={<ManpowerSubmissionListHeader />}
				content={
					<div className="p-16 ">
						<ManpowerSubmissionListForm
							manpowerSubmissionListId={manpowerSubmissionListId}
							handleSearchPassengerClick={handleSearchPassengerClick}
							handleSearchManPowerDateClick={handleSearchManPowerDateClick}
							handleCreateManpowerSubmissionList={handleCreateManpowerSubmissionList}
							handleCancel={handleCancel}
						/>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<ManpowerSubmissionLists
							data={data}
							data2={data2}
							tabileShow={tabileShow}
							manpowerSubmissionListId={manpowerSubmissionListId}
							handleReset={handleReset}
							emptyValue={emptyValue}
						/>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ManpowerSubmissionList;
