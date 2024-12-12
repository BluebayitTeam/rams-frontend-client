import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  ALL_USERS,
  CREATE_CLIENT,
  GET_CLIENTS,
  GET_REPORT_COLUMN_BY_ID,
  UPDATE_REPORT_COLUMN,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ReportClmModel from './passengerSummaryUpdateClm/models/PassengerSummaryUpdateClmModel';

export const addTagTypes = ['reportClms'];
const ReportClmApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getReportClms: build.query({
        query: () => ({ url: GET_CLIENTS }),
        providesTags: ['reportClms'],
      }),

      deleteReportClms: build.mutation({
        query: (reportClmIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: reportClmIds,
        }),
        invalidatesTags: ['reportClms'],
      }),

      getReportClm: build.query({
        query: (reportClmId) => ({
          url: `${GET_REPORT_COLUMN_BY_ID}${reportClmId}`,
        }),
        providesTags: ['reportClms'],
      }),
      updateReportClm: build.mutation({
        query: (data) => ({
          url: `${UPDATE_REPORT_COLUMN}${data?.type}`,
          method: 'PUT',
          data,
        }),

        invalidatesTags: ['reportClms'],
      }),
      createReportClm: build.mutation({
        query: (newReportClm) => ({
          url: CREATE_CLIENT,
          method: 'POST',
          data: jsonToFormData(ReportClmModel(newReportClm)),
        }),
        invalidatesTags: ['reportClms'],
      }),
    }),
    overrideExisting: false,
  });
export default ReportClmApi;
export const {
  useGetReportClmsQuery,
  useDeleteReportClmsMutation,
  useGetReportClmQuery,
  useUpdateReportClmMutation,
  useDeleteReportClmMutation,
  useCreateReportClmMutation,
} = ReportClmApi;

export const selectFilteredReportClms = (reportClms) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return reportClms;
    }

    return FuseUtils.filterArrayByString(reportClms, searchText);
  });
