import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import ShortlistedCandidateModel from './shortlistedCandidate/models/ShortlistedCandidateModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_SHORTLISTED_CANDIDATE,
  DELETE_SHORTLISTED_CANDIDATE,
  GET_SHORTLISTED_CANDIDATEID,
  GET_SHORTLISTED_CANDIDATES,
  UPDATE_SHORTLISTED_CANDIDATE,
} from 'src/app/constant/constants';

export const addTagTypes = ['ShortlistedCandidates'];
const ShortlistedCandidateApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getShortlistedCandidates: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_SHORTLISTED_CANDIDATES,
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
          url: `${GET_SHORTLISTED_CANDIDATEID}${ShortlistedCandidateId}`,
        }),
        providesTags: ['ShortlistedCandidates'],
      }),
      createShortlistedCandidate: build.mutation({
        query: (newShortlistedCandidate) => ({
          url: CREATE_SHORTLISTED_CANDIDATE,
          method: 'POST',
          data: jsonToFormData(
            ShortlistedCandidateModel(newShortlistedCandidate)
          ),
        }),
        invalidatesTags: ['ShortlistedCandidates'],
      }),
      updateShortlistedCandidate: build.mutation({
        query: (shortlistedCandidate) => ({
          url: `${UPDATE_SHORTLISTED_CANDIDATE}${shortlistedCandidate.id}`,
          method: 'PUT',
          data: jsonToFormData({
            ...shortlistedCandidate,
          }),
        }),
        invalidatesTags: ['ShortlistedCandidates'],
      }),
      deleteShortlistedCandidate: build.mutation({
        query: (ShortlistedCandidateId) => ({
          url: `${DELETE_SHORTLISTED_CANDIDATE}${ShortlistedCandidateId}`,
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
