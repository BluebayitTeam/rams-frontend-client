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

import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from 'src/app/constant/constants';
import { MANPOWER_SUBMISSION_LIST_FOOTER } from 'src/app/constant/FormContentTitle/formContentTitle';

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

function VisaSubmissionListForm({
	handleSearchPassengerClick,
	handleSearchManPowerDateClick,
	handleCreateVisaSubmissionList,
	handleCancel
}) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { watch } = methods;

	const { agencies, countries, passengers } = useSelector((state) => state.data);

	const classes = useStyles({ isPassenger: watch('passenger') });

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${MANPOWER_SUBMISSION_LIST_FOOTER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentFooterData', data?.formcontent_detail[0]?.details || '')
			);
	}, []);

	return (
		<div>
			<CustomDropdownField
				name="agency"
				label="Agency"
				options={agencies}
				optionLabelFormat={(option) => `${option?.name}`}
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
					onClick={() => {
						handleSearchPassengerClick();
					}}
				>
					<Search className="cursor-pointer" />
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
					onClick={() => {
						handleSearchManPowerDateClick();
					}}
				>
					<Search className="cursor-pointer" />
				</div>
			</div>

			<Button
				className="whitespace-nowrap mx-4"
				variant="contained"
				color="secondary"
				onClick={() => {
					handleCreateVisaSubmissionList();
				}}
			>
				Save
			</Button>

			<Button
				className="whitespace-nowrap mx-4"
				variant="contained"
				style={{ backgroundColor: '#FFAA4C', color: 'white' }}
				onClick={() => handleCancel()}
			>
				Cancel
			</Button>
		</div>
	);
}

export default VisaSubmissionListForm;
