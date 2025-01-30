import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['medicalMalaysiaReports'];
const MedicalMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['medicalMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalMalaysiaReportApi;
export const { useGetMedicalMalaysiaReportsQuery } = MedicalMalaysiaReportApi;

export const selectFilteredMedicalMalaysiaReports = (medicalMalaysiaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(medicalMalaysiaReports, searchText);
  });
