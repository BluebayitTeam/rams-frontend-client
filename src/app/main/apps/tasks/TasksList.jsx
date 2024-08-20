import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import FuseLoading from '@fuse/core/FuseLoading';
import { useEffect, useState } from 'react';
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
	console.log('tasks', tasks);
	// Update the tasks state when data is fetched
	useEffect(() => {
		if (data?.todo_tasks) {
			setTasks(data.todo_tasks);
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
			{/* <DragDropContext onDragEnd={onDragEnd}>
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
												// todo_tasks={todo_tasks}
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
			</DragDropContext> */}

			{tasks.map((item, index) => {
				<TaskListItem
					data={item}
					index={index}
					key={item.id}
					// todo_tasks={todo_tasks}
				/>;
				return null;
			})}
		</List>
	);
}

export default TasksList;
