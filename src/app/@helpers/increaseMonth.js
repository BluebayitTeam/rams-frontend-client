import { addDays, addMonths } from 'date-fns';
import moment from 'moment';

const increaseMonth = (date, number) => {
	const addMonth = addMonths(new Date(date), number);
	const addMonthMinusOneDay = addDays(new Date(addMonth), -1);

	return moment(addMonthMinusOneDay).format('YYYY-MM-DD');
};

export default increaseMonth;
