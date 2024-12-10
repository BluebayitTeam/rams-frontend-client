import _ from '@lodash';

const TicketDeputeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('ticketDepute-'),
		name: '',
		
	});
export default TicketDeputeModel;
