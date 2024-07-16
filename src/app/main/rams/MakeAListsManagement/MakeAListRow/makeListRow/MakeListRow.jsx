import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPassengers } from 'app/store/dataSlice';
import { Tabs } from '@mui/base';
import MakeListRowHeader from './MakeListRowHeader';
import MultiplePassengersTable from './MultiplePassengersTable';

/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a makeListRow name')
		.min(5, 'The makeListRow name must be at least 5 characters')
});

const useStyles = makeStyles((theme) => ({
	container: {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		paddingTop: '.5rem',
		paddingBottom: '.7rem',
		boxSizing: 'content-box'
	},
	textField: {
		height: '4.8rem',
		'& > div': {
			height: '100%'
		}
	}
}));

function MakeListRow() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPassengers());
	}, []);

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-52 h-52',
					content: 'flex',
					contentCard: 'overflow-hidden'
				}}
				header={<MakeListRowHeader />}
				content={
					<Tabs
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64 p-0' }}
					>
						<div className="p-14">
							<div className="p-14">
								<div className="flex justify-center w-full px-16">
									<Controller
										name="passenger"
										control={control}
										render={({ field: { value, onChange } }) => (
											<Autocomplete
												className={`w-full max-w-320 h-48 `}
												freeSolo
												autoHighlight
												value={value ? passengers.find((data) => data.id === value) : null}
												options={passengers}
												getOptionLabel={(option) =>
													`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
												}
												onChange={(event, newValue) => {
													onChange(newValue?.id);
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder="Select Passenger"
														label="Passenger"
														error={!value}
														helperText={errors?.passenger?.message}
														variant="outlined"
														InputLabelProps={{ shrink: true }}
													/>
												)}
											/>
										)}
									/>
								</div>
							</div>
							<hr className={`w-full max-w-620 h-48 font-800 `} />
							<MultiplePassengersTable passengerId={watch('passenger')} />
						</div>
					</Tabs>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default MakeListRow;
