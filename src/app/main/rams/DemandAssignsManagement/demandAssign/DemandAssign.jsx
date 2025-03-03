import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DemandAssignHeader from './DemandAssignHeader';
import DemandAssignModel from './models/DemandAssignModel';
import DemandAssignForm from './DemandAssignForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  demand: z
    .number()
    .min(5, 'Demand must be at least 5') // `.min(5)` ensures the number is at least 5
    .refine((val) => val !== null && val !== undefined, {
      message: 'You must enter a demand',
    }),
  current_status: z
    .number()
    .min(5, 'Demand must be at least 5') // `.min(5)` ensures the number is at least 5
    .refine((val) => val !== null && val !== undefined, {
      message: 'You must enter a demand',
    }),
  passenger: z
    .number()
    .min(5, 'Demand must be at least 5') // `.min(5)` ensures the number is at least 5
    .refine((val) => val !== null && val !== undefined, {
      message: 'You must enter a demand',
    }),
});

function DemandAssign() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { demandAssignId } = routeParams;

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
    if (demandAssignId === 'new') {
      reset(DemandAssignModel({}));
    }
  }, [demandAssignId, reset]);
  const handleReset = () => {
    reset({});
    setFormKey((prevKey) => prevKey + 1);
  };
  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('DEMAND_ASSIGN_CREATE') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<DemandAssignHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <DemandAssignForm demandAssignId={demandAssignId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default DemandAssign;
