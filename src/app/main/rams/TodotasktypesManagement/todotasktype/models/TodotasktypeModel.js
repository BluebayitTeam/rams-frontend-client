import _ from '@lodash';

const TodotasktypeModel = (data) =>
	_.defaults(data || {}, {
		name: ''
	});
export default TodotasktypeModel;
