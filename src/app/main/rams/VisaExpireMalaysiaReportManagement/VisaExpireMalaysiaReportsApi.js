import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_EXPIRABLE_VISA_NOTOFICATION_REPORT,
  GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['visaExpireMalaysiaReports'];
const VisaExpireMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaExpireMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['visaExpireMalaysiaReports'],
      }),
      getVisaExpireMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_VISA_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['visaExpireMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaExpireMalaysiaReportApi;
export const {
  useGetVisaExpireMalaysiaReportsQuery,
  useGetVisaExpireMalaysiaAllReportsQuery,
} = VisaExpireMalaysiaReportApi;

export const selectFilteredVisaExpireMalaysiaReports = (
  visaExpireMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaExpireMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(visaExpireMalaysiaReports, searchText);
  });
