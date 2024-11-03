import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  ACCOUNTSTATEMENT_FILTER_BY,
  ACCOUNTSTATEMENT_FILTER_WITHOUT_PG,
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_COMPANY_OVERVIEW_REPORT,
  GET_COMPANY_OVERVIEW_REPORT_WITHOUT_PG,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['companyOverviewReports'];
const CompanyOverviewReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCompanyOverviewReports: build.query({
        query: (filterData) => ({
          url: GET_COMPANY_OVERVIEW_REPORT,
          params: filterData,
        }),
        providesTags: ['companyOverviewReports'],
      }),
      getCompanyOverviewAllReports: build.query({
        query: (filterData) => ({
          url: GET_COMPANY_OVERVIEW_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['companyOverviewReports'],
      }),
    }),
    overrideExisting: false,
  });
export default CompanyOverviewReportApi;
export const {
  useGetCompanyOverviewReportsQuery,
  useGetCompanyOverviewAllReportsQuery,
} = CompanyOverviewReportApi;

export const selectFilteredCompanyOverviewReports = (companyOverviewReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return companyOverviewReports;
    }

    return FuseUtils.filterArrayByString(companyOverviewReports, searchText);
  });
