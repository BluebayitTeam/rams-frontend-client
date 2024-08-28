/* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react/no-unstable-nested-components */
// import { styled } from '@mui/material/styles';
// import { useEffect, useRef, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import FusePageSimple from '@fuse/core/FusePageSimple';
// import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
// import { useAppDispatch } from 'app/store/store';
// import FuseLoading from '@fuse/core/FuseLoading';
// import withReducer from 'app/store/withReducer';
// import CalendarHeader from './CalendarHeader';
// import { openEditEventDialog, openNewEventDialog } from './store/eventDialogSlice';
// import CalendarAppSidebar from './CalendarAppSidebar';
// import { useGetCalendarEventsQuery, useUpdateCalendarEventMutation } from './CalendarApi';
// import reducer from './store';

// const Root = styled(FusePageSimple)(({ theme }) => ({
// 	'& a': {
// 		color: `${theme.palette.text.primary}!important`,
// 		textDecoration: 'none!important'
// 	},
// 	'& .fc-media-screen': {
// 		minHeight: '100%',
// 		width: '100%'
// 	},
// 	'& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
// 		borderColor: `${theme.palette.divider}!important`
// 	},
// 	'& .fc-scrollgrid-section > td': {
// 		border: 0
// 	},
// 	'& .fc-daygrid-day': {
// 		'&:last-child': {
// 			borderRight: 0
// 		}
// 	},
// 	'& .fc-col-header-cell': {
// 		borderWidth: '0 1px 0 1px',
// 		padding: '8px 0 0 0',
// 		'& .fc-col-header-cell-cushion': {
// 			color: theme.palette.text.secondary,
// 			fontWeight: 500,
// 			fontSize: 12,
// 			textTransform: 'uppercase'
// 		}
// 	},
// 	'& .fc-view': {
// 		'& > .fc-scrollgrid': {
// 			border: 0
// 		}
// 	},
// 	'& .fc-daygrid-day.fc-day-today': {
// 		backgroundColor: 'transparent!important',
// 		'& .fc-daygrid-day-number': {
// 			borderRadius: '100%',
// 			backgroundColor: `${theme.palette.secondary.main}!important`,
// 			color: `${theme.palette.secondary.contrastText}!important`
// 		}
// 	},
// 	'& .fc-daygrid-day-top': {
// 		justifyContent: 'center',
// 		'& .fc-daygrid-day-number': {
// 			color: theme.palette.text.secondary,
// 			fontWeight: 500,
// 			fontSize: 12,
// 			display: 'inline-flex',
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 			width: 26,
// 			height: 26,
// 			margin: '4px 0',
// 			borderRadius: '50%',
// 			float: 'none',
// 			lineHeight: 1
// 		}
// 	},
// 	'& .fc-h-event': {
// 		background: 'initial'
// 	},
// 	'& .fc-event': {
// 		border: 0,
// 		padding: '0 ',
// 		fontSize: 12,
// 		margin: '0 6px 4px 6px!important'
// 	}
// }));

// function CalendarApp(props) {
// 	const { searchKey } = props;
// 	const [currentDate, setCurrentDate] = useState();
// 	const dispatch = useAppDispatch();
// 	const [yearMonth, setYearMonth] = useState(() => {
// 		const now = new Date();
// 		return {
// 			year: now.getFullYear().toString(),
// 			month: (now.getMonth() + 1).toString().padStart(2, '0')
// 		};
// 	});
// 	const { data, isLoading, refetch } = useGetCalendarEventsQuery(
// 		{ ...yearMonth, searchKey },
// 		{ refetchOnMountOrArgChange: true }
// 	);

// 	const calendarRef = useRef(null);

// 	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
// 	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
// 	const [updateEvent] = useUpdateCalendarEventMutation();
// 	const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];

// 	useEffect(() => {
// 		setLeftSidebarOpen(!isMobile);
// 	}, [isMobile]);

// 	useEffect(() => {
// 		refetch();
// 	}, [yearMonth, searchKey, refetch]);

// 	const events =
// 		data?.todo_tasks?.map((task) => ({
// 			id: task.id,
// 			title: task.title,
// 			start: task.from_date,
// 			end: task.to_date,
// 			allDay: false,
// 			extendedProps: {
// 				is_completed: task.is_completed,
// 				is_emergency: task.is_emergency,
// 				note: task.note,
// 				user: task.user,
// 				created_by: task.created_by,
// 				updated_by: task.updated_by
// 			}
// 		})) || [];

// 	useEffect(() => {
// 		if (calendarRef.current) {
// 			const calendarApi = calendarRef.current.getApi();
// 			calendarApi.removeAllEvents();
// 			calendarApi.addEventSource(events);
// 		}
// 	}, [events]);

// 	const handleDateSelect = (selectInfo) => {
// 		dispatch(openNewEventDialog(selectInfo));
// 	};

// 	const handleEventDrop = (eventDropInfo) => {
// 		const { id, title, allDay, start, end, extendedProps } = eventDropInfo.event;
// 		updateEvent({
// 			id,
// 			title,
// 			allDay,
// 			start: start?.toISOString() ?? '',
// 			end: end?.toISOString() ?? '',
// 			extendedProps
// 		});
// 	};

// 	const handleEventClick = (clickInfo) => {
// 		clickInfo.jsEvent.preventDefault();
// 		dispatch(openEditEventDialog(clickInfo));
// 	};

// 	const handleEventAdd = (addInfo) => {
// 		console.info('Event Added:', addInfo);
// 	};

// 	const handleEventChange = (changeInfo) => {
// 		console.info('Event Changed:', changeInfo);
// 	};

// 	const handleEventRemove = (removeInfo) => {
// 		console.info('Event Removed:', removeInfo);
// 	};

// 	function handleToggleLeftSidebar() {
// 		setLeftSidebarOpen(!leftSidebarOpen);
// 	}

// 	const computeInitialDate = () => {
// 		const now = new Date();
// 		return new Date(now.getFullYear(), now.getMonth(), 1);
// 	};

// 	if (isLoading) {
// 		return <FuseLoading />;
// 	}

// 	const handleDates = (rangeInfo) => {
// 		setCurrentDate(rangeInfo);

// 		const startDate = new Date(rangeInfo.startStr);
// 		setYearMonth({
// 			year: startDate.getFullYear().toString(),
// 			month: (startDate.getMonth() + 1).toString().padStart(2, '0')
// 		});
// 	};

// 	return (
// 		<>
// 			<Root
// 				header={
// 					<CalendarHeader
// 						calendarRef={calendarRef}
// 						currentDate={currentDate}
// 						onToggleLeftSidebar={handleToggleLeftSidebar}
// 						yearMonth={yearMonth}
// 					/>
// 				}
// 				content={
// 					<FullCalendar
// 						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// 						headerToolbar={false}
// 						initialView="dayGridMonth"
// 						editable
// 						selectable
// 						selectMirror
// 						dayMaxEvents
// 						weekends
// 						datesSet={handleDates}
// 						select={handleDateSelect}
// 						eventSources={[{ events }]}
// 						eventContent={(eventInfo) => {
// 							console.log('data_get', eventInfo.event.title);
// 							const eventIndex = eventInfo.event.id % colors.length;
// 							const eventColor = colors[eventIndex];

// 							return (
// 								<div
// 									style={{
// 										color: 'white',
// 										backgroundColor: eventColor,
// 										padding: '10px',
// 										borderRadius: '3px',
// 										width: '160px'
// 									}}
// 								>
// 									<strong>{eventInfo.event.title}</strong>
// 								</div>
// 							);
// 						}}
// 						eventClick={handleEventClick}
// 						eventAdd={handleEventAdd}
// 						eventChange={handleEventChange}
// 						eventRemove={handleEventRemove}
// 						eventDrop={handleEventDrop}
// 						initialDate={computeInitialDate()}
// 						ref={calendarRef}
// 					/>
// 				}
// 				leftSidebarContent={<CalendarAppSidebar yearMonth={yearMonth} />}
// 				leftSidebarOpen={leftSidebarOpen}
// 				leftSidebarOnClose={() => setLeftSidebarOpen(false)}
// 			/>
// 			{/* <EventDialog /> */}
// 		</>
// 	);
// }

// export default withReducer('calendarApp', reducer)(CalendarApp);

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
import { openEditEventDialog, openNewEventDialog } from './store/eventDialogSlice';
import CalendarAppSidebar from './CalendarAppSidebar';
import { useGetCalendarEventsQuery, useUpdateCalendarEventMutation } from './CalendarApi';
import reducer from './store';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& a': {
		color: `${theme.palette.text.primary}!important`,
		textDecoration: 'none!important'
	},
	'& .fc-media-screen': {
		minHeight: '100%',
		width: '100%'
	},
	'& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
		borderColor: `${theme.palette.divider}!important`
	},
	'& .fc-scrollgrid-section > td': {
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
	'& .fc-view': {
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

function CalendarApp(props) {
	const { searchKey } = props;
	const [currentDate, setCurrentDate] = useState();
	const dispatch = useAppDispatch();
	const [yearMonth, setYearMonth] = useState(() => {
		const now = new Date();
		return {
			year: now.getFullYear().toString(),
			month: (now.getMonth() + 1).toString().padStart(2, '0')
		};
	});
	const { data, isLoading, refetch } = useGetCalendarEventsQuery(
		{ ...yearMonth, searchKey },
		{ refetchOnMountOrArgChange: true }
	);

	const calendarRef = useRef(null);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [updateEvent] = useUpdateCalendarEventMutation();
	const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		refetch();
	}, [yearMonth, searchKey, refetch]);

	const events =
		data?.todo_tasks?.map((task) => ({
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
		console.log('Events:', events); // Debugging output to check events

		if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi();
			calendarApi.removeAllEvents();
			calendarApi.addEventSource(events);
		}
	}, [events]);

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

	const handleEventAdd = (addInfo) => {
		console.info('Event Added:', addInfo);
	};

	const handleEventChange = (changeInfo) => {
		console.info('Event Changed:', changeInfo);
	};

	const handleEventRemove = (removeInfo) => {
		console.info('Event Removed:', removeInfo);
	};

	function handleToggleLeftSidebar() {
		setLeftSidebarOpen(!leftSidebarOpen);
	}

	const computeInitialDate = () => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	const handleDates = (rangeInfo) => {
		setCurrentDate(rangeInfo);

		const startDate = new Date(rangeInfo.startStr);
		setYearMonth({
			year: startDate.getFullYear().toString(),
			month: (startDate.getMonth() + 1).toString().padStart(2, '0')
		});
	};

	return (
		<>
			<Root
				header={
					<CalendarHeader
						calendarRef={calendarRef}
						currentDate={currentDate}
						onToggleLeftSidebar={handleToggleLeftSidebar}
						yearMonth={yearMonth}
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
						eventSources={[{ events }]}
						eventContent={(eventInfo) => {
							const eventIndex = eventInfo.event.id % colors.length;
							const eventColor = colors[eventIndex];

							console.log('Event Title:', eventInfo.event.title); // Logging within eventContent

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
						style={{ height: '100vh', width: '100%' }} // Ensure visibility
					/>
				}
				leftSidebarContent={<CalendarAppSidebar yearMonth={yearMonth} />}
				leftSidebarOpen={leftSidebarOpen}
				leftSidebarOnClose={() => setLeftSidebarOpen(false)}
			/>
			{/* <EventDialog /> */}
		</>
	);
}

export default withReducer('calendarApp', reducer)(CalendarApp);
