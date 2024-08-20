import _ from '@lodash';
/**
 * The task model.
 */
const TaskModel = (data) =>
	_.defaults(data || {}, {
		type: 'task',
		title: '',
		notes: '',
		completed: false,
		dueDate: null,
		priority: 0,
		tags: [],
		assignedTo: null,
		user: [],
		task_type: [],
		subTasks: [],
		order: 1
	});
export default TaskModel;
