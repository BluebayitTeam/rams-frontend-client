import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_NOTOFICATION_MEDICAL_EXPIR,
  GET_NOTOFICATION_MEDICAL_EXPIR_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['medicalExpiresReports'];
const MedicalExpiresReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalExpiresReports: build.query({
        query: (filterData) => ({
          url: GET_NOTOFICATION_MEDICAL_EXPIR,
          params: filterData,
        }),
        providesTags: ['medicalExpiresReports'],
      }),
      getMedicalExpiresAllReports: build.query({
        query: (filterData) => ({
          url: GET_NOTOFICATION_MEDICAL_EXPIR_WP,
          params: filterData,
        }),
        providesTags: ['medicalExpiresReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalExpiresReportApi;
export const {
  useGetMedicalExpiresReportsQuery,
  useGetMedicalExpiresAllReportsQuery,
} = MedicalExpiresReportApi;

export const selectFilteredMedicalExpiresReports = (medicalExpiresReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalExpiresReports;
    }

    return FuseUtils.filterArrayByString(medicalExpiresReports, searchText);
  });
