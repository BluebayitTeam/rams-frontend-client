import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import LeaveApplicationModel from './leaveApplication/models/LeaveApplicationModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_APPLICATION,
  GET_APPLICATIONID,
  GET_APPLICATIONS,
  UPDATE_APPLICATION,
} from 'src/app/constant/constants';
import { DELETE_APPLICATION } from '../../../../constant/constants';

export const addTagTypes = ['LeaveApplications'];
const LeaveApplicationApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getLeaveApplications: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_APPLICATIONS,
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
          url: `${GET_APPLICATIONID}${LeaveApplicationId}`,
        }),
        providesTags: ['LeaveApplications'],
      }),
      createLeaveApplication: build.mutation({
        query: (newLeaveApplication) => ({
          url: CREATE_APPLICATION,
          method: 'POST',
          data: jsonToFormData(LeaveApplicationModel(newLeaveApplication)),
        }),
        invalidatesTags: ['LeaveApplications'],
      }),
      updateLeaveApplication: build.mutation({
        query: (LeaveApplication) => ({
          url: `${UPDATE_APPLICATION}${LeaveApplication.id}`,
          method: 'PUT',
          data: jsonToFormData({
            ...LeaveApplication,
          }),
        }),
        invalidatesTags: ['LeaveApplications'],
      }),
      deleteLeaveApplication: build.mutation({
        query: (LeaveApplicationId) => ({
          url: `${DELETE_APPLICATION}${LeaveApplicationId}`,
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
