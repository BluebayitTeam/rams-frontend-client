import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddedSuccessfully, CustomNotification } from 'src/app/@customHooks/notificationAlert';
import BmetApplicationHeader from './BmetApplicationHeader';
import BmetApplicationModel from './models/BmetApplicationModel';
import { useCreateBmetApplicationMutation, useGetBmetApplicationsQuery } from '../BmetApplicationsApi';
import BmetApplicationForm from './BmetApplicationForm';
import BmetApplications from '../bmetApplications/BmetApplications';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function BmetApplication() {
	const emptyValue = {
		agency: '',
		passenger: '',

		country: '',
		man_power_date: ''
	};

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [tableShow, setTableShow] = useState(false);
	const [selectedPassenger, setSelectedPassenger] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [formKey, setFormKey] = useState(0);
	const [hideTabile, setHideTabile] = useState(false);
	const routeParams = useParams();

	console.log('tableShow', tableShow);
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

	const { data, refetch } = useGetBmetApplicationsQuery({
		passenger: selectedPassenger,
		manPowerDate: selectedDate
	});
	const bmetApplicationId = data && data.length > 0 ? data[0].man_power_list.id : null;

	console.log('refetch', refetch);

	function handleSearchPassengerClick() {
		setSelectedPassenger(passenger);
		setHideTabile(false);

		setTableShow(true);
	}

	const [createBmetApplication] = useCreateBmetApplicationMutation();

	function handleCreateBmetApplication() {
		createBmetApplication(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();

					setHideTabile(false);
					setTableShow(true);

					navigate(`/apps/bmetApplication/bmetApplications/new`);
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
		if (bmetApplicationId === 'new') {
			reset(BmetApplicationModel({}));
		}
	}, [bmetApplicationId, reset]);

	return (
		<FormProvider
			{...methods}
			key={formKey}
		>
			<FusePageCarded
				header={<BmetApplicationHeader />}
				content={
					<div className="p-16 ">
						<BmetApplicationForm
							bmetApplicationId={bmetApplicationId}
							handleSearchPassengerClick={handleSearchPassengerClick}
							handleSearchManPowerDateClick={handleSearchManPowerDateClick}
							handleCreateBmetApplication={handleCreateBmetApplication}
							handleCancel={handleCancel}
						/>
						<br />

						<BmetApplications
							data={data}
							tableShow={tableShow}
							bmetApplicationId={bmetApplicationId}
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

export default BmetApplication;
