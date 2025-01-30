import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['handpassportMalaysiaReports'];
const HandPassportMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getHandPassportMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['handpassportMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default HandPassportMalaysiaReportApi;
export const { useGetHandPassportMalaysiaReportsQuery } =
  HandPassportMalaysiaReportApi;

export const selectFilteredHandPassportMalaysiaReports = (
  handpassportMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return handpassportMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      handpassportMalaysiaReports,
      searchText
    );
  });
