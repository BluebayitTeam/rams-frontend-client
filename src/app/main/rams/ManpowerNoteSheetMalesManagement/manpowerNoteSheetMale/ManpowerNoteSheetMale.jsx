import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ManpowerNoteSheetMaleHeader from './ManpowerNoteSheetMaleHeader';
import ManpowerNoteSheetMaleModel from './models/ManpowerNoteSheetMaleModel';
import ManpowerNoteSheetMaleForm from './ManpowerNoteSheetMaleForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	man_power_date: z
		.string()
		.nonempty('You must enter a manpowerNoteSheetMale name')
		.min(5, 'The manpowerNoteSheetMale name must be at least 5 characters')
});

function ManpowerNoteSheetMale() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { manpowerNoteSheetMaleId } = routeParams;

	const [formKey, setFormKey] = useState(0);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset } = methods;
	useEffect(() => {
		if (manpowerNoteSheetMaleId === 'new') {
			reset(ManpowerNoteSheetMaleModel({}));
		}
	}, [manpowerNoteSheetMaleId, reset]);
	const handleReset = () => {
		reset({});
		setFormKey((prevKey) => prevKey + 1);
	};

	return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('MANPOWER_LIST_NOTESHEET_DATA') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          header={<ManpowerNoteSheetMaleHeader handleReset={handleReset} />}
          content={
            <div className='p-16 '>
              <ManpowerNoteSheetMaleForm
                manpowerNoteSheetMaleId={manpowerNoteSheetMaleId}
              />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default ManpowerNoteSheetMale;
