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
import PassengerHeader from './PassengerHeader';
import PassengerModel from './models/PassengerModel';
import { useGetPassengerQuery } from '../PassengersApi';
import PassengerForm from './PassengerForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a passenger name')
		.min(5, 'The passenger name must be at least 5 characters')
});

function Passenger() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { menuId } = routeParams;

	const {
		data: passenger,
		isLoading,
		isError
	} = useGetPassengerQuery(menuId, {
		skip: !menuId || menuId === 'new'
	});
	console.log('menuId', passenger, menuId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (menuId === 'new') {
			reset(PassengerModel({}));
		}
	}, [menuId, reset]);

	useEffect(() => {
		if (passenger) {
			reset({ ...passenger });
		}
	}, [passenger, reset, passenger?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested passengers is not exists
	 */
	if (isError && menuId !== 'new') {
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
					There is no such passenger!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/passenger/passengers"
					color="inherit"
				>
					Go to Passengers Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PassengerHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PassengerForm menuId={menuId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Passenger;
