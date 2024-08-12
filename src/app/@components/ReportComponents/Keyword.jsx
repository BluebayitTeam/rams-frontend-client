import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import fillUnderscoreBySpace from 'src/app/@helpers/fillUnderscoreBySpace';
import { Icon } from '@mui/material';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';

const useStyles = makeStyles((theme) => ({
	keywordContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: 'fit-content',
		margin: '2px 5px',
		'& > b': {
			color: theme.palette.primary.main,
			opacity: 0.6,
			fontWeight: 600
		},
		'& > div': {
			padding: '3px 8px',
			fontSize: '14px',
			background: 'rgb(194 199 241)',
			color: theme.palette.primary.dark,
			margin: '3px 5px',
			borderRadius: '15px',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			height: '25px',
			'& > p': {
				marginBottom: '-1px'
			},
			'& .iconWithKeyWord': {
				marginRight: '5px'
			},
			'& .closeIconWithKeyWord': {
				marginLeft: '5px',
				cursor: 'pointer'
			}
		}
	}
}));

function Keyword({
	name,
	label,
	domEl,
	icon,
	type = 'text',
	setReRender,
	onClick = () => null,
	hideRemoveAction
} = {}) {
	const classes = useStyles();
	const methods = useFormContext();
	const { getValues, setValue } = methods;
	const values = getValues();

	const [Label] = useState(label || fillUnderscoreBySpace(name));

	return (
		<>
			{(type === 'select' ? values[`${name}Name`] : values[`${name}`]) && (
				<div className={classes.keywordContainer}>
					<b>{Label}</b>
					<div>
						{type === 'date' ? (
							<CalendarMonthSharpIcon className="icon me-5" />
						) : (
							<Icon className="me-5">{icon}</Icon>
						)}
						<p>
							{type === 'date'
								? moment(new Date(values[`${name}`])).format('DD-MM-YYYY')
								: type === 'text'
									? values[`${name}`]
									: values[`${name}Name`]}
						</p>
						{hideRemoveAction || (
							<Icon
								className="ml-10 cursor-pointer"
								onClick={() => {
									setValue(`${name}`, '');

									if (type === 'text') {
										domEl.current.value = '';
									} else if (type === 'select') {
										setValue(`${name}Name`, '');
									}

									onClick();
									setReRender(Math.random());
								}}
							>
								highlight_off_sharp
							</Icon>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default Keyword;
