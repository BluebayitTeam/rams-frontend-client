/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

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

function NewMedical(props) {
	const classes = useStyles(props);
	const methods = useFormContext();
	// const routeParams = useParams();
	const { control, formState, getValues, setError } = methods;
	const { errors } = formState;

	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();

	return (
		<FormProvider>
			<div className="flex justify-center w-full px-16 ">
				{/* <Controller
					name="passenger"
					control={control}
					render={({ field: { value } }) => (
						<Autocomplete
							className={`w-full max-w-320 h-48 ${classes.container}`}
							freeSolo
							autoHighlight
							disabled={!!fromSearch}
							value={value ? passengers.find((data) => data.id === value) : null}
							options={passengers}
							getOptionLabel={(option) =>
								`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
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
									InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
								/>
							)}
						/>
					)}
				/> */}

				<Controller
					name="passenger"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className={`w-full max-w-320 h-48 ${classes.container}`}
							freeSolo
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
									placeholder="Select passengers"
									label="passengers"
									// error={!!errors.country || !value}
									helperText={errors?.passengers?.message}
									variant="outlined"
									InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

									// onKeyDown={handleSubmitOnKeyDownEnter}
								/>
							)}
						/>
					)}
				/>
			</div>
		</FormProvider>
	);
}

export default NewMedical;
