import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import {
  FILTER_BBIT_EMPLOYEE_ATTENDANCE_REPORT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bbitattendanceReports'];
const BbitEmployeeAttendanceReportsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getBBITEmployeeAttendanceReports: build.query({
        query: (filterData) => ({
          url: FILTER_BBIT_EMPLOYEE_ATTENDANCE_REPORT,
          params: filterData,
        }),
        providesTags: ['bbitAttendanceReports'],
      }),
      getBBITEmployeeAttendanceAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_BBIT_EMPLOYEE_ATTENDANCE_REPORT,
          params: filterData,
        }),
        providesTags: ['bbitAttendanceReports'],
      }),
    }),
    overrideExisting: false,
  });
export default BbitEmployeeAttendanceReportsApi;
export const {
  useGetBBITEmployeeAttendanceReportsQuery,
  useGetBBITEmployeeAttendanceAllReportsQuery,
} = BbitEmployeeAttendanceReportsApi;

export const selectFilteredAttendanceReportsReports = (
  attendancereportsReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return attendancereportsReports;
    }

    return FuseUtils.filterArrayByString(attendancereportsReports, searchText);
  });
