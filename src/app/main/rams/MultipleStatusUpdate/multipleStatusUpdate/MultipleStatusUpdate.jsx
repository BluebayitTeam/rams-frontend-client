import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import MultipleStatusUpdateHeader from './MultipleStatusUpdateHeader';
import MultipleStatusUpdateModel from './models/MultipleStatusUpdateModel';
import MultipleStatusUpdateForm from './MultipleStatusUpdateForm';
/**
 * Form Validation Schema
 */
// const schema = z.object({
// 	passenger: z
// 		.string()
// 		.nonempty('You must enter a multipleStatusUpdate name')
// 		.min(5, 'The multipleStatusUpdate name must be at least 5 characters')
// });

function MultipleStatusUpdate() {
	const routeParams = useParams();
	const { multipleStatusUpdateId } = routeParams;

	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {}
		// resolver: zodResolver(schema)
	});
	const { reset } = methods;
	useEffect(() => {
		if (multipleStatusUpdateId === 'new') {
			reset(MultipleStatusUpdateModel({}));
		}
	}, [multipleStatusUpdateId, reset]);
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
				header={<MultipleStatusUpdateHeader handleReset={handleReset} />}
				content={
					<div className="p-16 ">
						<MultipleStatusUpdateForm multipleStatusUpdateId={multipleStatusUpdateId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default MultipleStatusUpdate;
