import { useTheme } from '@mui/material/styles';
import _ from '@lodash';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useGetCalendarEventsQuery } from './CalendarApi';

/**
 * The event content for the calendar app.
 */
function CalendarAppEventContent(props) {
	const { eventInfo, searchKey } = props;
	const theme = useTheme();
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading } = useGetCalendarEventsQuery({ ...pageAndSize, searchKey });

	const labelId = eventInfo.event.extendedProps.label;

	const label = _.find(data, { id: labelId });
	console.log('', label);
	return (
		<Box
			sx={{
				backgroundColor: label?.color,
				color: label && theme.palette.getContrastText(label?.color)
			}}
			className={clsx('flex items-center w-full rounded-4 px-8 py-2 h-22 text-white')}
		>
			<Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
			<Typography className="text-12 px-4 truncate">{eventInfo.event.title}</Typography>
		</Box>
	);
}

export default CalendarAppEventContent;
