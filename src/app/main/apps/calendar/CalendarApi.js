import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import { ALL_TODO_TASK, GET_TODOTASKTYPES } from 'src/app/constant/constants';
import FuseUtils from '@fuse/utils/FuseUtils';
import { selectSelectedLabels } from './store/selectedLabelsSlice';

export const addTagTypes = ['calendar_events', 'calendar_event', 'calendar_labels', 'calendar_label'];
const CalendarApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCalendarEvents: build.query({
				query: ({ year, month, searchKey }) => ({
					url: ALL_TODO_TASK,
					params: { year, month, searchKey }
				}),
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
				query: ({ page, size }) => ({ url: GET_TODOTASKTYPES, params: { page, size } }),
				providesTags: ['calendar_labels']
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
	createSelector([selectSelectedLabels], (searchText) => {
		if (searchText?.length === 0) {
			return events;
		}

		return FuseUtils.filterArrayByString(events, searchText);
	});
