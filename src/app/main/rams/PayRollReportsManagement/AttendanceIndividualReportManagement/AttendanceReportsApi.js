import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import {
  FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
  FILTER_INDIVIDUAL_EMPLOYEE_ATTENDANCE_REPORT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['attendancereportsReports'];
const AttendanceReportsReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAttendanceReportsReports: build.query({
        query: (filterData) => ({
          url: FILTER_INDIVIDUAL_EMPLOYEE_ATTENDANCE_REPORT,
          params: filterData,
        }),
        providesTags: ['attendancereportsReports'],
      }),
      getAttendanceReportsAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['attendancereportsReports'],
      }),
    }),
    overrideExisting: false,
  });
export default AttendanceReportsReportApi;
export const {
  useGetAttendanceReportsReportsQuery,
  useGetAttendanceReportsAllReportsQuery,
} = AttendanceReportsReportApi;

export const selectFilteredAttendanceReportsReports = (
  attendancereportsReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return attendancereportsReports;
    }

    return FuseUtils.filterArrayByString(attendancereportsReports, searchText);
  });
