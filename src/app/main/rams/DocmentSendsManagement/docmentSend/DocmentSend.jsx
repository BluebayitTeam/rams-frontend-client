import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DocmentSendHeader from './DocmentSendHeader';
import DocmentSendModel from './models/DocmentSendModel';
import DocmentSendForm from './DocmentSendForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a docmentSend name')
		.min(5, 'The callingAssign name must be at least 5 characters')
});

function DocmentSend() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { docmentSendId } = routeParams;

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (docmentSendId === 'new') {
			reset(DocmentSendModel({}));
		}
	}, [docmentSendId, reset]);

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<DocmentSendHeader />}
				content={
					<div className="p-16 ">
						<DocmentSendForm docmentSendId={docmentSendId} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default DocmentSend;
