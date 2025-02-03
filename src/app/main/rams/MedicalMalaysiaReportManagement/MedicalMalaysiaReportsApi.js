import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_DASHBOARD_FOR_MALAYSIA,
  MEDICAL_FILTER_SAUDI_BY,
  MEDICAL_FILTER_SAUDI_BY_WP,
  MEDICAL_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['medicalMalaysiaReports'];
const MedicalMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalMalaysiaReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['medicalMalaysiaReports'],
      }),
      getMedicalMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FILTER_SAUDI_BY_WP,
          params: filterData,
        }),
        providesTags: ['medicalMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalMalaysiaReportApi;
export const {
  useGetMedicalMalaysiaReportsQuery,
  useGetMedicalMalaysiaAllReportsQuery,
} = MedicalMalaysiaReportApi;

export const selectFilteredMedicalMalaysiaReports = (medicalMalaysiaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(medicalMalaysiaReports, searchText);
  });
