/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getAgencys, getCountries, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { makeStyles } from '@mui/styles';
import { Search } from '@mui/icons-material';
import { Button } from '@mui/material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { AddedSuccessfully, CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { useCreateManpowerSubmissionListMutation } from '../ManpowerSubmissionListsApi';

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
	const { formState, watch, getValues } = methods;
	console.log('getValues', getValues());
	const { errors } = formState;
	const { agencies, countries, passengers } = useSelector((state) => state.data);
	const [createManpowerSubmissionList] = useCreateManpowerSubmissionListMutation();

	const classes = useStyles({ isPassenger: watch('passenger') });
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
	}, []);

	function handleCreateManpowerSubmissionList() {
		createManpowerSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();
				}

				navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/new`);
			})
			.catch((error) => {
				if (error && error.response && error.response.data) {
					console.log('AxiosError:', error.response.data.passenger);
					CustomNotification('error', `${error.response.data.passenger}`);
				} else {
					console.log('An unexpected error occurred:', error);
				}
			});
	}

	function handleCancel() {
		navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/new`);
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
					<CustomDatePicker
						name="man_power_date"
						label="Manpower Date"
						required
						placeholder="DD-MM-YYYY"
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
				onClick={handleCreateManpowerSubmissionList}
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
