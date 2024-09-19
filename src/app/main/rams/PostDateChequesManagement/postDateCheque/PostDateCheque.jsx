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
import PostDateChequeHeader from './PostDateChequeHeader';
import PostDateChequeModel from './models/PostDateChequeModel';
import { useGetPostDateChequeQuery } from '../PostDateChequesApi';
import PostDateChequeForm from './PostDateChequeForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a postDateCheque name')
		.min(5, 'The postDateCheque name must be at least 5 characters')
});

function PostDateCheque() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { postDateChequeId } = routeParams;

	const {
		data: postDateCheque,
		isLoading,
		isError
	} = useGetPostDateChequeQuery(postDateChequeId, {
		skip: !postDateChequeId || postDateChequeId === 'new'
	});
	console.log('postDateChequeId', postDateCheque, postDateChequeId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (postDateChequeId === 'new') {
			reset(PostDateChequeModel({}));
		}
	}, [postDateChequeId, reset]);

	useEffect(() => {
		if (postDateCheque) {
			reset({ ...postDateCheque });
		}
	}, [postDateCheque, reset, postDateCheque?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested postDateCheques is not exists
	 */
	if (isError && postDateChequeId !== 'new') {
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
					There is no such postDateCheque!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/postDateCheque/postDateCheques"
					color="inherit"
				>
					Go to PostDateCheques Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('POST_DATE_CHEQUE_DETAILS') && (
        <FusePageCarded
          header={<PostDateChequeHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <PostDateChequeForm postDateChequeId={postDateChequeId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default PostDateCheque;
