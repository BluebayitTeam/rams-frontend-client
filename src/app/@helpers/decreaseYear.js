import { subDays, subYears } from 'date-fns';
import moment from 'moment';

const decreaseYear = (date, number) => {
	const addYear = subYears(new Date(date), number);
	const addYearMinusOneDay = subDays(new Date(addYear), -1);

	return moment(addYearMinusOneDay).format('YYYY-MM-DD');
};

export default decreaseYear;
