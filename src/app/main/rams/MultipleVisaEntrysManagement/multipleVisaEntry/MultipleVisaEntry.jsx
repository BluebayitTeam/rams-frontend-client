import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MultipleVisaEntryHeader from './MultipleVisaEntryHeader';
import MultipleVisaEntryModel from './models/MultipleVisaEntryModel';
import MultipleVisaEntryForm from './MultipleVisaEntryForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	visa_entry: z
		.union([z.number(), z.null(), z.undefined()])
		.refine((val, data) => !data.is_form_save || (val !== null && val !== undefined), {
			path: ['visa_entry'],
			message: 'visa entry is required when form is to be saved'
		}),
	is_form_save: z.boolean()
});

function MultipleVisaEntry() {
	const routeParams = useParams();
	const { multipleVisaEntryId } = routeParams;
	const [save, setSave] = useState(false);

	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset } = methods;
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
    <FormProvider {...methods} key={formKey}>
      {hasPermission('MULTIPLE_VISA_ENTRY_CREATE') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={
            <MultipleVisaEntryHeader
              handleReset={handleReset}
              save={save}
              setSave={setSave}
            />
          }
          content={
            <div className='p-16 '>
              <MultipleVisaEntryForm
                save={save}
                setSave={setSave}
                multipleVisaEntryId={multipleVisaEntryId}
              />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default MultipleVisaEntry;
