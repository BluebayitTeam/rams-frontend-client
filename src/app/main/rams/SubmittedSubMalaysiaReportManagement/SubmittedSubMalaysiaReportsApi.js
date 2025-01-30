import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['submittedsubMalaysiaReports'];
const SubmittedSubMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSubmittedSubMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['submittedsubMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SubmittedSubMalaysiaReportApi;
export const { useGetSubmittedSubMalaysiaReportsQuery } =
  SubmittedSubMalaysiaReportApi;

export const selectFilteredSubmittedSubMalaysiaReports = (
  submittedsubMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return submittedsubMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      submittedsubMalaysiaReports,
      searchText
    );
  });
