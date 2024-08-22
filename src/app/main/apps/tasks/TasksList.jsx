import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import FuseLoading from '@fuse/core/FuseLoading';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGetTasksQuery, useReorderTasksMutation } from './TasksApi';
import TaskListItem from './TaskListItem';

/**
 * The tasks list.
 */
function TasksList(props) {
	const { searchKey } = props;
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, error, isLoading } = useGetTasksQuery({ ...pageAndSize, searchKey });

	// Initialize the tasks state with an empty array
	const [tasks, setTasks] = useState([]);
	// Update the tasks state when data is fetched
	useEffect(() => {
		const todos = data?.todo_tasks;

		if (todos) {
			setTasks(todos);
		}
	}, [data]);
	const [reorderList] = useReorderTasksMutation();

	if (isLoading) {
		return <FuseLoading />;
	}

	if (tasks.length === 0) {
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
				<Droppable droppableId="tasks">
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{tasks.length > 0 ? (
								tasks.map((item, index) => (
									<TaskListItem
										key={item.id}
										item={item}
										index={index}
									/>
								))
							) : (
								<p>No tasks available</p>
							)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</List>
	);
}

export default TasksList;
