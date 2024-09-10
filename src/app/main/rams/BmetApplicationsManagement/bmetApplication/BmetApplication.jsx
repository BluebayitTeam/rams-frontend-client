import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BmetApplicationHeader from './BmetApplicationHeader';
import BmetApplicationModel from './models/BmetApplicationModel';
import { useGetBmetApplicationsQuery } from '../BmetApplicationsApi';
import BmetApplicationForm from './BmetApplicationForm';
import BmetApplications from '../bmetApplications/BmetApplications';

const schema = z.object({});

function BmetApplication() {
	const emptyValue = {
		man_power_date: ''
	};

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [selectedDate, setSelectedDate] = useState(null);
	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;

	const handleReset = (defaultValues) => {
		reset(defaultValues);

		setFormKey((prevKey) => prevKey + 1);
	};

	const manPowerDate = watch('man_power_date');

	const { data } = useGetBmetApplicationsQuery({
		manPowerDate: selectedDate
	});
	const bmetApplicationId = data && data.length > 0 ? data[0].man_power_list.id : null;

	function handleSearchManPowerDateClick() {
		setSelectedDate(manPowerDate);
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
							handleSearchManPowerDateClick={handleSearchManPowerDateClick}
						/>
						<br />

						<BmetApplications
							data={data}
							handleReset={handleReset}
							emptyValue={emptyValue}
							selectedDate={selectedDate}
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
