import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import ShortlistedCandidateModel from './shortlistedCandidate/models/ShortlistedCandidateModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ShortlistedCandidates'];
const ShortlistedCandidateApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getShortlistedCandidates: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_JOB_POSTS,
          params: { page, size, searchKey },
        }),
        providesTags: ['ShortlistedCandidates'],
      }),
      deleteShortlistedCandidates: build.mutation({
        query: (ShortlistedCandidateIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: ShortlistedCandidateIds },
        }),
        invalidatesTags: ['ShortlistedCandidates'],
      }),
      getShortlistedCandidate: build.query({
        query: (ShortlistedCandidateId) => ({
          url: `${GET_JOB_POSTID}${ShortlistedCandidateId}`,
        }),
        providesTags: ['ShortlistedCandidates'],
      }),
      createShortlistedCandidate: build.mutation({
        query: (newShortlistedCandidate) => ({
          url: CREATE_JOB_POST,
          method: 'POST',
          data: ShortlistedCandidateModel(newShortlistedCandidate),
        }),
        invalidatesTags: ['ShortlistedCandidates'],
      }),
      updateShortlistedCandidate: build.mutation({
        query: (ShortlistedCandidate) => ({
          url: `${UPDATE_JOB_POST}${ShortlistedCandidate.id}`,
          method: 'PUT',
          data: ShortlistedCandidate,
        }),
        invalidatesTags: ['ShortlistedCandidates'],
      }),
      deleteShortlistedCandidate: build.mutation({
        query: (ShortlistedCandidateId) => ({
          url: `${DELETE_JOB_POST}${ShortlistedCandidateId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ShortlistedCandidates'],
      }),
    }),
    overrideExisting: false,
  });
export default ShortlistedCandidateApi;
export const {
  useGetShortlistedCandidatesQuery,
  useDeleteShortlistedCandidatesMutation,
  useGetShortlistedCandidateQuery,
  useUpdateShortlistedCandidateMutation,
  useDeleteShortlistedCandidateMutation,

  useCreateShortlistedCandidateMutation,
} = ShortlistedCandidateApi;

export const selectFilteredShortlistedCandidates = (ShortlistedCandidates) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ShortlistedCandidates;
    }

    return FuseUtils.filterArrayByString(ShortlistedCandidates, searchText);
  });
