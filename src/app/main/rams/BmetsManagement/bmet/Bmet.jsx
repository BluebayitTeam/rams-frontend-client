import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BmetHeader from './BmetHeader';
import BmetModel from './models/BmetModel';
import BmetForm from './BmetForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z.string().nonempty('You must enter a bmet name').min(5, 'The bmet name must be at least 5 characters')
});

function Bmet() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { bmetId } = routeParams;

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
		if (bmetId === 'new') {
			reset(BmetModel({}));
		}
	}, [bmetId, reset]);
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
				header={<BmetHeader handleReset={handleReset} />}
				content={
					<div className="p-16 ">
						<BmetForm bmetId={bmetId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Bmet;
