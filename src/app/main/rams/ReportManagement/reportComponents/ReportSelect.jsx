import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Controller, useFormContext } from 'react-hook-form';
import { getReportSelectMakeStyles } from '../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportSelectMakeStyles(theme)
}));

const ReportSelect = ({ name, label, options = [], icon, width, setReRender, onEnter = () => null } = {}) => {
	const classes = useStyles();

	const methods = useFormContext();
	const { getValues, setValue, control } = methods;
	const values = getValues();

	const isFocused = values[`${name}Focused`];

	return (
		<div className={classes.fieldContainer}>
			<FontAwesomeIcon className="icon" icon={icon} />

			<div
				className="selectLabel"
				style={{
					width: isFocused ? '0px' : width,
					margin: isFocused ? '0px' : '2px 5px 0px 10px'
				}}
				onClick={() => {
					setValue(`${name}Focused`, true);
					setReRender(Math.random());
					setTimeout(() => document.getElementById(`${name}groupEl`).focus(), 300);
				}}
			>
				{label || name?.charAt(0)?.toUpperCase() + name?.slice(1)}
			</div>
			<FontAwesomeIcon
				className="selectOpenIcon cursor-pointer"
				style={{
					width: isFocused ? '0px' : '15px',
					margin: isFocused ? '0px' : '2px 10px 0px 0px'
				}}
				onClick={() => {
					setValue(`${name}Focused`, true);
					setReRender(Math.random());
					setTimeout(() => document.getElementById(`${name}groupEl`).focus(), 300);
				}}
				icon={faChevronDown}
			/>

			<Controller
				name={`${name}`}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						id={`${name}groupEl`}
						className="mb-3 selectField"
						style={{
							width: isFocused ? '130px' : '0px',
							margin: isFocused ? '0px 10px' : '0px',
							display: isFocused ? 'block' : 'none'
						}}
						classes={{ endAdornment: 'endAdornment' }}
						openOnFocus={true}
						onClose={() => {
							setValue(`${name}Focused`, false);
							setReRender(Math.random());
						}}
						freeSolo
						options={options}
						value={value ? options.find(data => data.id == value) : null}
						getOptionLabel={option => `${option.name}`}
						onChange={(_event, newValue) => {
							onChange(newValue?.id);
							onEnter();
							setValue(`${name}Name`, newValue?.name || '');
						}}
						renderInput={params => (
							<TextField
								{...params}
								className="textFieldUnderSelect"
								placeholder={`Select ${label || name?.charAt(0)?.toUpperCase() + name?.slice(1)}`}
							/>
						)}
					/>
				)}
			/>
		</div>
	);
};

export default ReportSelect;
