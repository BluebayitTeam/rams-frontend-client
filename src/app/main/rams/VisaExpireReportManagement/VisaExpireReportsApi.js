import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
  GET_EXPIRABLE_VISA_NOTOFICATION_REPORT,
  GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG,
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
  GET_UPCOMING_MEDICAL_COUNT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['visaExpireReports'];
const VisaExpireReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaExpireReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['visaExpireReports'],
      }),
      getVisaExpireAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['visaExpireReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaExpireReportApi;
export const { useGetVisaExpireReportsQuery, useGetVisaExpireAllReportsQuery } =
  VisaExpireReportApi;

export const selectFilteredVisaExpireReports = (visaExpireReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaExpireReports;
    }

    return FuseUtils.filterArrayByString(visaExpireReports, searchText);
  });
