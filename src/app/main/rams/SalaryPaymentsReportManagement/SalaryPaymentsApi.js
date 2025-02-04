import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  FILTER_EMPLOYEE_SALARY_PAYMENT_REPORT,
  FILTER_EMPLOYEE_SALARY_PAYMENT_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['salarypaymentsReports'];
const SalaryPaymentsReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSalaryPaymentsReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_PAYMENT_REPORT,
          params: filterData,
        }),
        providesTags: ['salarypaymentsReports'],
      }),
      getSalaryPaymentsAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_PAYMENT_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['salarypaymentsReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SalaryPaymentsReportApi;
export const {
  useGetSalaryPaymentsReportsQuery,
  useGetSalaryPaymentsAllReportsQuery,
} = SalaryPaymentsReportApi;

export const selectFilteredSalaryPaymentsReports = (salarypaymentsReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return salarypaymentsReports;
    }

    return FuseUtils.filterArrayByString(salarypaymentsReports, searchText);
  });
