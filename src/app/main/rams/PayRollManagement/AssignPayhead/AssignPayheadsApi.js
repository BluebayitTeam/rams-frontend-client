import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import AssignPayheadModel from './assignPayhead/models/AssignPayheadModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_PAY_HEAD_ASSIGNMENT,
  CREATE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_ASSIGNMENT,
  DELETE_PAY_HEAD_ASSIGNMENT_MULTIPLE,
  DELETE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_TYPE_MULTIPLE,
  GET_PAY_HEAD_ASSIGNMENT,
  GET_PAY_HEAD_ASSIGNMENT_BY_ID,
  GET_PAY_HEAD_TYPE_BY_ID,
  GET_PAY_HEAD_TYPES,
  UPDATE_PAY_HEAD_ASSIGNMENT,
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
          url: GET_PAY_HEAD_ASSIGNMENT,
          params: { page, size, searchKey },
        }),
        providesTags: ['assignPayheads'],
      }),
      deleteAssignPayheads: build.mutation({
        query: (assignPayheadIds) => ({
          url: DELETE_PAY_HEAD_ASSIGNMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: assignPayheadIds },
        }),
        invalidatesTags: ['assignPayheads'],
      }),
      getAssignPayhead: build.query({
        query: (assignPayheadId) => ({
          url: `${GET_PAY_HEAD_ASSIGNMENT_BY_ID}${assignPayheadId}`,
        }),
        providesTags: ['assignPayheads'],
      }),
      createAssignPayhead: build.mutation({
        query: (newAssignPayhead) => ({
          url: CREATE_PAY_HEAD_ASSIGNMENT,
          method: 'POST',
          data: AssignPayheadModel(newAssignPayhead),
        }),
        invalidatesTags: ['assignPayheads'],
      }),
      updateAssignPayhead: build.mutation({
        query: (assignPayhead) => ({
          url: `${UPDATE_PAY_HEAD_ASSIGNMENT}${assignPayhead.id}`,
          method: 'PUT',
          data: assignPayhead,
        }),
        invalidatesTags: ['assignPayheads'],
      }),
      deleteAssignPayhead: build.mutation({
        query: (assignPayheadId) => ({
          url: `${DELETE_PAY_HEAD_ASSIGNMENT}${assignPayheadId}`,
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
