import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['medicalExpireMalaysiaReports'];
const MedicalExpireMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalExpireMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['medicalExpireMalaysiaReports'],
      }),
      getMedicalExpireMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalExpireMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalExpireMalaysiaReportApi;
export const {
  useGetMedicalExpireMalaysiaReportsQuery,
  useGetMedicalExpireMalaysiaAllReportsQuery,
} = MedicalExpireMalaysiaReportApi;

export const selectFilteredMedicalExpireMalaysiaReports = (
  medicalExpireMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalExpireMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      medicalExpireMalaysiaReports,
      searchText
    );
  });
