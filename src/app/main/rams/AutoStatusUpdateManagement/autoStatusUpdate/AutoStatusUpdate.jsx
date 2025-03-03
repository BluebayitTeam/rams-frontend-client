import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AutoStatusUpdateHeader from './AutoStatusUpdateHeader';

import AutoStatusUpdateForm from './AutoStatusUpdateForm';
import AutoStatusUpdateModel from './models/AutoStatusUpdateModel';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a autoStatusUpdate name')
    .min(5, 'The autoStatusUpdate name must be at least 5 characters'),
});

function AutoStatusUpdate() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { autoStatusUpdateId } = routeParams;

  const [tabValue, setTabValue] = useState(0);
  const [formKey, setFormKey] = useState(0);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (autoStatusUpdateId === 'new') {
      reset(AutoStatusUpdateModel({}));
    }
  }, [autoStatusUpdateId, reset]);
  const handleReset = () => {
    reset({});
    setFormKey((prevKey) => prevKey + 1);
  };
  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('BMET_CONTRACT_FORM') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<AutoStatusUpdateHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <AutoStatusUpdateForm autoStatusUpdateId={autoStatusUpdateId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default AutoStatusUpdate;
