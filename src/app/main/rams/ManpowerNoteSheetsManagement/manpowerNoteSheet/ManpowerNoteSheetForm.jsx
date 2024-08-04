/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from 'src/app/constant/constants';
import { NOTE_SHEET_FOOTER, NOTE_SHEET_HEADER } from 'src/app/constant/FormContentTitle/formContentTitle';

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

function ManpowerNoteSheetForm(props) {
	const methods = useFormContext();
	const { control, formState, watch, getValues } = methods;
	const { errors } = formState;
	const dispatch = useDispatch();

	const classes = useStyles({ isPassenger: watch('passenger') });

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${NOTE_SHEET_HEADER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentHeaderData', data?.formcontent_detail[0]?.details || '')
			);

		fetch(`${GET_FORM_CONTENT_DETAILS_BY_TITLE}${NOTE_SHEET_FOOTER}`, authTOKEN)
			.then((response) => response.json())
			.then((data) =>
				sessionStorage.setItem('formContentFooterData', data?.formcontent_detail[0]?.details || '')
			);
	}, []);

	// useEffect(() => {
	// 	dispatch(getManpowerNoteSheet({ man_power_date: watch('man_power_date') }));
	// }, [watch('man_power_date')]);

	return (
		<div>
			<Controller
				name="man_power_date"
				control={control}
				render={({ field }) => {
					return (
						<CustomDatePicker
							field={field}
							label="Man Power Sheet  Date"
							required
						/>
					);
				}}
			/>
		</div>
	);
}

export default ManpowerNoteSheetForm;
