import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_ATTENDANCE_TYPE,
	DELETE_ATTENDANCE_TYPE,
	DELETE_ATTENDANCE_TYPE_MULTIPLE,
	GET_ATTENDANCE_TYPES,
	GET_ATTENDANCE_TYPE_BY_ID,
	UPDATE_ATTENDANCE_TYPE
} from 'src/app/constant/constants';
import AttendanceTypeModel from './attendanceType/models/AttendanceTypeModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['attendanceTypes'];
const AttendanceTypeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAttendanceTypes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_ATTENDANCE_TYPES, params: { page, size, searchKey } }),
				providesTags: ['attendanceTypes']
			}),
			deleteAttendanceTypes: build.mutation({
				query: (attendanceTypeIds) => ({
					url: DELETE_ATTENDANCE_TYPE_MULTIPLE,
					method: 'DELETE',
					data: { ids: attendanceTypeIds }
				}),
				invalidatesTags: ['attendanceTypes']
			}),
			getAttendanceType: build.query({
				query: (attendanceTypeId) => ({
					url: `${GET_ATTENDANCE_TYPE_BY_ID}${attendanceTypeId}`
				}),
				providesTags: ['attendanceTypes']
			}),
			createAttendanceType: build.mutation({
				query: (newAttendanceType) => ({
					url: CREATE_ATTENDANCE_TYPE,
					method: 'POST',
					data: jsonToFormData(AttendanceTypeModel(newAttendanceType))
				}),
				invalidatesTags: ['attendanceTypes']
			}),
			updateAttendanceType: build.mutation({
				query: (attendanceType) => ({
					url: `${UPDATE_ATTENDANCE_TYPE}${attendanceType.id}`,
					method: 'PUT',
					data: jsonToFormData(attendanceType)
				}),
				invalidatesTags: ['attendanceTypes']
			}),
			deleteAttendanceType: build.mutation({
				query: (attendanceTypeId) => ({
					url: `${DELETE_ATTENDANCE_TYPE}${attendanceTypeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['attendanceTypes']
			})
		}),
		overrideExisting: false
	});
export default AttendanceTypeApi;
export const {
	useGetAttendanceTypesQuery,
	useDeleteAttendanceTypesMutation,
	useGetAttendanceTypeQuery,
	useUpdateAttendanceTypeMutation,
	useDeleteAttendanceTypeMutation,

	useCreateAttendanceTypeMutation
} = AttendanceTypeApi;

export const selectFilteredAttendanceTypes = (attendanceTypes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return attendanceTypes;
		}

		return FuseUtils.filterArrayByString(attendanceTypes, searchText);
	});
