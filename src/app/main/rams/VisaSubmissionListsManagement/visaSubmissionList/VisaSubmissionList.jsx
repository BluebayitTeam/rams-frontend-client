import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddedSuccessfully, CustomNotification } from 'src/app/@customHooks/notificationAlert';
import VisaSubmissionListHeader from './VisaSubmissionListHeader';
import VisaSubmissionListModel from './models/VisaSubmissionListModel';
import {
	useCreateVisaSubmissionListMutation,
	useGetVisaSubmissionListsQuery
} from '../VisaSubmissionListsApi';
import VisaSubmissionListForm from './VisaSubmissionListForm';
import VisaSubmissionLists from '../visaSubmissionLists/VisaSubmissionLists';

const schema = z.object({});

function VisaSubmissionList() {
	const emptyValue = {
		agency: '',
		passenger: '',
		submission_date: ''
	};

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [tableShow, setTableShow] = useState(false);
	const [selectedPassenger, setSelectedPassenger] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [formKey, setFormKey] = useState(0);
	const [hideTabile, setHideTabile] = useState(false);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});
	const { reset, watch, getValues } = methods;

	const handleReset = (defaultValues) => {
		reset(defaultValues);

		setFormKey((prevKey) => prevKey + 1);
	};

	const passenger = watch('passenger');
	const submissionDate = watch('submission_date');

	const navigate = useNavigate(); 

	const { data, refetch } = useGetVisaSubmissionListsQuery({
		passenger: selectedPassenger,
		submissionDate: selectedDate
	});
	console.log('ljvclvjcxlvjjcv', data)
	
	const visaSubmissionListId = data && data.length > 0 ? data[0].man_power_list.id : null;

	function handleSearchPassengerClick() {
		setSelectedPassenger(passenger);
		setHideTabile(false);

		setTableShow(true);
	}

	const [createVisaSubmissionList] = useCreateVisaSubmissionListMutation();

	function handleCreateVisaSubmissionList() {
		console.log('check')
		createVisaSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();

					setHideTabile(false);
					setTableShow(true);

					navigate(`/apps/visaSubmissionList/visaSubmissionLists/new`);
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
		setSelectedDate(submissionDate);
		setTableShow(true);
		setHideTabile(false);
	}

	useEffect(() => {
		if (visaSubmissionListId === 'new') {
			reset(VisaSubmissionListModel({}));
		}
	}, [visaSubmissionListId, reset]);

	return (
		<FormProvider
			{...methods}
			key={formKey}
		>
			<FusePageCarded
				header={<VisaSubmissionListHeader />}
				content={
					<div className="p-16 ">
						<VisaSubmissionListForm
							visaSubmissionListId={visaSubmissionListId}
							handleSearchPassengerClick={handleSearchPassengerClick}
							handleSearchManPowerDateClick={handleSearchManPowerDateClick}
							handleCreateVisaSubmissionList={handleCreateVisaSubmissionList}
							handleCancel={handleCancel}
						/>
						<br />

						<VisaSubmissionLists
							data={data}
							tableShow={tableShow}
							visaSubmissionListId={visaSubmissionListId}
							handleReset={handleReset}
							emptyValue={emptyValue}
							hideTabile={hideTabile}
							refetch={refetch}
							selectedDate={selectedDate}
							selectedPassenger={selectedPassenger}
							passenger={passenger}
							submissionDate={submissionDate}
						/>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default VisaSubmissionList;
