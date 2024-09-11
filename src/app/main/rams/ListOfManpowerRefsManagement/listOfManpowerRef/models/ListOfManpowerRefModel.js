import _ from '@lodash';

const ListOfManpowerRefModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default ListOfManpowerRefModel;
