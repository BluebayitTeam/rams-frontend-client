import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  RECEIPT_FILTER_BY,
  RECEIPT_FILTER_WITHOUT_PG,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['activityLogReports'];
const ActivityLogReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getActivityLogReports: build.query({
        query: (filterData) => ({
          url: RECEIPT_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['activityLogReports'],
      }),
      getActivityLogAllReports: build.query({
        query: (filterData) => ({
          url: RECEIPT_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['activityLogReports'],
      }),
      deleteActivityLogReports: build.mutation({
        query: (activityLogReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: activityLogReportIds },
        }),
        invalidatesTags: ['activityLogReports'],
      }),
      getActivityLogReport: build.query({
        query: (activityLogReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${activityLogReportId}`,
        }),
        providesTags: ['activityLogReports'],
      }),
      createActivityLogReport: build.mutation({
        query: (newActivityLogReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newActivityLogReport),
        }),
        invalidatesTags: ['activityLogReports'],
      }),
      updateActivityLogReport: build.mutation({
        query: (activityLogReport) => ({
          url: `${UPDATE_DEPARTMENT}${activityLogReport.id}`,
          method: 'PUT',
          data: jsonToFormData(activityLogReport),
        }),
        invalidatesTags: ['activityLogReports'],
      }),
      deleteActivityLogReport: build.mutation({
        query: (activityLogReportId) => ({
          url: `${DELETE_DEPARTMENT}${activityLogReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['activityLogReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ActivityLogReportApi;
export const {
  useGetActivityLogReportsQuery,
  useGetActivityLogAllReportsQuery,
  useDeleteActivityLogReportsMutation,
  useGetActivityLogReportQuery,
  useUpdateActivityLogReportMutation,
  useDeleteActivityLogReportMutation,
  useCreateActivityLogReportMutation,
} = ActivityLogReportApi;

export const selectFilteredActivityLogReports = (activityLogReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return activityLogReports;
    }

    return FuseUtils.filterArrayByString(activityLogReports, searchText);
  });
