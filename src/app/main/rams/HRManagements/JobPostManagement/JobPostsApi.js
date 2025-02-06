import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import JobPostModel from './JobPost/models/JobPostModel';
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

export const addTagTypes = ['JobPosts'];
const JobPostApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getJobPosts: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_JOB_POSTS,
          params: { page, size, searchKey },
        }),
        providesTags: ['JobPosts'],
      }),
      deleteJobPosts: build.mutation({
        query: (JobPostIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: JobPostIds },
        }),
        invalidatesTags: ['JobPosts'],
      }),
      getJobPost: build.query({
        query: (JobPostId) => ({
          url: `${GET_JOB_POSTID}${JobPostId}`,
        }),
        providesTags: ['JobPosts'],
      }),
      createJobPost: build.mutation({
        query: (newJobPost) => ({
          url: CREATE_JOB_POST,
          method: 'POST',
          data: JobPostModel(newJobPost),
        }),
        invalidatesTags: ['JobPosts'],
      }),
      updateJobPost: build.mutation({
        query: (JobPost) => ({
          url: `${UPDATE_JOB_POST}${JobPost.id}`,
          method: 'PUT',
          data: JobPost,
        }),
        invalidatesTags: ['JobPosts'],
      }),
      deleteJobPost: build.mutation({
        query: (JobPostId) => ({
          url: `${DELETE_JOB_POST}${JobPostId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['JobPosts'],
      }),
    }),
    overrideExisting: false,
  });
export default JobPostApi;
export const {
  useGetJobPostsQuery,
  useDeleteJobPostsMutation,
  useGetJobPostQuery,
  useUpdateJobPostMutation,
  useDeleteJobPostMutation,

  useCreateJobPostMutation,
} = JobPostApi;

export const selectFilteredJobPosts = (JobPosts) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return JobPosts;
    }

    return FuseUtils.filterArrayByString(JobPosts, searchText);
  });
