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

export const addTagTypes = ['passengerSummaryUpdateClms'];
const ReportClmApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getReportClms: build.query({
        query: () => ({ url: GET_CLIENTS }),
        providesTags: ['passengerSummaryUpdateClms'],
      }),

      deleteReportClms: build.mutation({
        query: (passengerSummaryUpdateClmIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: passengerSummaryUpdateClmIds,
        }),
        invalidatesTags: ['passengerSummaryUpdateClms'],
      }),

      getReportClm: build.query({
        query: (passengerSummaryUpdateClmId) => ({
          url: `${GET_REPORT_COLUMN_BY_ID}${passengerSummaryUpdateClmId}`,
        }),
        providesTags: ['passengerSummaryUpdateClms'],
      }),
      updateReportClm: build.mutation({
        query: (data) => ({
          url: `${UPDATE_REPORT_COLUMN}${data?.type}`,
          method: 'PUT',
          data,
        }),

        invalidatesTags: ['passengerSummaryUpdateClms'],
      }),
      createReportClm: build.mutation({
        query: (newReportClm) => ({
          url: CREATE_CLIENT,
          method: 'POST',
          data: jsonToFormData(ReportClmModel(newReportClm)),
        }),
        invalidatesTags: ['passengerSummaryUpdateClms'],
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

export const selectFilteredReportClms = (passengerSummaryUpdateClms) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerSummaryUpdateClms;
    }

    return FuseUtils.filterArrayByString(passengerSummaryUpdateClms, searchText);
  });
