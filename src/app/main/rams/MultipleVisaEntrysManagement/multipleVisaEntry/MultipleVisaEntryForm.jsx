import { useEffect, useState } from 'react';
import {
	Autocomplete,
	Checkbox,
	FormControlLabel,
	FormLabel,
	Pagination,
	Radio,
	RadioGroup,
	TablePagination,
	TextField
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
import { GET_PASSENGER_BY_PASSENGERID } from 'src/app/constant/constants';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Input from '@mui/material/Input';
import { motion } from 'framer-motion';

import { rowsPerPageOptions } from 'src/app/@data/data';
import MultiplePassengersTable from './MultiplePassengersTable';

function MultipleVisaEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, setValue, watch } = methods;
	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const visaEntries = useSelector((state) => state.data.visaEntries);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [filterPassengers, setFilterPassengers] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [page, setPage] = useState(0);
	const [searchKey, setSearchKey] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);
	const [totalData, setTotalData] = useState({ total_pages: 0, total_elements: 0 });

	// Fetch initial data
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getVisaEntrys());
		dispatch(getAgents());
	}, [dispatch]);

	useEffect(() => {
		if ((mltPassengerList?.length > 0 || selectedPassengerIds?.length > 0) && watch('visa_entry')) {
			setValue('is_form_save', true);
		} else {
			setValue('is_form_save', false);
		}
	}, [mltPassengerList, selectedPassengerIds, watch('visa_entry')]);

	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList, setValue]);

	const handleCheckboxChange = (event, passengerId) => {
		if (event.target.checked) {
			setSelectedPassengerIds([...selectedPassengerIds, passengerId]);
		} else {
			setSelectedPassengerIds(selectedPassengerIds.filter((id) => id !== passengerId));
		}
	};

	useEffect(() => {
		setValue('passengers', selectedPassengerIds);
	}, [selectedPassengerIds, setValue]);

	const handlePassengerSelect = (newPassenger) => {
		if (newPassenger && !mltPassengerList.some((passenger) => passenger.id === newPassenger.id)) {
			setMltPassengerList([...mltPassengerList, newPassenger]);
		}
	};

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId, mltPassengerList]);

	useEffect(() => {
		if (watch('selection_or_checkbox') === 'checkbox') {
			handleFilterPassenger(page, rowsPerPage);
		}
	}, [watch('selection_or_checkbox'), searchKey, page, rowsPerPage]);

	const handleFilterPassenger = (page, size) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_PASSENGER_BY_PASSENGERID}?searchKey=${searchKey}&page=${page}&size=${size}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setFilterPassengers(data?.passengers);
				setTotalData({ total_pages: data.total_pages, total_elements: data.total_elements });
			})
			.catch(() => {});
	};

	const handlePagination = (event, newPage) => {
		setPage(newPage - 1);
	};

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	return (
		<div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="visa_entry"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full"
							freeSolo
							value={value ? visaEntries.find((data) => data.id === value) : null}
							options={visaEntries}
							getOptionLabel={(option) =>
								`${option?.visa_number || 'N/A'} - ${option?.profession_english || 'N/A'} - ${option?.quantity || 'N/A'}`
							}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Visa No."
									label="Visa No."
									autoFocus
									helperText={errors?.visa_entry?.message}
									variant="outlined"
									InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
								/>
							)}
						/>
					)}
				/>
			</div>

			<Controller
				name="selection_or_checkbox"
				control={control}
				className="my-10"
				render={({ field }) => (
					<RadioGroup
						value={field.value}
						style={{ flexDirection: 'row' }}
						id="selection_or_checkbox"
						onChange={(e) => {
							field.onChange(e.target.value);
							setMltPassengerList([]);
							setFilterPassengers([]);
							setValue('passenger', '');
							setValue('agent', '');
						}}
					>
						<FormLabel
							disabled
							style={{ marginRight: '1rem', marginTop: '1.5rem' }}
						>
							Select an option
						</FormLabel>
						<FormControlLabel
							value="selection"
							control={<Radio />}
							label="Selection"
						/>
						<FormControlLabel
							value="checkbox"
							control={<Radio />}
							label="CheckBox"
						/>
					</RadioGroup>
				)}
			/>

			{watch('selection_or_checkbox') === 'checkbox' && (
				<div className="flex flex-col md:space-y-12">
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full sm:max-w-400 mb-24 mt-24 mx-24 space-x-8 px-16 border-1 shadow-0"
					>
						<FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

						<Input
							placeholder="Search By Passport Number"
							className="flex flex-1"
							disableUnderline
							fullWidth
							inputProps={{ 'aria-label': 'Search' }}
							onKeyDown={(ev) => {
								if (ev.key === 'Enter') {
									setSearchKey(ev.target.value);
									setPage(0);
								} else if (ev.key === 'Backspace' && ev.target.value.length === 1) {
									setSearchKey('');
									setPage(0);
								}
							}}
						/>
					</Paper>
				</div>
			)}

			{watch('selection_or_checkbox') === 'checkbox' && (
				<div>
					{filterPassengers.map((passenger) => (
						<FormControlLabel
							key={passenger.id}
							name={passenger.id}
							style={{ width: '45%', marginTop: '24px', marginBottom: '24px' }}
							control={
								<Checkbox
									checked={selectedPassengerIds.includes(passenger.id)}
									onChange={(e) => handleCheckboxChange(e, passenger.id)}
								/>
							}
							label={`${passenger.passenger_name} ${passenger.passenger_id} ${passenger.passport_no} ${passenger.post_office}`}
						/>
					))}
					<div
						id="pagiContainer"
						className="flex justify-between mb-6"
					>
						<Pagination
							count={totalData.total_pages}
							page={page + 1}
							defaultPage={1}
							color="primary"
							showFirstButton
							showLastButton
							variant="outlined"
							shape="rounded"
							onChange={handlePagination}
						/>

						<TablePagination
							className="shrink-0 mb-2"
							component="div"
							rowsPerPageOptions={rowsPerPageOptions}
							count={totalData.total_elements}
							rowsPerPage={rowsPerPage}
							page={page}
							backIconButtonProps={{
								'aria-label': 'Previous Page'
							}}
							nextIconButtonProps={{
								'aria-label': 'Next Page'
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</div>
				</div>
			)}

			{watch('selection_or_checkbox') === 'selection' && (
				<div>
					<Controller
						name="passenger"
						control={control}
						render={({ field: { value, onChange } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full"
								freeSolo
								value={value ? passengers.find((data) => data.id === value) : null}
								options={passengers}
								getOptionLabel={(option) => `${option.passenger_name} - ${option.passport_no}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									handlePassengerSelect(newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select Passenger"
										label="Passenger"
										error={!value}
										helperText={errors?.agency?.message}
										variant="outlined"
										InputLabelProps={{ shrink: true }}
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
				</div>
			)}
		</div>
	);
}

export default MultipleVisaEntryForm;
