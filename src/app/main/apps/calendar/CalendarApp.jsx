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
import { useSelector } from 'react-redux';
import CalendarHeader from './CalendarHeader';
import EventDialog from './dialogs/event/EventDialog';
import { openEditEventDialog, openNewEventDialog } from './store/eventDialogSlice';
import CalendarAppSidebar from './CalendarAppSidebar';
import CalendarAppEventContent from './CalendarAppEventContent';
import { useGetCalendarEventsQuery, useUpdateCalendarEventMutation } from './CalendarApi';
import reducer from './store';
import { selectSelectedLabels } from './store/selectedLabelsSlice';

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
function CalendarApp() {
	const [currentDate, setCurrentDate] = useState();
	const selectedLabels = useSelector(selectSelectedLabels);
	const dispatch = useAppDispatch();
	const getMonthYearFromTitle = (title) => {
		if (!title) return { month: '', year: '' };

		const monthYearMapping = {
			January: 1,
			February: 2,
			March: 3,
			April: 4,
			May: 5,
			June: 6,
			July: 7,
			August: 8,
			September: 9,
			October: 10,
			November: 11,
			December: 12
		};

		const [monthName, year] = title.split(' ');
		const month = monthYearMapping[monthName];

		return {
			month,
			year: parseInt(year, 10) // Ensure year is a number
		};
	};

	// Get month and year from currentDate.view.title
	const { month, year } = getMonthYearFromTitle(currentDate?.view?.title);

	const { data: events, isLoading } = useGetCalendarEventsQuery({
		month,
		year,
		selectedLabels
	});

	const calendarRef = useRef(null);
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [updateEvent] = useUpdateCalendarEventMutation();
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);
	useEffect(() => {
		// Correct calendar dimentions after sidebar toggles
		setTimeout(() => {
			calendarRef.current?.getApi()?.updateSize();
		}, 300);
	}, [leftSidebarOpen]);
	const handleDateSelect = (selectInfo) => {
		dispatch(openNewEventDialog(selectInfo));
	};
	const todayDate = new Date();
	const today = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

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
		// eslint-disable-next-line no-console
		console.info(addInfo);
	};
	const handleEventChange = (changeInfo) => {
		// eslint-disable-next-line no-console
		console.info(changeInfo);
	};
	const handleEventRemove = (removeInfo) => {
		// eslint-disable-next-line no-console
		console.info(removeInfo);
	};

	function handleToggleLeftSidebar() {
		setLeftSidebarOpen(!leftSidebarOpen);
	}

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
						// eslint-disable-next-line react/no-unstable-nested-components
						eventContent={(eventInfo) => <CalendarAppEventContent eventInfo={eventInfo} />}
						eventClick={handleEventClick}
						eventAdd={handleEventAdd}
						eventChange={handleEventChange}
						eventRemove={handleEventRemove}
						eventDrop={handleEventDrop}
						initialDate={today}
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
