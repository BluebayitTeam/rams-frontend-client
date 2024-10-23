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
  SEARCH_ACTIVITYLOG,
  SEARCH_ACTIVITYLOG_WP,
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
          url: SEARCH_ACTIVITYLOG,
          params: filterData,
        }),
        providesTags: ['activityLogReports'],
      }),
      getActivityLogAllReports: build.query({
        query: (filterData) => ({
          url: SEARCH_ACTIVITYLOG_WP,
          params: filterData,
        }),
        providesTags: ['activityLogReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ActivityLogReportApi;
export const {
  useGetActivityLogReportsQuery,
  useGetActivityLogAllReportsQuery,
} = ActivityLogReportApi;

export const selectFilteredActivityLogReports = (activityLogReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return activityLogReports;
    }

    return FuseUtils.filterArrayByString(activityLogReports, searchText);
  });
