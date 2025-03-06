import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useGetAuthorizeQuery } from '../AuthorizesApi';
import AuthorizeForm from './AuthorizesForm';
import AuthorizeHeader from './AuthorizesHeader';
import AuthorizeModel from './models/AuthorizeModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a authorize name')
		.min(5, 'The authorize name must be at least 5 characters')
});

function Authorize() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { authorizeId } = routeParams;

	const {
		data: authorize,
		isLoading,
		isError
	} = useGetAuthorizeQuery(authorizeId, {
		skip: !authorizeId || authorizeId === 'new'
	});
	console.log('authorizeId', authorize, authorizeId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (authorizeId === 'new') {
			reset(AuthorizeModel({}));
		}
	}, [authorizeId, reset]);

	useEffect(() => {
		if (authorize) {
			reset({ ...authorize });
		}
	}, [authorize, reset, authorize?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested authorizes is not exists
	 */
	if (isError && authorizeId !== 'new') {
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
					There is no such authorize!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/authorize/authorizes"
					color="inherit"
				>
					Go to Authorizes Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			{/* {hasPermission('AUTHORIZE_ACCOUNT_DETAILS') && ( */}
			<FusePageCarded
				header={<AuthorizeHeader />}
				content={
					<div className='p-16 '>
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<AuthorizeForm authorizeId={authorizeId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
			{/* )} */}
		</FormProvider>
	);
}

export default Authorize;

