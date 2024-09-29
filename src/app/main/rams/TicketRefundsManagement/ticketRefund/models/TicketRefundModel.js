import _ from '@lodash';

const TicketRefundModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('ticketRefund-'),
		name: '',
		
	});
export default TicketRefundModel;
