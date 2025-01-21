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

export const addTagTypes = ['visaExpireSaudiReports'];
const VisaExpireSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaExpireSaudiReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['visaExpireSaudiReports'],
      }),
      getVisaExpireSaudiAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['visaExpireSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaExpireSaudiReportApi;
export const {
  useGetVisaExpireSaudiReportsQuery,
  useGetVisaExpireSaudiAllReportsQuery,
} = VisaExpireSaudiReportApi;

export const selectFilteredVisaExpireSaudiReports = (visaExpireSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaExpireSaudiReports;
    }

    return FuseUtils.filterArrayByString(visaExpireSaudiReports, searchText);
  });
