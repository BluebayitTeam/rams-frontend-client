import _ from '@lodash';

const GdsModel = (data) =>
	_.defaults(data || {}, {
		name: '',
		short_code: '',
		air_code: ''
	});
export default GdsModel;
