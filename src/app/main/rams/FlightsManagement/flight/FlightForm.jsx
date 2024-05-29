import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getAgents, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { FLIGHT_BY_PASSENGER_ID } from 'src/app/constant/constants';
import axios from 'axios';
import { activeRetrnCncl } from 'src/app/@data/data';

// console.log('dsadasd', activeRetrnCncl);

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

function FlightForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { flightId } = routeParams;
	const ticketAgencys = useSelector((state) => state.data.ticketAgencys);
	const flights = useSelector((state) => state.data.flights);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const current_status = sessionStorage.getItem('passengerCurrentStatus');
	const [previewFile, setPreviewFile] = useState('');

	const [fileExtName, setFileExtName] = useState('');
	const [reload, setReload] = useState(false);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgents());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setFileExtName('');
		setPreviewFile('');
	}, [getValues('ticket_agency')]);
	useEffect(() => {
		if (flightId === 'new') {
			reset({
				passenger: 'all',
				ticket_status: activeRetrnCncl.find((data) => data.default)?.id,
				ticket_agency: 'all',
				new_visa_no: '',
				bank_name: '',
				bank_account_no: '',
				// new_visa_no: '',
				registration_id: '',
				issue_date: '',
				flight_date: '',
				current_status: 'all',
				smart_card_image: '',
				delivery_date: ''
			});
		} else {
			console.log('valueForm', getValues());
			// Fetch and set data based on flightId if needed
			// reset(formData);
		}
	}, [flightId, reset, ticketAgencys, currentStatuss]);

	useEffect(() => {
		if ((flightId !== 'new', !reload)) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios.get(`${FLIGHT_BY_PASSENGER_ID}${flightId}`, authTOKEN).then((res) => {
				if (res.data.id) {
					console.log('fromData', res.data);
					reset({
						...setIdIfValueIsObject({
							...res?.data,
							passenger: parseInt(flightId, 10),

							ticket_status: activeRetrnCncl.find((data) => data.default)?.id,
							ticket_agency: res?.data?.ticket_agency?.id
						})
					});
				}

				setReload(true);
			});
		} else {
			// console.log('valueForm', getValues());
			// Fetch and set data based on flightId if needed
			// reset(formData);
		}
	}, [flightId, reset, reload]);

	return (
		<div>
			<Controller
				name="ticket_agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? ticketAgencys?.find((data) => data.id === value) : null}
						// options={ticketAgencys}
						options={[{ id: 'all', name: 'Select Ticket Agency' }, ...ticketAgencys]}
						getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Ticket Agency"
								label="Ticket Agency"
								error={!!errors.ticket_agency}
								helperText={errors?.ticket_agency?.message}
								variant="outlined"
								required
								InputLabelProps={params.value && { shrink: true }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="carrier_air_way"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.carrier_air_way}
							helperText={errors?.carrier_air_way?.message}
							label="Carrier Air Way"
							id="carrier_air_way"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="flight_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.flight_no}
							helperText={errors?.flight_no?.message}
							label="Flight No"
							id="flight_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="ticket_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.ticket_no || !field.value || getValues().ticket_no?.length != 10}
							helperText={errors?.ticket_no?.message}
							label="Ticket No"
							id="ticket_no"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="sector_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.sector_name}
							helperText={errors?.sector_name?.message}
							label="Sector Name"
							id="sector_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="ticket_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? activeRetrnCncl.find((data) => data.id === value) : null}
						options={activeRetrnCncl}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Ticket Status"
								label="Ticket Status"
								// error={!!errors.ticket_status}
								helperText={errors?.ticket_status?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="flight_time"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.flight_time}
							helperText={errors?.flight_time?.message}
							label="Flight Time"
							id="flight_time"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>
			<Controller
				name="arrival_time"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.arrival_time}
							helperText={errors?.arrival_time?.message}
							label="Arrival Time"
							id="arrival_time"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="issue_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.issue_date}
						helperText={errors?.issue_date?.message}
						label="Issue Date"
						id="issue_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="flight_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.flight_date}
						helperText={errors?.flight_date?.message}
						label="Flight Date"
						id="flight_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id == value) : null}
						options={currentStatuss}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder={current_status === 'undefined' ? 'Select Current Status' : current_status}
								label="Current Status"
								error={!!errors.current_status}
								helperText={errors?.current_status?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="notes"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.notes}
							helperText={errors?.notes?.message}
							label="Notes"
							id="notes"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			{/* <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Image
					name="smart_card_image"
					previewImage={previewImage}
					setPreviewImage={setPreviewImage}
					label="Smart Card Image"
				/>
			</div> */}
		</div>
	);
}

export default FlightForm;
