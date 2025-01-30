import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['submittedforpermissionMalaysiaReports'];
const SubmittedForPermissionMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSubmittedForPermissionMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['submittedforpermissionMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SubmittedForPermissionMalaysiaReportApi;
export const { useGetSubmittedForPermissionMalaysiaReportsQuery } =
  SubmittedForPermissionMalaysiaReportApi;

export const selectFilteredSubmittedForPermissionMalaysiaReports = (
  submittedforpermissionMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return submittedforpermissionMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      submittedforpermissionMalaysiaReports,
      searchText
    );
  });
