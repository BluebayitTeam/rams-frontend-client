import _ from '@lodash';

const TicketPostingModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default TicketPostingModel;
