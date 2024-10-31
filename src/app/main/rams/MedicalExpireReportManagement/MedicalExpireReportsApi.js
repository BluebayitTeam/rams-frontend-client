import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
  GET_UPCOMING_MEDICAL_COUNT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['medicalExpireReports'];
const MedicalExpireReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalExpireReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
          params: { no_of_days: filterData?.no_of_days },
        }),
        providesTags: ['medicalExpireReports'],
      }),
      getMedicalExpireAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
          params: { no_of_days: filterData?.no_of_days },
        }),
        providesTags: ['medicalExpireReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalExpireReportApi;
export const {
  useGetMedicalExpireReportsQuery,
  useGetMedicalExpireAllReportsQuery,
} = MedicalExpireReportApi;

export const selectFilteredMedicalExpireReports = (medicalExpireReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalExpireReports;
    }

    return FuseUtils.filterArrayByString(medicalExpireReports, searchText);
  });
