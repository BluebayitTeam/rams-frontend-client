/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getAgencys, getCountries, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { makeStyles } from '@mui/styles';
import { Search } from '@mui/icons-material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
	searchContainer: ({ isPassenger }) => ({
		color: theme.palette.primary.main,
		background: 'transparent',
		borderColor: theme.palette.primary.main,
		cursor: isPassenger && 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid',
		height: '52px',
		width: '52px',
		marginTop: '8px',
		borderRadius: '5px',
		'&:hover': {
			color: isPassenger ? theme.palette.primary.dark : theme.palette.primary.main,
			background: isPassenger ? theme.palette.primary.light : 'transparent',
			borderColor: isPassenger ? theme.palette.primary.dark : theme.palette.primary.main
		},
		'&:active': {
			color: isPassenger ? theme.palette.primary.light : theme.palette.primary.main,
			background: isPassenger ? theme.palette.primary.dark : 'transparent',
			borderColor: isPassenger ? theme.palette.primary.light : theme.palette.primary.main
		}
	})
}));

function ManpowerSubmissionListForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;
	const { agencies, countries, passengers } = useSelector((state) => state.data);

	const classes = useStyles({ isPassenger: watch('passenger') });
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
	}, []);

	function handleSaveManpowerSubmissionList() {
		dispatch(saveManpowerSubmissionList(getValues())).then((res) => {
			if (res.payload?.data?.id) {
				if (res.payload?.data?.id) {
					localStorage.setItem('manpowerSubmissionListAlert', 'saveManpowerSubmissionList');
					// history.push('/apps/manpowerSubmissionList-management/manpowerSubmissionList/new');
					// dispatch(setAlert(saveAlertMsg));
					dispatch(getManpowerSubmissionList({ man_power_date: getValues().man_power_date }));
				}
			} else {
				setError('passenger', {
					type: 'manual',
					message: `This Passenger has already assigned`
				});
			}
		});
	}

	function handleCancel() {
		// history.push('/apps/manpowerSubmissionList-management/manpowerSubmissionList/new');
		reset({});
	}

	return (
		<div>
			<CustomDropdownField
				name="agency"
				label="Agency"
				options={agencies}
				optionLabelFormat={(option) => `${option?.name}`}
				// onChange={(newValue) => setValue('agency_info', newValue)}
			/>
			<CustomDropdownField
				name="country"
				label="Country"
				options={countries}
				optionLabelFormat={(option) => `${option?.name}`}
			/>

			<div className="flex flex-nowrap">
				<div className="w-full">
					<CustomDropdownField
						name="passenger"
						label="Passenger"
						options={passengers}
						optionLabelFormat={(option) =>
							`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
						}
					/>
				</div>
				<div
					className={classes.searchContainer}
					onClick={() =>
						watch('passenger') &&
						dispatch(useGetManpowerSubmissionListQuery({ passenger: watch('passenger') }))
					}
				>
					<Search />
				</div>
			</div>

			<div className="flex flex-nowrap">
				<div className="w-full">
					<Controller
						name="man_power_date"
						className="mt-8 mb-16 w-full"
						control={control}
						render={({ field }) => {
							return (
								<CustomDatePicker
									field={field}
									label="Man Power Submission  Date"
								/>
							);
						}}
					/>
				</div>
				<div
					className={classes.searchContainer}
					onClick={() =>
						watch('man_power_date') &&
						dispatch(getManpowerSubmissionList({ man_power_date: watch('man_power_date') }))
					}
				>
					<Search />
				</div>
			</div>

			<Button
				className="whitespace-nowrap mx-4"
				variant="contained"
				color="secondary"
				// disabled={_.isEmpty(dirtyFields) || !isValid}
				onClick={handleSaveManpowerSubmissionList}
			>
				Save
			</Button>

			<Button
				className="whitespace-nowrap mx-4"
				variant="contained"
				style={{ backgroundColor: '#FFAA4C', color: 'white' }}
				onClick={handleCancel}
			>
				Cancel
			</Button>
		</div>
	);
}

export default ManpowerSubmissionListForm;
