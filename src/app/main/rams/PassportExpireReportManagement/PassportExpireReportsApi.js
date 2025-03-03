import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_NOTOFICATION_PASSPORT,
  GET_NOTOFICATION_PASSPORT_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['passportExpireReports'];
const PassportExpireReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassportExpireReports: build.query({
        query: (filterData) => ({
          url: GET_NOTOFICATION_PASSPORT,
          params: filterData,
        }),
        providesTags: ['passportExpireReports'],
      }),
      getPassportExpireAllReports: build.query({
        query: (filterData) => ({
          url: GET_NOTOFICATION_PASSPORT_WP,
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
