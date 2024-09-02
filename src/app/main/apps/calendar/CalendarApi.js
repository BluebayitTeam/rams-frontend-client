import { apiService as api } from 'app/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { createSelector } from '@reduxjs/toolkit';
import { ALL_TODO_TASK, GET_TODOTASKTYPES } from 'src/app/constant/constants';
import { selectSelectedLabels, setSelectedLabels } from './store/selectedLabelsSlice';

export const addTagTypes = ['calendar_events', 'calendar_event', 'calendar_labels', 'calendar_label'];
const CalendarApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCalendarEvents: build.query({
				query: ({ year, month, selectedLabels }) => ({
					url: ALL_TODO_TASK,
					params: { year, month, task_type: selectedLabels.join(',') }
				}),
				transformResponse: (response) => {
					// Transform the response data to match the expected format
					return response?.todo_tasks?.map((task) => ({
						id: task.id.toString(),
						title: task.title,
						allDay: false,
						start: task.from_date,
						end: task.to_date,
						extendedProps: {
							desc: task.note || '',
							label: task.task_type.id
						}
					}));
				},
				providesTags: ['calendar_events']
			}),

			createCalendarEvent: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/calendar/events`,
					method: 'POST',
					data: queryArg.Event
				}),
				invalidatesTags: ['calendar_events']
			}),
			updateCalendarEvent: build.mutation({
				query: (Event) => ({
					url: `/mock-api/calendar/events/${Event.id}`,
					method: 'PUT',
					data: Event
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),
			deleteCalendarEvent: build.mutation({
				query: (id) => ({
					url: `/mock-api/calendar/events/${id}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calendar_event', 'calendar_events']
			}),

			getCalendarLabels: build.query({
				query: () => ({ url: GET_TODOTASKTYPES }),
				transformResponse: (response) => {
					return response.task_types.map((taskType) => {
						return {
							id: taskType.id,
							color: taskType?.color || '#161616ff',
							title: taskType.name
						};
					});
				},
				providesTags: ['calendar_labels'],
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						const { data: labels } = await queryFulfilled;
						dispatch(setSelectedLabels(labels.map((item) => item.id)));
					} catch (err) {
						dispatch(showMessage({ message: 'Error loading Labels!' }));
					}
				}
			}),

			createCalendarLabel: build.mutation({
				query: (Label) => {
					return {
						url: `/mock-api/calendar/labels`,
						method: 'POST',
						data: Label
					};
				},
				invalidatesTags: ['calendar_label', 'calendar_labels']
			}),
			updateCalendarLabel: build.mutation({
				query: (Label) => ({
					url: `/mock-api/calendar/labels/${Label.id}`,
					method: 'PUT',
					data: Label
				}),
				invalidatesTags: ['calendar_labels']
			}),
			deleteCalendarLabel: build.mutation({
				query: (id) => ({
					url: `/mock-api/calendar/labels/${id}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calendar_events', 'calendar_labels']
			})
		}),
		overrideExisting: false
	});
export const {
	useGetCalendarEventsQuery,
	useCreateCalendarEventMutation,
	useUpdateCalendarEventMutation,
	useDeleteCalendarEventMutation,
	useGetCalendarLabelsQuery,
	useCreateCalendarLabelMutation,
	useUpdateCalendarLabelMutation,
	useDeleteCalendarLabelMutation
} = CalendarApi;
export default CalendarApi;
export const selectFilteredEvents = (events) =>
	createSelector([selectSelectedLabels], (selectedLabels) => {
		return events.filter((item) => selectedLabels.includes(item?.extendedProps?.label));
	});
