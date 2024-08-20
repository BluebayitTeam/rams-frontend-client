import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector } from 'react-redux';
import TaskListItem from './TaskListItem';
import SectionListItem from './SectionListItem';
import { selectRemainingTasks, selectTasksList, useGetTasksQuery, useReorderTasksMutation } from './TasksApi';

/**
 * The tasks list.
 */
function TasksList() {
	const { data, isLoading } = useGetTasksQuery();
	console.log('ckhkhdskhfkdf', 'data');

	const totalData = useSelector((state) => selectTasksList(state, data));
	const tasks = useSelector((state) => selectRemainingTasks(state, data?.todo_tasks || []));

	const [reorderList] = useReorderTasksMutation();
	console.log('dsfjhsdjkfdjskfh', tasks);

	if (isLoading) {
		return <FuseLoading />;
	}

	// Check if tasks is undefined or has a length of 0
	if (!tasks || tasks.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no tasks!
				</Typography>
			</div>
		);
	}

	function onDragEnd(result) {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		const { index: destinationIndex } = destination;
		const { index: sourceIndex } = source;

		if (destinationIndex === sourceIndex) {
			return;
		}

		reorderList({
			startIndex: sourceIndex,
			endIndex: destinationIndex
		});
	}

	return (
		<List className="w-full m-0 p-0">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId="list"
					type="list"
					direction="vertical"
				>
					{(provided) => (
						<>
							<div ref={provided.innerRef}>
								{tasks.map((item, index) => {
									if (item.type === 'task') {
										return (
											<TaskListItem
												data={item}
												index={index}
												key={item.id}
											/>
										);
									}

									if (item.type === 'section') {
										return (
											<SectionListItem
												key={item.id}
												index={index}
												data={item}
											/>
										);
									}

									return null;
								})}
							</div>
							{provided.placeholder}
						</>
					)}
				</Droppable>
			</DragDropContext>
		</List>
	);
}

export default TasksList;
