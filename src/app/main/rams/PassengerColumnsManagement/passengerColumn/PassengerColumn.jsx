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
import { PASSENGER_COLUMN } from 'src/app/constant/constants';
import PassengerColumnHeader from './PassengerColumnHeader';
import PassengerColumnModel from './models/PassengerColumnModel';
import { useGetPassengerColumnQuery } from '../PassengerColumnsApi';
import PassengerColumnForm from './PassengerColumnForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a passengerColumn name')
		.min(5, 'The passengerColumn name must be at least 5 characters')
});

function PassengerColumn() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { passengerColumnId } = routeParams;

	const {
		data: passengerColumn,
		isLoading,
		isError
	} = useGetPassengerColumnQuery(passengerColumnId, {
		skip: !passengerColumnId || passengerColumnId === 'new'
	});
	console.log('passengerColumnId', passengerColumn, passengerColumnId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	const [columns, setPassengerColumns] = useState([]);
	useEffect(() => {
		reset(columns);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${PASSENGER_COLUMN}${passengerColumnId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setPassengerColumns(data || []);
				reset(data || []);
			})
			.catch(() => {});
	}, []);
	useEffect(() => {
		if (passengerColumnId === 'new') {
			reset(PassengerColumnModel({}));
		}
	}, [passengerColumnId, reset]);

	useEffect(() => {
		if (passengerColumn) {
			reset({ ...passengerColumn });
		}
	}, [passengerColumn, reset, passengerColumn?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested columns is not exists
	 */
	if (isError && passengerColumnId !== 'new') {
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
					There is no such passengerColumn!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/passengerColumn/columns"
					color="inherit"
				>
					Go to PassengerColumns Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PassengerColumnHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PassengerColumnForm columns={columns} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PassengerColumn;
