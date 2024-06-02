import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MultipleVisaEntryHeader from './MultipleVisaEntryHeader';
import MultipleVisaEntryModel from './models/MultipleVisaEntryModel';
import MultipleVisaEntryForm from './MultipleVisaEntryForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a multipleVisaEntry name')
		.min(5, 'The multipleVisaEntry name must be at least 5 characters')
});

function MultipleVisaEntry() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { multipleVisaEntryId } = routeParams;

	const [tabValue, setTabValue] = useState(0);
	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (multipleVisaEntryId === 'new') {
			reset(MultipleVisaEntryModel({}));
		}
	}, [multipleVisaEntryId, reset]);
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
				header={<MultipleVisaEntryHeader handleReset={handleReset} />}
				content={
					<div className="p-16 ">
						<MultipleVisaEntryForm multipleVisaEntryId={multipleVisaEntryId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default MultipleVisaEntry;
