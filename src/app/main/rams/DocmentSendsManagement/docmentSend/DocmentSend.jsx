import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DocmentSendHeader from './DocmentSendHeader';
import DocmentSendModel from './models/DocmentSendModel';
import DocmentSendForm from './DocmentSendForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a docmentSend name')
		.min(5, 'The docmentSend name must be at least 5 characters')
});

function DocmentSend() {
	const routeParams = useParams();
	const { docmentSendId } = routeParams;

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
		if (docmentSendId === 'new') {
			reset(DocmentSendModel({}));
		}
	}, [docmentSendId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};
	return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('MAIL_DOCUMENT') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<DocmentSendHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <DocmentSendForm docmentSendId={docmentSendId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default DocmentSend;
