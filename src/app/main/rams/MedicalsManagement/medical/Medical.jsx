import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Autocomplete, Tabs, Tab, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { MEDICAL_BY_PASSENGER_ID } from 'src/app/constant/constants';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import MedicalHeader from './MedicalHeader';
import MedicalModel from './models/MedicalModel';
import { useGetMedicalQuery } from '../MedicalsApi';
import MedicalForm from './MedicalForm';

const useStyles = makeStyles((theme) => ({
	container: {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		paddingTop: '0.8rem',
		paddingBottom: '0.7rem',
		boxSizing: 'content-box'
	},
	textField: {
		height: '4.8rem',
		'& > div': {
			height: '100%'
		}
	}
}));

const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a medical name')
		.min(5, 'The medical name must be at least 5 characters')
});

function Medical() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { medicalId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);
	const classes = useStyles();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const {
		data: medical,
		isLoading,
		isError
	} = useGetMedicalQuery(medicalId, {
		skip: !medicalId || medicalId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);
	console.log('fromSearch', fromSearch, medicalId);

	const {
		reset,
		watch,
		control,
		formState: { errors },
		setValue
	} = methods;

	useEffect(() => {
		if (medicalId === 'new') {
			reset(MedicalModel({}));
		}
	}, [medicalId, reset]);

	useEffect(() => {
		if (medical) {
			reset({ ...medical });
		}
	}, [medical, reset]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};

			axios
				.get(`${MEDICAL_BY_PASSENGER_ID}${medicalId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						// reset({ ...setIdIfValueIsObject(res.data), passenger: medicalId });
					} else {
						reset({
							passenger: medicalId,
							medical_card: doneNotDone.find((data) => data.default)?.id,
							medical_result: medicalResults.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: medicalId,
						medical_card: doneNotDone.find((data) => data.default)?.id,
						medical_result: medicalResults.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			reset({
				medical_card: doneNotDone.find((data) => data.default)?.id,
				medical_result: medicalResults.find((data) => data.default)?.id
			});
		}
	}, [fromSearch, medicalId, reset]);

	/**
	 * Show Message if the requested medical does not exist
	 */
	if (isError && medicalId !== 'new') {
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
					There is no such medical!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/medical/medical"
					color="inherit"
				>
					Go to Medicals Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab label="Passenger Details" />
						<Tab label="Medical Information" />
					</Tabs>
				}
				header={<MedicalHeader />}
				content={
					<div className="p-16">
						{tabValue === 0 && (
							<div className="p-16">
								<div className="flex justify-center w-full px-16">
									<Controller
										name="passenger"
										control={control}
										render={({ field: { value } }) => (
											<Autocomplete
												className={`w-full max-w-320 h-48 ${classes.container}`}
												freeSolo
												autoHighlight
												// disabled={!!fromSearch}
												value={value ? passengers.find((data) => data.id === value) : null}
												options={passengers}
												getOptionLabel={(option) =>
													`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
												}
												onChange={(event, newValue) =>
													setValue('passenger', newValue?.id || '')
												}
												renderInput={(params) => (
													<TextField
														{...params}
														className={classes.textField}
														placeholder="Select Passenger"
														label="Passenger"
														required
														helperText={errors?.passenger?.message}
														variant="outlined"
														autoFocus
														InputLabelProps={
															value ? { shrink: true } : { style: { color: 'red' } }
														}
													/>
												)}
											/>
										)}
									/>
								</div>
								<MedicalForm />
							</div>
						)}
						{tabValue === 1 && <MedicalForm medicalId={medicalId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Medical;
