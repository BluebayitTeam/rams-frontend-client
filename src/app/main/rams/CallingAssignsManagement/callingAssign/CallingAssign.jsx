import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CallingAssignHeader from './CallingAssignHeader';
import CallingAssignModel from './models/CallingAssignModel';
import CallingAssignForm from './CallingAssignForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a callingAssign name')
		.min(5, 'The callingAssign name must be at least 5 characters')
});

function CallingAssign() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { callingAssignId } = routeParams;

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
		if (callingAssignId === 'new') {
			reset(CallingAssignModel({}));
		}
	}, [callingAssignId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};
	return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('CALLING_ASSIGN_CREATE') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<CallingAssignHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <CallingAssignForm callingAssignId={callingAssignId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default CallingAssign;
