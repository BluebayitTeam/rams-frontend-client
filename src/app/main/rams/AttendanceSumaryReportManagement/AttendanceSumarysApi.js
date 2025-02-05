import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  FILTER_ATTENDANCE_REPORT,
  FILTER_EMPLOYEE_SALARY_SLIP_REPORT,
  FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['attendancesumarysReports'];
const AttendanceSumarysReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAttendanceSumarysReports: build.query({
        query: (filterData) => ({
          url: FILTER_ATTENDANCE_REPORT,
          params: filterData,
        }),
        providesTags: ['attendancesumarysReports'],
      }),
      getAttendanceSumarysAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['attendancesumarysReports'],
      }),
    }),
    overrideExisting: false,
  });
export default AttendanceSumarysReportApi;
export const {
  useGetAttendanceSumarysReportsQuery,
  useGetAttendanceSumarysAllReportsQuery,
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
