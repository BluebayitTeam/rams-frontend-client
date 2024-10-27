import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  CREATE_COMPUTE,
  DELETE_COMPUTE,
  DELETE_COMPUTE_MULTIPLE,
  GET_COMPUTES,
  GET_COMPUTE_BY_ID,
  UPDATE_COMPUTE,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ComputeModel from './compute/models/ComputeModel';

export const addTagTypes = ['computes'];
const ComputeApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getComputes: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_COMPUTES,
          params: { page, size, searchKey },
        }),
        providesTags: ['computes'],
      }),
      deleteComputes: build.mutation({
        query: (computeIds) => ({
          url: DELETE_COMPUTE_MULTIPLE,
          method: 'DELETE',
          data: { ids: computeIds },
        }),
        invalidatesTags: ['computes'],
      }),
      getCompute: build.query({
        query: (computeId) => ({
          url: `${GET_COMPUTE_BY_ID}${computeId}`,
        }),
        providesTags: ['computes'],
      }),
      createCompute: build.mutation({
        query: (newCompute) => ({
          url: CREATE_COMPUTE,
          method: 'POST',
          data: jsonToFormData(ComputeModel(newCompute)),
        }),
        invalidatesTags: ['computes'],
      }),
      updateCompute: build.mutation({
        query: (compute) => ({
          url: `${UPDATE_COMPUTE}${compute.id}`,
          method: 'PUT',
          data: jsonToFormData(compute),
        }),
        invalidatesTags: ['computes'],
      }),
      deleteCompute: build.mutation({
        query: (computeId) => ({
          url: `${DELETE_COMPUTE}${computeId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['computes'],
      }),
    }),
    overrideExisting: false,
  });
export default ComputeApi;
export const {
  useGetComputesQuery,
  useDeleteComputesMutation,
  useGetComputeQuery,
  useUpdateComputeMutation,
  useDeleteComputeMutation,

  useCreateComputeMutation,
} = ComputeApi;

export const selectFilteredComputes = (computes) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return computes;
    }

    return FuseUtils.filterArrayByString(computes, searchText);
  });
