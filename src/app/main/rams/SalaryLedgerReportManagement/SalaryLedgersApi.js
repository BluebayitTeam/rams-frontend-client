import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  FILTER_EMPLOYEE_SALARY_LEDGER_REPORT,
  FILTER_EMPLOYEE_SALARY_LEDGER_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['salaryledgerReports'];
const SalaryLedgerReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSalaryLedgerReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_LEDGER_REPORT,
          params: filterData,
        }),
        providesTags: ['salaryledgerReports'],
      }),
      getSalaryLedgerAllReports: build.query({
        query: (filterData) => ({
          url: FILTER_EMPLOYEE_SALARY_LEDGER_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['salaryledgerReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SalaryLedgerReportApi;
export const {
  useGetSalaryLedgerReportsQuery,
  useGetSalaryLedgerAllReportsQuery,
  useDeleteSalaryLedgerReportsMutation,
  useGetSalaryLedgerReportQuery,
  useUpdateSalaryLedgerReportMutation,
  useDeleteSalaryLedgerReportMutation,
  useCreateSalaryLedgerReportMutation,
} = SalaryLedgerReportApi;

export const selectFilteredSalaryLedgerReports = (salaryledgerReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return salaryledgerReports;
    }

    return FuseUtils.filterArrayByString(salaryledgerReports, searchText);
  });
