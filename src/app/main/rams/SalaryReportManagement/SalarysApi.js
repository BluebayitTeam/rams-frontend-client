import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  FILTER_EMPLOYEE_SALARY_REPORT,
  FILTER_EMPLOYEE_SALARY_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['salaryReports'];
const SalaryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSalaryReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_REPORT,
          params: filterData,
        }),
        providesTags: ['salaryReports'],
      }),
      getSalaryAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['salaryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SalaryReportApi;
export const { useGetSalaryReportsQuery, useGetSalaryAllReportsQuery } =
  SalaryReportApi;

export const selectFilteredSalaryReports = (salaryReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return salaryReports;
    }

    return FuseUtils.filterArrayByString(salaryReports, searchText);
  });
