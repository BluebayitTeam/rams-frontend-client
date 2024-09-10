import _ from '@lodash';

const ManpowerNoteSheetFemaleModel = (data) =>
	_.defaults(data || {}, {
		man_power_date: ''
	});
export default ManpowerNoteSheetFemaleModel;
