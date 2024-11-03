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
          url: ACCOUNTSTATEMENT_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['companyOverviewReports'],
      }),
      getCompanyOverviewAllReports: build.query({
        query: (filterData) => ({
          url: ACCOUNTSTATEMENT_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['companyOverviewReports'],
      }),
      deleteCompanyOverviewReports: build.mutation({
        query: (companyOverviewReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: companyOverviewReportIds },
        }),
        invalidatesTags: ['companyOverviewReports'],
      }),
      getCompanyOverviewReport: build.query({
        query: (companyOverviewReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${companyOverviewReportId}`,
        }),
        providesTags: ['companyOverviewReports'],
      }),
      createCompanyOverviewReport: build.mutation({
        query: (newCompanyOverviewReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newCompanyOverviewReport),
        }),
        invalidatesTags: ['companyOverviewReports'],
      }),
      updateCompanyOverviewReport: build.mutation({
        query: (companyOverviewReport) => ({
          url: `${UPDATE_DEPARTMENT}${companyOverviewReport.id}`,
          method: 'PUT',
          data: jsonToFormData(companyOverviewReport),
        }),
        invalidatesTags: ['companyOverviewReports'],
      }),
      deleteCompanyOverviewReport: build.mutation({
        query: (companyOverviewReportId) => ({
          url: `${DELETE_DEPARTMENT}${companyOverviewReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['companyOverviewReports'],
      }),
    }),
    overrideExisting: false,
  });
export default CompanyOverviewReportApi;
export const {
  useGetCompanyOverviewReportsQuery,
  useGetCompanyOverviewAllReportsQuery,
  useDeleteCompanyOverviewReportsMutation,
  useGetCompanyOverviewReportQuery,
  useUpdateCompanyOverviewReportMutation,
  useDeleteCompanyOverviewReportMutation,
  useCreateCompanyOverviewReportMutation,
} = CompanyOverviewReportApi;

export const selectFilteredCompanyOverviewReports = (companyOverviewReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return companyOverviewReports;
    }

    return FuseUtils.filterArrayByString(companyOverviewReports, searchText);
  });
