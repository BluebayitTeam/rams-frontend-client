import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ListOfManpowerRefHeader from './ListOfManpowerRefHeader';
import ListOfManpowerRefModel from './models/ListOfManpowerRefModel';
import ListOfManpowerRefForm from './ListOfManpowerRefForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	man_power_date: z
		.string()
		.nonempty('You must enter a listOfManpowerRef name')
		.min(5, 'The listOfManpowerRef name must be at least 5 characters')
});

function ListOfManpowerRef() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { listOfManpowerRefId } = routeParams;

	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset } = methods;
	useEffect(() => {
		if (listOfManpowerRefId === 'new') {
			reset(ListOfManpowerRefModel({}));
		}
	}, [listOfManpowerRefId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};

	return (
		<FormProvider
			{...methods}
			key={formKey}
		>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<ListOfManpowerRefHeader handleReset={handleReset} />}
				content={
					<div className="p-16 ">
						<ListOfManpowerRefForm listOfManpowerRefId={listOfManpowerRefId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default ListOfManpowerRef;
