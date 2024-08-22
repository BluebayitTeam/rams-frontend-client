import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import format from 'date-fns/format';
import Typography from '@mui/material/Typography';
import { Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { useUpdateTasksItemMutation } from './TasksApi';

/**
 * The task list item.
 */
function TaskListItem(props) {
	const { item, index } = props;
	const [updateTask] = useUpdateTasksItemMutation();
	const [showDetails, setShowDetails] = useState(false);

	const handleToggleDetails = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		setShowDetails(!showDetails);
	};

	return (
		<Draggable
			draggableId={item.id}
			index={index}
		>
			{(provided, snapshot) => (
				<>
					<ListItem
						className={clsx(snapshot.isDragging ? 'shadow-lg' : 'shadow', 'px-40 py-12 group')}
						sx={{ bgcolor: 'background.paper' }}
						button
						component={NavLinkAdapter}
						to={`/apps/tasks/${item.id}`}
						ref={provided.innerRef}
						{...provided.draggableProps}
					>
						<div
							className="md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex"
							{...provided.dragHandleProps}
						>
							<FuseSvgIcon
								sx={{ color: 'text.disabled' }}
								size={20}
							>
								heroicons-solid:menu
							</FuseSvgIcon>
						</div>
						<ListItemIcon className="min-w-40 -ml-10 mr-8">
							<IconButton
								sx={{ color: item.completed ? 'secondary.main' : 'text.disabled' }}
								onClick={(ev) => {
									ev.preventDefault();
									ev.stopPropagation();
									updateTask({ ...item, completed: !item.completed });
								}}
							>
								<FuseSvgIcon>heroicons-outline:check-circle</FuseSvgIcon>
							</IconButton>
						</ListItemIcon>
						<ListItemText
							classes={{ root: 'm-0', primary: 'truncate' }}
							primary={item.title}
						/>

						<div className="flex items-center">
							{item.from_date && (
								<Typography
									className="text-12 whitespace-nowrap"
									color="text.secondary"
								>
									{format(new Date(item.from_date), 'LLL dd')}
								</Typography>
							)}
						</div>

						{/* Toggle details button */}
						<IconButton onClick={handleToggleDetails}>
							<FuseSvgIcon>heroicons-outline:chevron-down</FuseSvgIcon>
						</IconButton>
					</ListItem>

					{/* Render additional data */}
					{showDetails && (
						<div className="px-40 py-12">
							<Typography
								variant="body2"
								color="text.secondary"
							>
								Description: {item.note || 'No description available.'}
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
							>
								Due Date: {item.to_date ? format(new Date(item.to_date), 'PP') : 'No due date.'}
							</Typography>
						</div>
					)}

					<Divider />
				</>
			)}
		</Draggable>
	);
}

export default TaskListItem;
