import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_EXPIRABLE_EVISA_NOTOFICATION_REPORT,
  GET_EXPIRABLE_EVISA_NOTOFICATION_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['evisaExpireReports'];
const EvisaExpireReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEvisaExpireReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_EVISA_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['evisaExpireReports'],
      }),
      getEvisaExpireAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_EVISA_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['evisaExpireReports'],
      }),
    }),
    overrideExisting: false,
  });
export default EvisaExpireReportApi;
export const {
  useGetEvisaExpireReportsQuery,
  useGetEvisaExpireAllReportsQuery,
} = EvisaExpireReportApi;

export const selectFilteredEvisaExpireReports = (evisaExpireReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return evisaExpireReports;
    }

    return FuseUtils.filterArrayByString(evisaExpireReports, searchText);
  });
