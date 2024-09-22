import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TodotasktypeHeader from './TodotasktypeHeader';
import TodotasktypeModel from './models/TodotasktypeModel';
import { useGetTodotasktypeQuery } from '../TodotasktypesApi';
import TodotasktypeForm from './TodotasktypeForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a todotasktype name')
		.min(5, 'The todotasktype name must be at least 5 characters')
});

function Todotasktype() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { todotasktypeId } = routeParams;

	const {
		data: todotasktype,
		isLoading,
		isError
	} = useGetTodotasktypeQuery(todotasktypeId, {
		skip: !todotasktypeId || todotasktypeId === 'new'
	});
	console.log('todotasktypeId', todotasktype, todotasktypeId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (todotasktypeId === 'new') {
			reset(TodotasktypeModel({}));
		}
	}, [todotasktypeId, reset]);

	useEffect(() => {
		if (todotasktype) {
			reset({ ...todotasktype });
		}
	}, [todotasktype, reset, todotasktype?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested todotasktypes is not exists
	 */
	if (isError && todotasktypeId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such todotasktype!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/todotasktype/todotasktypes"
					color="inherit"
				>
					Go to Todotasktypes Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('TODO_TASK_TYPE_DETAILS') && (
        <FusePageCarded
          header={<TodotasktypeHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <TodotasktypeForm todotasktypeId={todotasktypeId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Todotasktype;
