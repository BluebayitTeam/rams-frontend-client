import _ from '@lodash';

const ManpowerNoteSheetModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default ManpowerNoteSheetModel;
