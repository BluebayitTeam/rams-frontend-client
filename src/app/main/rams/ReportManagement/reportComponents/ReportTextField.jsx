import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import fillUnderscoreBySpace from 'app/@helpers/fillUnderscoreBySpace';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
	fieldContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: theme.palette.primary.main,
		height: '30px',
		width: 'fit-content',
		margin: '10px 5px',
		'& .textField': {
			height: '100%',
			margin: '0px 10px',
			background: 'inherit',
			border: 'none',
			outline: 'none',
			borderBottom: `1px solid ${theme.palette.primary.light}`,
			color: theme.palette.primary.main,
			width: '100%',
			transition: '0.3s',
			'&:focus': {
				borderBottom: `1px solid ${theme.palette.primary.main}`,
				width: '100px !important'
			},
			'&::placeholder': {
				color: theme.palette.primary.main
			},
			'&::-ms-input-placeholder': {
				color: theme.palette.primary.main
			},
			'&:-ms-input-placeholder': {
				color: theme.palette.primary.main
			}
		},
		'& .icon': {
			fontSize: '20px'
		}
	}
}));

const ReportTextField = ({ name, label, domEl, icon, width, setReRender, onEnter = () => null } = {}) => {
	const classes = useStyles();

	const methods = useFormContext();
	const { getValues, setValue } = methods;
	const values = getValues();

	const [Label] = useState(label || fillUnderscoreBySpace(name));

	return (
		<div className={classes.fieldContainer}>
			<FontAwesomeIcon className="icon" icon={icon} />

			<input
				ref={domEl}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						setValue(`${name}`, e.target.value);
						onEnter();
						domEl.current.blur();
						domEl.current.value = '';
						setReRender(Math.random());
					}
				}}
				onFocus={() => (domEl.current.value = domEl.current.value || values[`${name}`] || '')}
				className="textField"
				style={{ width }}
				placeholder={Label}
			/>
		</div>
	);
};

export default ReportTextField;
