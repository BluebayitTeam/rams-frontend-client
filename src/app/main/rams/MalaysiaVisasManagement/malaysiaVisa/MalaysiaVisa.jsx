import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MalaysiaVisaHeader from './MalaysiaVisaHeader';
import MalaysiaVisaModel from './models/MalaysiaVisaModel';
import MalaysiaVisaForm from './MalaysiaVisaForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a malaysiaVisa name')
		.min(5, 'The malaysiaVisa name must be at least 5 characters')
});

function MalaysiaVisa() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { malaysiaVisaId } = routeParams;

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
		if (malaysiaVisaId === 'new') {
			reset(MalaysiaVisaModel({}));
		}
	}, [malaysiaVisaId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};
	return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('MALAYSIA_VISA_FORM') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<MalaysiaVisaHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <MalaysiaVisaForm malaysiaVisaId={malaysiaVisaId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default MalaysiaVisa;
