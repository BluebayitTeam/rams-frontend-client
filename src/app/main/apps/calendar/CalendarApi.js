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
					// Extract and transform the task types to match the expected label format
					const myColorCode = [
						'#2C3E50',
						'#34495E',
						'#1ABC9C',
						'#16A085',
						'#27AE60',
						'#2ECC71',
						'#3498DB',
						'#2980B9',
						'#9B59B6',
						'#8E44AD',
						'#F39C12',
						'#E67E22',
						'#D35400',
						'#C0392B',
						'#E74C3C',
						'#95A5A6',
						'#7F8C8D',
						'#BDC3C7',
						'#F1C40F',
						'#F4A261',
						'#5D6D7E'
					];

					return response.task_types.map((taskType) => {
						const randomIndex = Math.floor(Math.random() * myColorCode.length);
						return {
							id: taskType.id,
							color: myColorCode[randomIndex], // Assign a random color from the array
							title: taskType.name // Assign the task type name to the title
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
