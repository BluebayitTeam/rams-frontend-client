import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['repatriationMalaysiaReports'];
const RepatriationMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getRepatriationMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['repatriationMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default RepatriationMalaysiaReportApi;
export const { useGetRepatriationMalaysiaReportsQuery } =
  RepatriationMalaysiaReportApi;

export const selectFilteredRepatriationMalaysiaReports = (
  repatriationMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return repatriationMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      repatriationMalaysiaReports,
      searchText
    );
  });
