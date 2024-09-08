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
	useCreateManpowerSubmissionListMutation,
	useGetManpowerSubmissionListsQuery
} from '../ManpowerSubmissionListsApi';
import ManpowerSubmissionListForm from './ManpowerSubmissionListForm';
import ManpowerSubmissionLists from '../manpowerSubmissionLists/ManpowerSubmissionLists';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function ManpowerSubmissionList() {
	const emptyValue = {
		agency: '',
		passenger: '',

		country: '',
		man_power_date: ''
	};

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [tabileShow, setTableShow] = useState(false);
	const [selectedPassenger, setSelectedPassenger] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [formKey, setFormKey] = useState(0);
	const [hideTabile, setHideTabile] = useState(false);
	const routeParams = useParams();
	// const { manpowerSubmissionListId } = routeParams;
	// console.log("manpowerSubmissionListId", routeParams);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});
	const { reset, watch, getValues, setValue } = methods;

	const handleReset = (defaultValues) => {
		reset(defaultValues);

		setFormKey((prevKey) => prevKey + 1);
	};

	const passenger = watch('passenger');
	const manPowerDate = watch('man_power_date');

	const navigate = useNavigate();

	const { data, refetch } = useGetManpowerSubmissionListsQuery({
		passenger: selectedPassenger,
		manPowerDate: selectedDate
	});
	const manpowerSubmissionListId = data && data.length > 0 ? data[0].man_power_list.id : null;

	console.log('refetch', refetch);

	function handleSearchPassengerClick() {
		setSelectedPassenger(passenger);
		setHideTabile(false);

		setTableShow(true);
	}

	const [createManpowerSubmissionList] = useCreateManpowerSubmissionListMutation();

	function handleCreateManpowerSubmissionList() {
		createManpowerSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();
					setTableShow(true);
					setHideTabile(false);

					navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/new`);
				}
			})
			.catch((error) => {
				CustomNotification('error', `${error.response.data.passenger}`);
			});
	}

	function handleCancel() {
		handleReset({
			...emptyValue
		});
		setHideTabile(true);
	}

	function handleSearchManPowerDateClick() {
		setSelectedPassenger(passenger);
		setSelectedDate(manPowerDate);
		setTableShow(true);
		setHideTabile(false);
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

						<ManpowerSubmissionLists
							data={data}
							tabileShow={tabileShow}
							manpowerSubmissionListId={manpowerSubmissionListId}
							handleReset={handleReset}
							emptyValue={emptyValue}
							hideTabile={hideTabile}
							refetch={refetch}
							selectedDate={selectedDate}
							selectedPassenger={selectedPassenger}
							passenger={passenger}
							manPowerDate={manPowerDate}
						/>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ManpowerSubmissionList;
