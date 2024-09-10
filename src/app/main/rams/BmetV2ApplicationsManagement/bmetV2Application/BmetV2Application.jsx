import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BmetV2ApplicationHeader from './BmetV2ApplicationHeader';
import BmetV2ApplicationModel from './models/BmetV2ApplicationModel';
import { useGetBmetV2ApplicationsQuery } from '../BmetV2ApplicationsApi';
import BmetV2ApplicationForm from './BmetV2ApplicationForm';
import BmetV2Applications from '../bmetV2Applications/BmetV2Applications';

const schema = z.object({});

function BmetV2Application() {
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

	const bmetV2ApplicationDate = watch('man_power_date');

	const { data } = useGetBmetV2ApplicationsQuery({
		bmetV2ApplicationDate: selectedDate
	});
	const bmetV2ApplicationId = data && data.length > 0 ? data[0].man_power_list.id : null;

	function handleSearchManPowerDateClick() {
		setSelectedDate(bmetV2ApplicationDate);
	}

	useEffect(() => {
		if (bmetV2ApplicationId === 'new') {
			reset(BmetV2ApplicationModel({}));
		}
	}, [bmetV2ApplicationId, reset]);

	return (
		<FormProvider
			{...methods}
			key={formKey}
		>
			<FusePageCarded
				header={<BmetV2ApplicationHeader />}
				content={
					<div className="p-16 ">
						<BmetV2ApplicationForm
							bmetV2ApplicationId={bmetV2ApplicationId}
							handleSearchManPowerDateClick={handleSearchManPowerDateClick}
						/>
						<br />

						<BmetV2Applications
							data={data}
							handleReset={handleReset}
							emptyValue={emptyValue}
							selectedDate={selectedDate}
							bmetV2ApplicationDate={bmetV2ApplicationDate}
						/>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default BmetV2Application;
