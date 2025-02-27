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

export const addTagTypes = ['passportExpireReports'];
const PassportExpireReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassportExpireReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['passportExpireReports'],
      }),
      getPassportExpireAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passportExpireReports'],
      }),
    }),
    overrideExisting: false,
  });
export default PassportExpireReportApi;
export const {
  useGetPassportExpireReportsQuery,
  useGetPassportExpireAllReportsQuery,
} = PassportExpireReportApi;

export const selectFilteredPassportExpireReports = (passportExpireReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passportExpireReports;
    }

    return FuseUtils.filterArrayByString(passportExpireReports, searchText);
  });
