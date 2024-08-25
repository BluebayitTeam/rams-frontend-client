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
import GdsHeader from './GdsHeader';
import GdsModel from './models/GdsModel';
import { useGetGdsQuery } from '../GdssApi';
import GdsForm from './GdsForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z.string().nonempty('You must enter a gds name').min(5, 'The gds name must be at least 5 characters')
});

function Gds() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { gdsId } = routeParams;

	const {
		data: gds,
		isLoading,
		isError
	} = useGetGdsQuery(gdsId, {
		skip: !gdsId || gdsId === 'new'
	});
	console.log('gdsId', gds, gdsId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (gdsId === 'new') {
			reset(GdsModel({}));
		}
	}, [gdsId, reset]);

	useEffect(() => {
		if (gds) {
			reset({ ...gds });
		}
	}, [gds, reset, gds?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested gdss is not exists
	 */
	if (isError && gdsId !== 'new') {
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
					There is no such gds!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/gds/gdss"
					color="inherit"
				>
					Go to Gdss Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<GdsHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<GdsForm gdsId={gdsId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Gds;
