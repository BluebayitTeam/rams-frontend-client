/* eslint-disable jsx-a11y/alt-text */
import { FormControl } from '@mui/base';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

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

function OpeningBalance(props) {
	const userID = localStorage.getItem('user_id');
	const classes = useStyles(props);
	const methods = useFormContext();
	const routeParams = useParams();
	const { agentId } = routeParams;
	const { control, formState, getValues, setError } = methods;
	const { errors, isValid, dirtyFields } = formState;
	const handleDelete = localStorage.getItem('agentEvent');

	const dispatch = useDispatch();

	return (
		<div>
			<Controller
				name="balance_type"
				control={control}
				render={({ field }) => (
					<FormControl
						component="fieldset"
						className={classes.formControl}
					>
						<FormLabel
							component="legend"
							className="text-14"
						>
							Balance Type
						</FormLabel>
						<RadioGroup
							{...field}
							aria-label="Layout Direction"
							className={classes.group}
							row
						>
							<FormControlLabel
								key="creditors"
								value="creditors"
								control={
									<Radio
										checked={getValues()?.balance_type === 'creditors'}
										color="primary"
									/>
								}
								label="Creditor's"
							/>
							<FormControlLabel
								key="debtors"
								value="debtors"
								control={
									<Radio
										checked={getValues().balance_type === 'debtors'}
										color="primary"
									/>
								}
								label="Debtor's"
							/>
						</RadioGroup>
					</FormControl>
				)}
			/>

			<Controller
				name="balance_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.balance_date}
							helperText={errors?.balance_date?.message}
							label="Date"
							id="balance_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="balance_amount"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.balance_amount}
							helperText={errors?.balance_amount?.message}
							label="Amount"
							id="balance_amount"
							type="number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="balance_note"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.balance_note}
							helperText={errors?.balance_note?.message}
							label="Balance Notes *"
							id="balance_note"
							multiline
							rows={4}
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>
		</div>
	);
}

export default OpeningBalance;
