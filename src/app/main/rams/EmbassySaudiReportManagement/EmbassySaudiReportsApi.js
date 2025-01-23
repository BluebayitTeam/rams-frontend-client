import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { EMBASSY_FILTE_SAUDI_BY } from 'src/app/constant/constants';

export const addTagTypes = ['embassySaudiReports'];
const EmbassySaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEmbassySaudiReports: build.query({
        query: (filterData) => ({
          url: EMBASSY_FILTE_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['embassySaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default EmbassySaudiReportApi;
export const { useGetEmbassySaudiReportsQuery } = EmbassySaudiReportApi;

export const selectFilteredEmbassySaudiReports = (embassySaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return embassySaudiReports;
    }

    return FuseUtils.filterArrayByString(embassySaudiReports, searchText);
  });
