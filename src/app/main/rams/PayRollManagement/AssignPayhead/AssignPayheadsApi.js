import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import AssignPayheadModel from './assignPayhead/models/AssignPayheadModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_TYPE_MULTIPLE,
  GET_PAY_HEAD_TYPE_BY_ID,
  GET_PAY_HEAD_TYPES,
  UPDATE_PAY_HEAD_TYPE,
} from 'src/app/constant/constants';

export const addTagTypes = ['assignPayheads'];
const AssignPayheadApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAssignPayheads: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_PAY_HEAD_TYPES,
          params: { page, size, searchKey },
        }),
        providesTags: ['assignPayheads'],
      }),
      deleteAssignPayheads: build.mutation({
        query: (assignPayheadIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: assignPayheadIds },
        }),
        invalidatesTags: ['assignPayheads'],
      }),
      getAssignPayhead: build.query({
        query: (assignPayheadId) => ({
          url: `${GET_PAY_HEAD_TYPE_BY_ID}${assignPayheadId}`,
        }),
        providesTags: ['assignPayheads'],
      }),
      createAssignPayhead: build.mutation({
        query: (newAssignPayhead) => ({
          url: CHECK_ASSIGN_PAYHEAD,
          method: 'POST',
          data: jsonToFormData(AssignPayheadModel(newAssignPayhead)),
        }),
        invalidatesTags: ['assignPayheads'],
      }),
      updateAssignPayhead: build.mutation({
        query: (assignPayhead) => ({
          url: `${UPDATE_PAY_HEAD_TYPE}${assignPayhead.id}`,
          method: 'PUT',
          data: jsonToFormData(assignPayhead),
        }),
        invalidatesTags: ['assignPayheads'],
      }),
      deleteAssignPayhead: build.mutation({
        query: (assignPayheadId) => ({
          url: `${DELETE_PAY_HEAD_TYPE}${assignPayheadId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['assignPayheads'],
      }),
    }),
    overrideExisting: false,
  });
export default AssignPayheadApi;
export const {
  useGetAssignPayheadsQuery,
  useDeleteAssignPayheadsMutation,
  useGetAssignPayheadQuery,
  useUpdateAssignPayheadMutation,
  useDeleteAssignPayheadMutation,

  useCreateAssignPayheadMutation,
} = AssignPayheadApi;

export const selectFilteredAssignPayheads = (assignPayheads) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return assignPayheads;
    }

    return FuseUtils.filterArrayByString(assignPayheads, searchText);
  });
