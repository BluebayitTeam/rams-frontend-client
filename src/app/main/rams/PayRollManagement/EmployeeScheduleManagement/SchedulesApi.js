import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_SCHEDULE,
	DELETE_SCHEDULE,
	GET_SCHEDULE,
	GET_SCHEDULES,
	UPDATE_SCHEDULE
} from 'src/app/constant/constants';
import ScheduleModel from './schedule/models/ScheduleModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['schedules'];
const ScheduleApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSchedules: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_SCHEDULES, params: { page, size, searchKey } }),
				providesTags: ['schedules']
			}),
			deleteSchedules: build.mutation({
				query: (scheduleIds) => ({
					url: DELETE_SCHEDULE,
					method: 'DELETE',
					data: { ids: scheduleIds }
				}),
				invalidatesTags: ['schedules']
			}),
			getSchedule: build.query({
				query: (scheduleId) => ({
					url: `${GET_SCHEDULE}${scheduleId}`
				}),
				providesTags: ['schedules']
			}),
			createSchedule: build.mutation({
				query: (newSchedule) => ({
					url: CREATE_SCHEDULE,
					method: 'POST',
					data: jsonToFormData(ScheduleModel(newSchedule))
				}),
				invalidatesTags: ['schedules']
			}),
			updateSchedule: build.mutation({
				query: (schedule) => ({
					url: `${UPDATE_SCHEDULE}${schedule.id}`,
					method: 'PUT',
					data: jsonToFormData(schedule)
				}),
				invalidatesTags: ['schedules']
			}),
			deleteSchedule: build.mutation({
				query: (scheduleId) => ({
					url: `${DELETE_SCHEDULE}${scheduleId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['schedules']
			})
		}),
		overrideExisting: false
	});
export default ScheduleApi;
export const {
	useGetSchedulesQuery,
	useDeleteSchedulesMutation,
	useGetScheduleQuery,
	useUpdateScheduleMutation,
	useDeleteScheduleMutation,
	useCreateScheduleMutation
} = ScheduleApi;

export const selectFilteredSchedules = (schedules) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return schedules;
		}

		return FuseUtils.filterArrayByString(schedules, searchText);
	});
