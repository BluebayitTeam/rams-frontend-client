import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { TRAINING_FILTER_SAUDI_BY } from 'src/app/constant/constants';

export const addTagTypes = ['traningSaudiReports'];
const TraningSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTraningSaudiReports: build.query({
        query: (filterData) => ({
          url: TRAINING_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['traningSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TraningSaudiReportApi;
export const { useGetTraningSaudiReportsQuery } = TraningSaudiReportApi;

export const selectFilteredTraningSaudiReports = (traningSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return traningSaudiReports;
    }

    return FuseUtils.filterArrayByString(traningSaudiReports, searchText);
  });
