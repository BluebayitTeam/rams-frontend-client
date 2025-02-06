import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import LeaveApplicationModel from './leaveApplication/models/LeaveApplicationModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_JOB_POST,
  CREATE_LEAVE_TYPE,
  DELETE_JOB_POST,
  DELETE_LEAVE_TYPE,
  GET_JOB_POSTID,
  GET_JOB_POSTS,
  GET_LEAVE_TYPEID,
  GET_LEAVE_TYPES,
  UPDATE_JOB_POST,
  UPDATE_LEAVE_TYPE,
} from 'src/app/constant/constants';

export const addTagTypes = ['LeaveApplications'];
const LeaveApplicationApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getLeaveApplications: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_JOB_POSTS,
          params: { page, size, searchKey },
        }),
        providesTags: ['LeaveApplications'],
      }),
      deleteLeaveApplications: build.mutation({
        query: (LeaveApplicationIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: LeaveApplicationIds },
        }),
        invalidatesTags: ['LeaveApplications'],
      }),
      getLeaveApplication: build.query({
        query: (LeaveApplicationId) => ({
          url: `${GET_JOB_POSTID}${LeaveApplicationId}`,
        }),
        providesTags: ['LeaveApplications'],
      }),
      createLeaveApplication: build.mutation({
        query: (newLeaveApplication) => ({
          url: CREATE_JOB_POST,
          method: 'POST',
          data: LeaveApplicationModel(newLeaveApplication),
        }),
        invalidatesTags: ['LeaveApplications'],
      }),
      updateLeaveApplication: build.mutation({
        query: (LeaveApplication) => ({
          url: `${UPDATE_JOB_POST}${LeaveApplication.id}`,
          method: 'PUT',
          data: LeaveApplication,
        }),
        invalidatesTags: ['LeaveApplications'],
      }),
      deleteLeaveApplication: build.mutation({
        query: (LeaveApplicationId) => ({
          url: `${DELETE_JOB_POST}${LeaveApplicationId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['LeaveApplications'],
      }),
    }),
    overrideExisting: false,
  });
export default LeaveApplicationApi;
export const {
  useGetLeaveApplicationsQuery,
  useDeleteLeaveApplicationsMutation,
  useGetLeaveApplicationQuery,
  useUpdateLeaveApplicationMutation,
  useDeleteLeaveApplicationMutation,

  useCreateLeaveApplicationMutation,
} = LeaveApplicationApi;

export const selectFilteredLeaveApplications = (LeaveApplications) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return LeaveApplications;
    }

    return FuseUtils.filterArrayByString(LeaveApplications, searchText);
  });
