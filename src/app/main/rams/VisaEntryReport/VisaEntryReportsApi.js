import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  VISA_ENTRY_FILTER_BY,
  VISA_ENTRY_FILTER_BY_WP,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['visaEntryReports'];
const VisaEntryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaEntryReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['visaEntryReports'],
      }),
      getVisaEntryAllReports: build.query({
        query: (filterData) => ({
          url: VISA_ENTRY_FILTER_BY_WP,
          params: filterData,
        }),
        providesTags: ['visaEntryReports'],
      }),
      deleteVisaEntryReports: build.mutation({
        query: (visaEntryReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: visaEntryReportIds },
        }),
        invalidatesTags: ['visaEntryReports'],
      }),
      getVisaEntryReport: build.query({
        query: (visaEntryReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${visaEntryReportId}`,
        }),
        providesTags: ['visaEntryReports'],
      }),
      createVisaEntryReport: build.mutation({
        query: (newVisaEntryReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newVisaEntryReport),
        }),
        invalidatesTags: ['visaEntryReports'],
      }),
      updateVisaEntryReport: build.mutation({
        query: (visaEntryReport) => ({
          url: `${UPDATE_DEPARTMENT}${visaEntryReport.id}`,
          method: 'PUT',
          data: jsonToFormData(visaEntryReport),
        }),
        invalidatesTags: ['visaEntryReports'],
      }),
      deleteVisaEntryReport: build.mutation({
        query: (visaEntryReportId) => ({
          url: `${DELETE_DEPARTMENT}${visaEntryReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['visaEntryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaEntryReportApi;
export const {
  useGetVisaEntryReportsQuery,
  useGetVisaEntryAllReportsQuery,
  useDeleteVisaEntryReportsMutation,
  useGetVisaEntryReportQuery,
  useUpdateVisaEntryReportMutation,
  useDeleteVisaEntryReportMutation,
  useCreateVisaEntryReportMutation,
} = VisaEntryReportApi;

export const selectFilteredVisaEntryReports = (visaEntryReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaEntryReports;
    }

    return FuseUtils.filterArrayByString(visaEntryReports, searchText);
  });
