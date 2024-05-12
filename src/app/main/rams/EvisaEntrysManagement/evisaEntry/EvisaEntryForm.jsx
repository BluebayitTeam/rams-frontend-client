/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import {
	Autocomplete,
	Checkbox,
	FormControlLabel,
	Icon,
	TextField,
	Tooltip,
	Typography,
	tooltipClasses
} from '@mui/material';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl } from '@mui/base';
import { activeCncl } from 'src/app/@data/data';
import { PictureAsPdf } from '@mui/icons-material';
import { BASE_URL } from 'src/app/constant/constants';
import clsx from 'clsx';
import MultiplePassengersTable from './MultiplePassengersTable';

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

function EvisaEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { evisaEntryId } = routeParams;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const file = watch('file') || '';
	const [selectedValueDisable, setSelectedValueDisable] = useState(false);
	const [previewFile, setPreviewFile] = useState('');
	const [fileExtName, setFileExtName] = useState('');
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);

	console.log('mltPassengerList', mltPassengerList, mltPassengerDeletedId);

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	useEffect(() => {
		setFileExtName('');
		setPreviewFile('');
	}, [watch('demand')]);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCurrentStatuss());
	}, []);

	return (
		<div>
			{evisaEntryId === 'new' && (
				<Controller
					name="is_multi_entry"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								//
								label="Multi Entry"
								control={
									<Checkbox
										{...field}
										checked={field.value ? field.value : false}
									/>
								}
							/>
						</FormControl>
					)}
				/>
			)}

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
							setSelectedValueDisable(true);

							// Update mltPassengerList state with the selected passenger
							if (newValue && evisaEntryId === 'new' && watch('is_multi_entry')) {
								setMltPassengerList((prevList) => [
									...prevList,
									passengers.find((data) => data?.id === newValue?.id)
								]);
							}
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

			{evisaEntryId === 'new' && watch('is_multi_entry') && (
				<div>
					<MultiplePassengersTable
						passengers={mltPassengerList}
						setMltPassengerList={setMltPassengerList}
					/>
				</div>
			)}

			<Controller
				name="visa_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.visa_number?.message}
							label="Visa No"
							id="visa_number"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="issue_date"
				control={control}
				render={({ field }) => {
					return (
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
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="exp_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.exp_date}
							helperText={errors?.exp_date?.message}
							label="Exp Date"
							id="exp_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? activeCncl.find((data) => data.id === value) : null}
						options={activeCncl}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Status"
								label="Status"
								id="status"
								helperText={errors?.status?.message}
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
				name="current_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id === value) : null}
						options={currentStatuss}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Current Status"
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
				name="file"
				control={control}
				render={({ field: { onChange, value } }) => (
					<div className="flex w-full flex-row items-center justify-evenly">
						<div className="flex-col">
							<Typography className="text-center">File</Typography>
							<label
								htmlFor={`${name}-button-file`}
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<input
									accept="image/x-png,image/gif,image/jpeg,application/pdf"
									className="hidden"
									id={`${name}-button-file`}
									type="file"
									onChange={async (e) => {
										const reader = new FileReader();
										reader.onload = () => {
											if (reader.readyState === 2) {
												setPreviewFile(reader.result);
											}
										};
										reader.readAsDataURL(e.target.files[0]);

										const file = e.target.files[0];

										setFileExtName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

										onChange(file);
									}}
								/>
								<Icon
									fontSize="large"
									color="action"
								>
									cloud_upload
								</Icon>
							</label>
						</div>
						{!previewFile && file && (
							<div
								style={{
									width: 'auto',
									height: '150px',
									overflow: 'hidden',
									display: 'flex'
								}}
							>
								{(file?.name || file)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
									<PictureAsPdf
										style={{
											color: 'red',
											cursor: 'pointer',
											display: 'block',
											fontSize: '35px',
											margin: 'auto'
										}}
										onClick={() => window.open(`${BASE_URL}${file}`)}
									/>
								) : (
									<img
										src={`${BASE_URL}${file}`}
										style={{ height: '150px' }}
									/>
								)}
							</div>
						)}

						{previewFile && (
							<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
								{fileExtName === 'pdf' ? (
									<iframe
										src={previewFile}
										frameBorder="0"
										scrolling="auto"
										height="150px"
										width="150px"
									/>
								) : (
									<img
										src={previewFile}
										style={{ height: '150px' }}
									/>
								)}
							</div>
						)}
					</div>
				)}
			/>
		</div>
	);
}

export default EvisaEntryForm;
