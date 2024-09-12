/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getAgencys, getCountries, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { makeStyles } from '@mui/styles';
import { Search } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from 'src/app/constant/constants';
import { MANPOWER_SUBMISSION_LIST_FOOTER } from 'src/app/constant/FormContentTitle/formContentTitle';
import { useCreateVisaSubmissionListMutation } from '../VisaSubmissionListsApi';
import { AddedSuccessfully, CustomNotification } from 'src/app/@customHooks/notificationAlert';

const useStyles = makeStyles(theme => ({
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
	
	handleCancel
}) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { watch,getValues,setValue } = methods;

	const { agencies, passengers } = useSelector((state) => state.data);
	const [cancelList, setCancelList] = useState(false);
	const [newList, setNewList] = useState(true);
	
	const [createVisaSubmissionList] = useCreateVisaSubmissionListMutation();
	
	const handlecancelList = event => {
		setCancelList(event.target.checked);
		dispatch(getVisaSubmissionList({ submission_date: watch('submission_date') }));

		sessionStorage.setItem('CancelVisaList', event.target.checked);
	};
	const handlenewList = event => {
		setNewList(event.target.checked);
		dispatch(getVisaSubmissionList({ submission_date: watch('submission_date') }));

		sessionStorage.setItem('NewVisaList', event.target.checked);
	};


	const classes = useStyles({ isPassenger: watch('passenger') });

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
	}, []);

	
function handleCreateVisaSubmissionList() {
		createVisaSubmissionList(getValues())
			.unwrap()
			.then((data) => {
				if (data) {
					AddedSuccessfully();
                    navigate(`/apps/visaSubmissionList/visaSubmissionLists/new`);
				}
			})
			.catch((error) => {
				CustomNotification('error', `${error.response.data.passenger}`);
			});
	}

	
	function handleSaveCancelVisaSubmissionList() {
		dispatch(
			saveVisaSubmissionList({
				submission_date: getValues().submission_date,
				agency: getValues().agency,
				passenger: getValues().cancelpassenger,
				list_type: 'cancel'
			})
		).then(res => {
			if (res?.payload?.data?.id) {
				dispatch(getVisaSubmissionList({ submission_date: getValues().submission_date }));

				dispatch(getVisaSubmissionList({ submission_date: getValues().submission_date })).then(res => {
					if (res.payload?.data?.id) {
						console.log(`clicked`);
					} else if (res.payload?.data?.detail) {
						setError('passenger', { type: 'manual', message: res.payload.data.detail });
					}
				});
			} else {
				setError('cancelpassenger', {
					type: 'manual',
					message: `This Passenger has already assigned`
				});
			}
		});
	}


	return (
	    <div>
			<div>
				<Checkbox
					cancelList={cancelList}
					onChange={handlecancelList}
					inputProps={{ 'aria-label': 'controlled' }}
				/>{' '}
				Cancel List
				<Checkbox
					defaultChecked
					newList={newList}
					onChange={handlenewList}
					inputProps={{ 'aria-label': 'controlled' }}
				/>{' '}
				New List
			</div>
			
				 <CustomDropdownField
				name="agency"
				label="Agency"
				options={agencies}
          optionLabelFormat={(option) => `${option?.name}`}
           onChange={(newValue) =>
				  setValue('agency_info', newValue)
				}
			/>
			
			<CustomDropdownField
				name="agency"
				label="Agency"
				options={agencies}
				style={{ display: 'none' }}
                optionLabelFormat={(option) => `${option?.name}`}
                onChange={(newValue) =>
				  setValue('agency_info', newValue)
				}
			/>
			
			<div className="flex flex-nowrap">
				      <CustomDatePicker
						name="submission_date"
						label="Submission Date"
						required
						placeholder="DD-MM-YYYY"
					/>
				<div
					className={classes.searchContainer}
					onClick={() => {
						handleSearchManPowerDateClick();
					}}
				>
					<Search />
				</div>
			</div>
			<p className="text-base text-red-900" style={{ display: newList ? 'block' : 'none' }}>
				New List
			</p>
			<div style={{ display: newList ? 'block' : 'none' }}>
				<div className="flex flex-nowrap">
					<div className='w-full'>
					<CustomDropdownField
						name="passenger"
						label="Passenger"
						options={passengers}
						className="mt-8 mb-16 "
						optionLabelFormat={(option) =>
							`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
						}
					/> 	
                </div>
					

					<div
						className={classes.searchContainer}
						onClick={() => {
						handleSearchManPowerDateClick();
					}}
					>
						<Search />
					</div>
				</div>
			</div>
			<Button
				className="whitespace-nowrap mx-4"
				style={{ display: newList ? 'block' : 'none' }}
				variant="contained"
				color="secondary"
				onClick={()=>handleCreateVisaSubmissionList()}
			>
				Save
			</Button>
			<p className="text-base text-red-900" style={{ display: cancelList ? 'block' : 'none' }}>
				Cancel List
			</p>
			<div style={{ display: cancelList ? 'block' : 'none' }}>
				<div className="flex flex-nowrap">
					
					<div className='w-full'>
					<CustomDropdownField
						name="cancelpassenger"
						label="cancelpassenger"
						options={passengers}
						className="mt-8 mb-16 "
						optionLabelFormat={(option) =>
							`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
						}
						/>
						</div>
					<div
						className={classes.searchContainer}
						onClick={() =>
							watch('passenger') && dispatch(getVisaSubmissionList({ passenger: watch('passenger') }))
						}
					>
						<Search />
					</div>
				</div>
			</div>
			<Button
				style={{ display: cancelList ? 'block' : 'none' }}
				className="whitespace-nowrap mx-4"
				variant="contained"
				color="secondary"
				onClick={handleSaveCancelVisaSubmissionList}
			>
				Save
			</Button>
		</div>
	);
}

export default VisaSubmissionListForm;
