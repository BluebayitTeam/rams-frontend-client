import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import LeaveTypeModel from './leaveType/models/LeaveTypeModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_LEAVE_TYPE,
  DELETE_LEAVE_TYPE,
  GET_LEAVE_TYPEID,
  GET_LEAVE_TYPES,
  UPDATE_LEAVE_TYPE,
} from 'src/app/constant/constants';

export const addTagTypes = ['LeaveTypes'];
const LeaveTypeApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getLeaveTypes: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_LEAVE_TYPES,
          params: { page, size, searchKey },
        }),
        providesTags: ['LeaveTypes'],
      }),
      deleteLeaveTypes: build.mutation({
        query: (LeaveTypeIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: LeaveTypeIds },
        }),
        invalidatesTags: ['LeaveTypes'],
      }),
      getLeaveType: build.query({
        query: (LeaveTypeId) => ({
          url: `${GET_LEAVE_TYPEID}${LeaveTypeId}`,
        }),
        providesTags: ['LeaveTypes'],
      }),
      createLeaveType: build.mutation({
        query: (newLeaveType) => ({
          url: CREATE_LEAVE_TYPE,
          method: 'POST',
          data: LeaveTypeModel(newLeaveType),
        }),
        invalidatesTags: ['LeaveTypes'],
      }),
      updateLeaveType: build.mutation({
        query: (LeaveType) => ({
          url: `${UPDATE_LEAVE_TYPE}${LeaveType.id}`,
          method: 'PUT',
          data: LeaveType,
        }),
        invalidatesTags: ['LeaveTypes'],
      }),
      deleteLeaveType: build.mutation({
        query: (LeaveTypeId) => ({
          url: `${DELETE_LEAVE_TYPE}${LeaveTypeId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['LeaveTypes'],
      }),
    }),
    overrideExisting: false,
  });
export default LeaveTypeApi;
export const {
  useGetLeaveTypesQuery,
  useDeleteLeaveTypesMutation,
  useGetLeaveTypeQuery,
  useUpdateLeaveTypeMutation,
  useDeleteLeaveTypeMutation,

  useCreateLeaveTypeMutation,
} = LeaveTypeApi;

export const selectFilteredLeaveTypes = (LeaveTypes) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return LeaveTypes;
    }

    return FuseUtils.filterArrayByString(LeaveTypes, searchText);
  });
