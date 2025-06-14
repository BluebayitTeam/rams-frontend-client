import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import {
  FILTER_EMPLOYEE_ATTENDANCE_REPORT_WORKED_HOURS,
  FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bbitAttendanceSummaryReports'];
const AttendanceSumarysReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getBBITAttendanceSumarysReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_ATTENDANCE_REPORT_WORKED_HOURS,
          params: filterData,
        }),
        providesTags: ['bbitAttendanceSummaryReports'],
      }),
      getBBITAttendanceSumarysAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['bbitAttendanceSummaryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default AttendanceSumarysReportApi;
export const {
  useGetBBITAttendanceSumarysReportsQuery,
  useGetBBITAttendanceSumarysAllReportsQuery,
} = AttendanceSumarysReportApi;

export const selectFilteredAttendanceSumarysReports = (
  attendancesumarysReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return attendancesumarysReports;
    }

    return FuseUtils.filterArrayByString(attendancesumarysReports, searchText);
  });
