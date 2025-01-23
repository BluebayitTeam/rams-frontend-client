import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { MOFA_FILTER_SAUDI_BY } from 'src/app/constant/constants';

export const addTagTypes = ['mofaSaudiReports'];
const MofaSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMofaSaudiReports: build.query({
        query: (filterData) => ({
          url: MOFA_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['mofaSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MofaSaudiReportApi;
export const { useGetMofaSaudiReportsQuery } = MofaSaudiReportApi;

export const selectFilteredMofaSaudiReports = (mofaSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return mofaSaudiReports;
    }

    return FuseUtils.filterArrayByString(mofaSaudiReports, searchText);
  });
