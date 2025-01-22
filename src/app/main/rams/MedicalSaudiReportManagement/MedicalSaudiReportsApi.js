import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import {
  MEDICAL_FILTER_BY,
  MEDICAL_FILTER_SAUDI_BY,
} from 'src/app/constant/constants';

export const addTagTypes = ['medicalSaudiReports'];
const MedicalSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalSaudiReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['medicalSaudiReports'],
      }),
      getMedicalAllReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalSaudiReports'],
      }),
      deleteMedicalSaudiReports: build.mutation({
        query: (medicalSaudiReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: medicalSaudiReportIds },
        }),
        invalidatesTags: ['medicalSaudiReports'],
      }),
      getMedicalSaudiReport: build.query({
        query: (medicalSaudiReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${medicalSaudiReportId}`,
        }),
        providesTags: ['medicalSaudiReports'],
      }),
      createMedicalSaudiReport: build.mutation({
        query: (newMedicalSaudiReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newMedicalSaudiReport),
        }),
        invalidatesTags: ['medicalSaudiReports'],
      }),
      updateMedicalSaudiReport: build.mutation({
        query: (medicalSaudiReport) => ({
          url: `${UPDATE_DEPARTMENT}${medicalSaudiReport.id}`,
          method: 'PUT',
          data: jsonToFormData(medicalSaudiReport),
        }),
        invalidatesTags: ['medicalSaudiReports'],
      }),
      deleteMedicalSaudiReport: build.mutation({
        query: (medicalSaudiReportId) => ({
          url: `${DELETE_DEPARTMENT}${medicalSaudiReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['medicalSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalSaudiReportApi;
export const {
  useGetMedicalSaudiReportsQuery,
  useGetMedicalAllReportsQuery,
  useDeleteMedicalSaudiReportsMutation,
  useGetMedicalSaudiReportQuery,
  useUpdateMedicalSaudiReportMutation,
  useDeleteMedicalSaudiReportMutation,
  useCreateMedicalSaudiReportMutation,
} = MedicalSaudiReportApi;

export const selectFilteredMedicalSaudiReports = (medicalSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalSaudiReports;
    }

    return FuseUtils.filterArrayByString(medicalSaudiReports, searchText);
  });
