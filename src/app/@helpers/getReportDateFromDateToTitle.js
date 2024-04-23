import moment from 'moment';

const getReportDateFromDateToTitle = (dateAfter, dateBefore) => {
	const startDate = moment(dateAfter, 'DD-MM-YYYY').format('DD MMMM, YYYY');
	const endDate = moment(dateBefore, 'DD-MM-YYYY').format('DD MMMM, YYYY');

	return `For ${startDate} to ${endDate}`;
};

export default getReportDateFromDateToTitle;
