import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ALL_TODO_TASK } from 'src/app/constant/constants';
import { selectSelectedLabels, toggleSelectedLabels, setSelectedLabels } from './store/selectedLabelsSlice';
import { useGetCalendarLabelsQuery } from './CalendarApi';

/**
 * The calendar app sidebar.
 */
function CalendarAppSidebar({ yearMonth }) {
	console.log('yearMonth', yearMonth);
	const selectedLabels = useSelector(selectSelectedLabels);
	const dispatch = useAppDispatch();
	const [labels, setLabels] = useState([]);

	const { year, month } = yearMonth; // Destructure yearMonth prop

	const { data } = useGetCalendarLabelsQuery({ year, size: 25 });

	useEffect(() => {
		if (data?.task_types) {
			setLabels(data.task_types);

			const allLabelIds = data.task_types.map((label) => label.id);

			dispatch(setSelectedLabels(allLabelIds));

			// Fetch data for each label ID
			fetchDataForLabels(allLabelIds);
		}
	}, [data, dispatch, year, month]);

	const fetchDataForLabels = async (labelIds) => {
		try {
			const response = await axios.get(
				`${ALL_TODO_TASK}?year=${year}&month=${month}&task_type=${labelIds.join(',')}`
			);
		} catch (error) {
			console.error('Error during API call:', error);
		}
	};

	const handleCheckboxChange = async (labelId) => {
		try {
			dispatch(toggleSelectedLabels(labelId));
			const updatedLabels = selectedLabels.includes(labelId)
				? selectedLabels.filter((id) => id !== labelId)
				: [...selectedLabels, labelId];
			await fetchDataForLabels(updatedLabels);
		} catch (error) {
			console.error('Error during handleCheckboxChange:', error);
		}
	};

	return (
		<div className="flex flex-col flex-auto min-h-full p-32">
			<Typography className="pb-24 text-4xl font-extrabold tracking-tight">Calendar</Typography>
			<div className="group flex items-center justify-between mb-12">
				<Typography
					className="text-15 font-600 leading-none"
					color="secondary.main"
				>
					Task
				</Typography>
			</div>
			{labels.map((label) => (
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
