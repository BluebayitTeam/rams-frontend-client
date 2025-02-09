import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import CandidateApplicationModel from './candidateApplication/models/CandidateApplicationModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_APPLICATION,
  GET_APPLICATIONID,
  GET_APPLICATIONS,
  UPDATE_APPLICATION,
} from 'src/app/constant/constants';
import { DELETE_APPLICATION } from '../../../../constant/constants';

export const addTagTypes = ['CandidateApplications'];
const CandidateApplicationApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCandidateApplications: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_APPLICATIONS,
          params: { page, size, searchKey },
        }),
        providesTags: ['CandidateApplications'],
      }),
      deleteCandidateApplications: build.mutation({
        query: (CandidateApplicationIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: CandidateApplicationIds },
        }),
        invalidatesTags: ['CandidateApplications'],
      }),
      getCandidateApplication: build.query({
        query: (CandidateApplicationId) => ({
          url: `${GET_APPLICATIONID}${CandidateApplicationId}`,
        }),
        providesTags: ['CandidateApplications'],
      }),
      createCandidateApplication: build.mutation({
        query: (newCandidateApplication) => ({
          url: CREATE_APPLICATION,
          method: 'POST',
          data: jsonToFormData(
            CandidateApplicationModel(newCandidateApplication)
          ),
        }),
        invalidatesTags: ['CandidateApplications'],
      }),
      updateCandidateApplication: build.mutation({
        query: (CandidateApplication) => ({
          url: `${UPDATE_APPLICATION}${CandidateApplication.id}`,
          method: 'PUT',
          data: jsonToFormData({
            ...CandidateApplication,
          }),
        }),
        invalidatesTags: ['CandidateApplications'],
      }),
      deleteCandidateApplication: build.mutation({
        query: (CandidateApplicationId) => ({
          url: `${DELETE_APPLICATION}${CandidateApplicationId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['CandidateApplications'],
      }),
    }),
    overrideExisting: false,
  });
export default CandidateApplicationApi;
export const {
  useGetCandidateApplicationsQuery,
  useDeleteCandidateApplicationsMutation,
  useGetCandidateApplicationQuery,
  useUpdateCandidateApplicationMutation,
  useDeleteCandidateApplicationMutation,

  useCreateCandidateApplicationMutation,
} = CandidateApplicationApi;

export const selectFilteredCandidateApplications = (CandidateApplications) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return CandidateApplications;
    }

    return FuseUtils.filterArrayByString(CandidateApplications, searchText);
  });
