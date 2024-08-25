/* eslint-disable react/no-unstable-nested-components */
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch } from 'app/store/store';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import CalendarHeader from './CalendarHeader';
import EventDialog from './dialogs/event/EventDialog';
import { openEditEventDialog, openNewEventDialog } from './store/eventDialogSlice';
import CalendarAppSidebar from './CalendarAppSidebar';
import { useGetCalendarEventsQuery, useUpdateCalendarEventMutation } from './CalendarApi';
import reducer from './store';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& a': {
		color: `${theme.palette.text.primary}!important`,
		textDecoration: 'none!important'
	},
	'&  .fc-media-screen': {
		minHeight: '100%',
		width: '100%'
	},
	'& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
		borderColor: `${theme.palette.divider}!important`
	},
	'&  .fc-scrollgrid-section > td': {
		border: 0
	},
	'& .fc-daygrid-day': {
		'&:last-child': {
			borderRight: 0
		}
	},
	'& .fc-col-header-cell': {
		borderWidth: '0 1px 0 1px',
		padding: '8px 0 0 0',
		'& .fc-col-header-cell-cushion': {
			color: theme.palette.text.secondary,
			fontWeight: 500,
			fontSize: 12,
			textTransform: 'uppercase'
		}
	},
	'& .fc-view ': {
		'& > .fc-scrollgrid': {
			border: 0
		}
	},
	'& .fc-daygrid-day.fc-day-today': {
		backgroundColor: 'transparent!important',
		'& .fc-daygrid-day-number': {
			borderRadius: '100%',
			backgroundColor: `${theme.palette.secondary.main}!important`,
			color: `${theme.palette.secondary.contrastText}!important`
		}
	},
	'& .fc-daygrid-day-top': {
		justifyContent: 'center',
		'& .fc-daygrid-day-number': {
			color: theme.palette.text.secondary,
			fontWeight: 500,
			fontSize: 12,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: 26,
			height: 26,
			margin: '4px 0',
			borderRadius: '50%',
			float: 'none',
			lineHeight: 1
		}
	},
	'& .fc-h-event': {
		background: 'initial'
	},
	'& .fc-event': {
		border: 0,
		padding: '0 ',
		fontSize: 12,
		margin: '0 6px 4px 6px!important'
	}
}));

/**
 * The calendar app.
 */
function CalendarApp(props) {
	const { searchKey } = props;
	const [currentDate, setCurrentDate] = useState();
	const dispatch = useAppDispatch();
	const [yearMonth, setYearMonth] = useState({ year: '', month: '' });
	const { data, isLoading, refetch } = useGetCalendarEventsQuery(
		{ ...yearMonth, searchKey },
		{ refetchOnMountOrArgChange: true }
	);

	const calendarRef = useRef(null);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [updateEvent] = useUpdateCalendarEventMutation();
	const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];

	const events =
		data?.todo_tasks.map((task) => ({
			id: task.id,
			title: task.title,
			start: task.from_date,
			end: task.to_date,
			allDay: false,
			extendedProps: {
				is_completed: task.is_completed,
				is_emergency: task.is_emergency,
				note: task.note,
				user: task.user,
				created_by: task.created_by,
				updated_by: task.updated_by
			}
		})) || [];

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		// Force refetch on first render or when yearMonth/searchKey changes
		refetch();
	}, [yearMonth, searchKey, refetch]);

	useEffect(() => {
		// Correct calendar dimensions after sidebar toggles
		setTimeout(() => {
			calendarRef.current?.getApi()?.updateSize();
		}, 300);
	}, [leftSidebarOpen]);

	useEffect(() => {
		// Ensure calendar events are updated when new data is fetched
		if (calendarRef.current) {
			calendarRef.current.getApi().removeAllEvents();
			calendarRef.current.getApi().addEventSource(events);
		}
	}, [data, events]);

	const handleDateSelect = (selectInfo) => {
		dispatch(openNewEventDialog(selectInfo));
	};

	const handleEventDrop = (eventDropInfo) => {
		const { id, title, allDay, start, end, extendedProps } = eventDropInfo.event;
		updateEvent({
			id,
			title,
			allDay,
			start: start?.toISOString() ?? '',
			end: end?.toISOString() ?? '',
			extendedProps
		});
	};

	const handleEventClick = (clickInfo) => {
		clickInfo.jsEvent.preventDefault();
		dispatch(openEditEventDialog(clickInfo));
	};

	const handleDates = (rangeInfo) => {
		setCurrentDate(rangeInfo);
	};

	const handleEventAdd = (addInfo) => {
		console.info(addInfo);
	};

	const handleEventChange = (changeInfo) => {
		console.info(changeInfo);
	};

	const handleEventRemove = (removeInfo) => {
		console.info(removeInfo);
	};

	function handleToggleLeftSidebar() {
		setLeftSidebarOpen(!leftSidebarOpen);
	}

	// Compute initial date
	const computeInitialDate = () => {
		// Example: Set the initial date to the first day of the current month
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<>
			<Root
				header={
					<CalendarHeader
						calendarRef={calendarRef}
						currentDate={currentDate}
						onToggleLeftSidebar={handleToggleLeftSidebar}
					/>
				}
				content={
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						headerToolbar={false}
						initialView="dayGridMonth"
						editable
						selectable
						selectMirror
						dayMaxEvents
						weekends
						datesSet={handleDates}
						select={handleDateSelect}
						events={events}
						eventContent={(eventInfo) => {
							const eventIndex = eventInfo.event.id % colors.length;
							const eventColor = colors[eventIndex];

							return (
								<div
									style={{
										color: 'white',
										backgroundColor: eventColor,
										padding: '10px',
										borderRadius: '3px',
										width: '160px'
									}}
								>
									<strong>{eventInfo.event.title}</strong>
								</div>
							);
						}}
						eventClick={handleEventClick}
						eventAdd={handleEventAdd}
						eventChange={handleEventChange}
						eventRemove={handleEventRemove}
						eventDrop={handleEventDrop}
						initialDate={computeInitialDate()}
						ref={calendarRef}
					/>
				}
				leftSidebarContent={<CalendarAppSidebar />}
				leftSidebarOpen={leftSidebarOpen}
				leftSidebarOnClose={() => setLeftSidebarOpen(false)}
				leftSidebarWidth={240}
				scroll="content"
			/>
			<EventDialog />
		</>
	);
}

export default withReducer('calendarApp', reducer)(CalendarApp);
