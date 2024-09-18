import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import KsaVisaHeader from './KsaVisaHeader';
import KsaVisaModel from './models/KsaVisaModel';
import KsaVisaForm from './KsaVisaForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a ksaVisa name')
		.min(5, 'The ksaVisa name must be at least 5 characters')
});

function KsaVisa() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ksaVisaId } = routeParams;

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
		if (ksaVisaId === 'new') {
			reset(KsaVisaModel({}));
		}
	}, [ksaVisaId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};
	return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('KSA_VISA_FORM') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<KsaVisaHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <KsaVisaForm ksaVisaId={ksaVisaId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default KsaVisa;
