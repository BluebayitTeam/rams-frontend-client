import _ from '@lodash';

const GdsModel = (data) =>
	_.defaults(data || {}, {
		name: '',
		note: ''
	});
export default GdsModel;
