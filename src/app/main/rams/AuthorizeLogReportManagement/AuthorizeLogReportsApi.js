import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  AGENT_FILTER_BY,
  AGENT_FILTER_WITHOUT_PG,
  AUTHORIZE_LOG_FILTER_BY,
  AUTHORIZE_LOG_FILTER_BY_WP,
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['authorizeLogReports'];
const AuthorizeLogReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAuthorizeLogReports: build.query({
        query: (filterData) => ({
          url: AUTHORIZE_LOG_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['authorizeLogReports'],
      }),
      getAuthorizeLogAllReports: build.query({
        query: (filterData) => ({
          url: AUTHORIZE_LOG_FILTER_BY_WP,
          params: filterData,
        }),
        providesTags: ['authorizeLogReports'],
      }),
      deleteAuthorizeLogReports: build.mutation({
        query: (authorizeLogReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: authorizeLogReportIds },
        }),
        invalidatesTags: ['authorizeLogReports'],
      }),
      getAuthorizeLogReport: build.query({
        query: (authorizeLogReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${authorizeLogReportId}`,
        }),
        providesTags: ['authorizeLogReports'],
      }),
      createAuthorizeLogReport: build.mutation({
        query: (newAuthorizeLogReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newAuthorizeLogReport),
        }),
        invalidatesTags: ['authorizeLogReports'],
      }),
      updateAuthorizeLogReport: build.mutation({
        query: (authorizeLogReport) => ({
          url: `${UPDATE_DEPARTMENT}${authorizeLogReport.id}`,
          method: 'PUT',
          data: jsonToFormData(authorizeLogReport),
        }),
        invalidatesTags: ['authorizeLogReports'],
      }),
      deleteAuthorizeLogReport: build.mutation({
        query: (authorizeLogReportId) => ({
          url: `${DELETE_DEPARTMENT}${authorizeLogReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['authorizeLogReports'],
      }),
    }),
    overrideExisting: false,
  });
export default AuthorizeLogReportApi;
export const {
  useGetAuthorizeLogReportsQuery,
  useGetAuthorizeLogAllReportsQuery,
  useDeleteAuthorizeLogReportsMutation,
  useGetAuthorizeLogReportQuery,
  useUpdateAuthorizeLogReportMutation,
  useDeleteAuthorizeLogReportMutation,
  useCreateAuthorizeLogReportMutation,
} = AuthorizeLogReportApi;

export const selectFilteredAuthorizeLogReports = (authorizeLogReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return authorizeLogReports;
    }

    return FuseUtils.filterArrayByString(authorizeLogReports, searchText);
  });
