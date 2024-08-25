import { motion } from 'framer-motion';
import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectSelectedLabels, toggleSelectedLabels } from './store/selectedLabelsSlice';
import { selectFilteredEvents, useGetCalendarLabelsQuery } from './CalendarApi';
import LabelsDialog from './dialogs/labels/LabelsDialog';

/**
 * The calendar app sidebar.
 */
function CalendarAppSidebar() {
	const selectedLabels = useSelector(selectSelectedLabels);
	const dispatch = useAppDispatch();

	const [openDialog, setOpenDialog] = useState(false);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

	// Fetch data using the query
	const { data } = useGetCalendarLabelsQuery({ ...pageAndSize });

	// Ensure data and task_types are defined
	const labels = useSelector(selectFilteredEvents(data?.task_types || []));
	console.log('labels', data);

	const handleCheckboxChange = (labelId) => {
		console.log('labelId', labelId);
		dispatch(toggleSelectedLabels(labelId));
	};

	return (
		<div className="flex flex-col flex-auto min-h-full p-32">
			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
				className="pb-24 text-4xl font-extrabold tracking-tight"
			>
				Calendar
			</motion.span>

			<div className="group flex items-center justify-between mb-12">
				<Typography
					className="text-15 font-600 leading-none"
					color="secondary.main"
				>
					LABELS
				</Typography>

				<LabelsDialog />
			</div>

			{labels?.map((label) => (
				<div
					key={label.id}
					className="group flex items-center mt-8 space-x-8 h-24 w-full"
				>
					<Checkbox
						color="default"
						className="p-0"
						checked={selectedLabels.includes(label.id)}
						onChange={() => handleCheckboxChange(label.id)}
					/>

					<Box
						className="w-12 h-12 shrink-0 rounded-full"
						sx={{ backgroundColor: label.color }}
					/>

					<Typography className="flex flex-1 leading-none">{label.name}</Typography>
				</div>
			))}
		</div>
	);
}

export default CalendarAppSidebar;
