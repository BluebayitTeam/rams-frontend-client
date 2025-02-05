import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  FILTER_EMPLOYEE_SALARY_SLIP_REPORT,
  FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['salaryslipsReports'];
const SalarySlipsReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSalarySlipsReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_SLIP_REPORT,
          params: filterData,
        }),
        providesTags: ['salaryslipsReports'],
      }),
      getSalarySlipsAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_SLIP_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['salaryslipsReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SalarySlipsReportApi;
export const {
  useGetSalarySlipsReportsQuery,
  useGetSalarySlipsAllReportsQuery,
} = SalarySlipsReportApi;

export const selectFilteredSalarySlipsReports = (salaryslipsReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return salaryslipsReports;
    }

    return FuseUtils.filterArrayByString(salaryslipsReports, searchText);
  });
