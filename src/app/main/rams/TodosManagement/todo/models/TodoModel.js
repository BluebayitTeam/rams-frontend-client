import _ from '@lodash';

const TodoModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('Todo-'),
		name: ''
	});
export default TodoModel;
