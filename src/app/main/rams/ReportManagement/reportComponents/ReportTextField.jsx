import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { getReportTextFieldMakeStyles } from '../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportTextFieldMakeStyles(theme)
}));

const ReportTextField = ({ name, label, domEl, icon, width, setReRender, onEnter = () => null } = {}) => {
	const classes = useStyles();

	const methods = useFormContext();
	const { getValues, setValue } = methods;
	const values = getValues();

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
				placeholder={label || name?.charAt(0)?.toUpperCase() + name?.slice(1)}
			/>
		</div>
	);
};

export default ReportTextField;
