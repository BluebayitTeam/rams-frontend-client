import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TicketPostingHeader from './TicketPostingHeader';
import TicketPostingModel from './models/TicketPostingModel';
import TicketPostingForm from './TicketPostingForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a ticketPosting name')
		.min(5, 'The ticketPosting name must be at least 5 characters')
});

function TicketPosting() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ticketPostingId } = routeParams;

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
		if (ticketPostingId === 'new') {
			reset(TicketPostingModel({}));
		}
	}, [ticketPostingId, reset]);
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
          header={<TicketPostingHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <TicketPostingForm ticketPostingId={ticketPostingId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default TicketPosting;
