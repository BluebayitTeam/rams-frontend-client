/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import {
	Autocomplete,
	Checkbox,
	FormControlLabel,
	Icon,
	InputAdornment,
	TextField,
	Tooltip,
	tooltipClasses
} from '@mui/material';
import { getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import MultiplePassengersTable from './MultiplePassengersTable';
import { useCreateDocmentSendMutation } from '../DocmentSendsApi';
import { columns } from './data/column';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9'
	}
}));
const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function DocmentSendForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const [createDocmentSend] = useCreateDocmentSendMutation();

	const { errors } = formState;
	const routeParams = useParams();
	const { docmentSendId } = routeParams;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const docmentSends = useSelector((state) => state.data.docmentSends);
	const [selectedValueDisable, setSelectedValueDisable] = useState(false);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [showError, setShowError] = useState(false);
	const [availableVisa, setAvailableVisa] = useState(null);
	const [documentSends, setDocumentSends] = useState([]);

	function handleChheckboxSend(id) {
		dispatch(addDocumentSendColumn(documentSends.find((data) => data?.key === id)));
	}

	const handleChange = (e) => {
		const { name, checked } = e.target;
		handleChheckboxSend(name);
		const tempDocumentSend = documentSends.map((documentSend) =>
			documentSend.key === name ? { ...documentSend, isChecked: checked } : documentSend
		);
		setDocumentSends(tempDocumentSend);
	};

	console.log('mltPassengerList', mltPassengerList, mltPassengerDeletedId);

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	useEffect(() => {
		dispatch(getPassengers());
		
	}, []);
	const newColumn = [];
	useEffect(() => {
		setDocumentSends(columns);
	}, []);

	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList]);

	const handleCheckAvailableVisa = (id, qty) => {
		setShowError(true);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_PASSENGER_BY_ID}${id}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setAvailableVisa(qty - data.visa_entry_passenger_count))
			.catch((err) => {});
	};

	// function handleSaveMultipleStatusUpdate(id) {
	// 	if (mltPassengerList?.length >= availableVisa) {
	// 		Swal.fire({
	// 			position: 'top-center',
	// 			icon: 'warning',
	// 			title: `Number of Pax Full for this Calling No`,
	// 			showConfirmButton: false,
	// 			timer: 5000
	// 		});
	// 	} else {
	// 		fetch(`${GET_PASSENGER_BY_ID}/${id}/${watch('visa_entry')}`)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				if (data?.same_visa_entry) {
	// 					Swal.fire({
	// 						position: 'top-center',
	// 						icon: 'warning',
	// 						title: `This Passenger Has Already Been Assigned the same Calling Visa`,
	// 						showConfirmButton: false,
	// 						timer: 5000
	// 					});
	// 				} else if (data?.visa_entry_exist) {
	// 					Swal.fire({
	// 						title: 'Calling Visa Already Assigned for This Passenger',
	// 						text: 'Please Remove the Previous Calling Visa.',
	// 						icon: 'error',
	// 						showConfirmButton: false,
	// 						timer: 5000
	// 					});
	// 				} else {
	// 					setMltPassengerList((prevList) => [...prevList, passengers.find((data) => data?.id === id)]);
	// 				}
	// 			})
	// 			.catch(() => {});
	// 	}
	// }

	return (
		<div>
			<div>
				{documentSends.map((documentSend) => (
					<FormControlLabel
						onChange={handleChange}
						checked={documentSend?.isChecked || false}
						name={documentSend.key}
						style={{ width: '45%' }}
						control={<Checkbox />}
						label={`${documentSend.label} `}
					/>
				))}
			</div>

			<Controller
				name="passenger"
				control={control}
				render={({ field: { value, onChange } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full "
						freeSolo
						value={value ? passengers.find((data) => data.id === value) : null}
						options={passengers}
						getOptionLabel={(option) => `${option.passenger_name} - ${option.passport_no}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							handleCheckAvailableVisa(newValue?.id, newValue?.quantity);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Passenger"
								label="Passenger"
								error={!value}
								helperText={errors?.agency?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			{mltPassengerList?.length > 0 && (
				<div>
					<MultiplePassengersTable
						passengers={mltPassengerList}
						setMltPassengerList={setMltPassengerList}
					/>
				</div>
			)}

			{showError && mltPassengerList?.length >= availableVisa && (
				<h4 style={{ color: 'red' }}>Number of Pax Full for this Calling No</h4>
			)}

			<div>
				<br />
				<br />
				<br />

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16"
							type="text"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon
											className="text-20"
											color="action"
										>
											user
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							fullWidth
							InputLabelProps={field.value && { shrink: true }}
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default DocmentSendForm;
