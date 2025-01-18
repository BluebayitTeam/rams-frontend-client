import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  GET_VISA_STAMP_OK_LIST,
  GET_VISA_STAMP_OK_LIST_WITHOUT_PG,
  GET_VISA_STAMP_WAITING_LIST,
  PASSENGER_STATUS_OVERVIEW_FILTER_BY,
  PASSENGER_STATUS_OVERVIEW_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['visaStatusReports'];
const VisaStatusReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaStatusReports: build.query({
        query: (filterData) => ({
          url: GET_VISA_STAMP_WAITING_LIST,
          params: filterData,
        }),
        providesTags: ['visaStatusReports'],
      }),
      getVisaStatusAllReports: build.query({
        query: (filterData) => ({
          url: GET_VISA_STAMP_OK_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['visaStatusReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaStatusReportApi;
export const { useGetVisaStatusReportsQuery, useGetVisaStatusAllReportsQuery } =
  VisaStatusReportApi;

export const selectFilteredVisaStatusReports = (visaStatusReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaStatusReports;
    }

    return FuseUtils.filterArrayByString(visaStatusReports, searchText);
  });
