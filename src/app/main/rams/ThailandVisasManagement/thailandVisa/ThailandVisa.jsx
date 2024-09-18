import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ThailandVisaHeader from './ThailandVisaHeader';
import ThailandVisaModel from './models/ThailandVisaModel';
import ThailandVisaForm from './ThailandVisaForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a thailandVisa name')
		.min(5, 'The thailandVisa name must be at least 5 characters')
});

function ThailandVisa() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { thailandVisaId } = routeParams;

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
		if (thailandVisaId === 'new') {
			reset(ThailandVisaModel({}));
		}
	}, [thailandVisaId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};
	return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('THAILAND_VISA_FORM') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<ThailandVisaHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <ThailandVisaForm thailandVisaId={thailandVisaId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default ThailandVisa;
