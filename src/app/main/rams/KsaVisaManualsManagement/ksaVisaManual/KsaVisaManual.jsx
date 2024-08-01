import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import KsaVisaManualHeader from './KsaVisaManualHeader';

import KsaVisaManualForm from './KsaVisaManualForm';
import KsaVisaManualModel from './models/KsaVisaManualModel';

/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a ksaVisaManual name')
		.min(5, 'The ksaVisaManual name must be at least 5 characters')
});

function KsaVisaManual() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ksaVisaManualId } = routeParams;

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
		if (ksaVisaManualId === 'new') {
			reset(KsaVisaManualModel({}));
		}
	}, [ksaVisaManualId, reset]);
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
				header={<KsaVisaManualHeader handleReset={handleReset} />}
				content={
					<div className="p-16 ">
						<KsaVisaManualForm ksaVisaManualId={ksaVisaManualId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default KsaVisaManual;
