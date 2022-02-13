import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import { getReportKeywordMakeStyles } from '../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportKeywordMakeStyles(theme)
}));

const Keyword = ({ name, label, domEl, icon, type = 'text', setReRender, onClick = () => null } = {}) => {
	const classes = useStyles();
	const methods = useFormContext();
	const { getValues, setValue } = methods;
	const values = getValues();
	return (
		<>
			{(type === 'select' ? values[`${name}Name`] : values[`${name}`]) && (
				<div className={classes.keywordContainer}>
					<b>{label || name?.charAt(0)?.toUpperCase() + name?.slice(1)}</b>
					<div>
						<FontAwesomeIcon className="iconWithKeyWord" icon={type === 'date' ? faCalendarAlt : icon} />
						<p>
							{type === 'date'
								? moment(new Date(values[`${name}`])).format('DD-MM-YYYY')
								: values[`${name}`]}
						</p>
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
					</div>
				</div>
			)}
		</>
	);
};

export default Keyword;
