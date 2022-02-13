import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import fillUnderscoreBySpace from 'app/@helpers/fillUnderscoreBySpace';
import moment from 'moment';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
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
			background: theme.palette.primary.light,
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

const Keyword = ({
	name,
	label,
	domEl,
	icon,
	type = 'text',
	setReRender,
	onClick = () => null,
	hideRemoveAction
} = {}) => {
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
						<FontAwesomeIcon className="iconWithKeyWord" icon={type === 'date' ? faCalendarAlt : icon} />
						<p>
							{type === 'date'
								? moment(new Date(values[`${name}`])).format('DD-MM-YYYY')
								: type === 'text'
								? values[`${name}`]
								: values[`${name}Name`]}
						</p>
						{hideRemoveAction || (
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
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
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Keyword;
