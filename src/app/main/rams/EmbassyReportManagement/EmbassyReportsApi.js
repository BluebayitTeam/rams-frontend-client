import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  EMBASSY_FILTER_BY,
  EMBASSY_FILTER_WITHOUT_PG,
  GET_DEPARTMENT_BY_ID,
  MEDICAL_FILTER_BY,
  MEDICAL_FILTER_WITHOUT_PG,
  PASSENGER_FILTER_BY,
  PASSENGER_FILTER_WITHOUT_PG,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['embassyReports'];
const EmbassyReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEmbassyReports: build.query({
        query: (filterData) => ({
          url: EMBASSY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['embassyReports'],
      }),
      getEmbassyAllReports: build.query({
        query: (filterData) => ({
          url: EMBASSY_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['embassyReports'],
      }),
      deleteEmbassyReports: build.mutation({
        query: (embassyReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: embassyReportIds },
        }),
        invalidatesTags: ['embassyReports'],
      }),
      getEmbassyReport: build.query({
        query: (embassyReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${embassyReportId}`,
        }),
        providesTags: ['embassyReports'],
      }),
      createEmbassyReport: build.mutation({
        query: (newEmbassyReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newEmbassyReport),
        }),
        invalidatesTags: ['embassyReports'],
      }),
      updateEmbassyReport: build.mutation({
        query: (embassyReport) => ({
          url: `${UPDATE_DEPARTMENT}${embassyReport.id}`,
          method: 'PUT',
          data: jsonToFormData(embassyReport),
        }),
        invalidatesTags: ['embassyReports'],
      }),
      deleteEmbassyReport: build.mutation({
        query: (embassyReportId) => ({
          url: `${DELETE_DEPARTMENT}${embassyReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['embassyReports'],
      }),
    }),
    overrideExisting: false,
  });
export default EmbassyReportApi;
export const {
  useGetEmbassyReportsQuery,
  useGetEmbassyAllReportsQuery,
  useDeleteEmbassyReportsMutation,
  useGetEmbassyReportQuery,
  useUpdateEmbassyReportMutation,
  useDeleteEmbassyReportMutation,
  useCreateEmbassyReportMutation,
} = EmbassyReportApi;

export const selectFilteredEmbassyReports = (embassyReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return embassyReports;
    }

    return FuseUtils.filterArrayByString(embassyReports, searchText);
  });
