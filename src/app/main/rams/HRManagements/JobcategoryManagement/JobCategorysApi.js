import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_JOB_CATEGORY,
	DELETE_JOB_CATEGORY,
	GET_JOB_CATEGORYID,
	// DELETE_JOB_CATEGORY_MULTIPLE,
	GET_JOB_CATEGORYS,
	UPDATE_JOB_CATEGORY
} from 'src/app/constant/constants';
import JobCategoryModel from './jobCategory/models/JobCategoryModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['jobCategorys'];
const JobCategoryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getJobCategorys: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_JOB_CATEGORYS, params: { page, size, searchKey } }),
				providesTags: ['jobCategorys']
			}),
			deleteJobCategorys: build.mutation({
				query: (jobCategoryIds) => ({
					url: DELETE_JOB_CATEGORY,
					// url: DELETE_JOB_CATEGORY_MULTIPLE,
					method: 'DELETE',
					data: { ids: jobCategoryIds }
				}),
				invalidatesTags: ['jobCategorys']
			}),
			getJobCategory: build.query({
				query: (jobCategoryId) => ({
					url: `${GET_JOB_CATEGORYID}${jobCategoryId}`
				}),
				providesTags: ['jobCategorys']
			}),
			createJobCategory: build.mutation({
				query: (newJobCategory) => ({
					url: CREATE_JOB_CATEGORY,
					method: 'POST',
					data: jsonToFormData(JobCategoryModel(newJobCategory))
				}),
				invalidatesTags: ['jobCategorys']
			}),
			updateJobCategory: build.mutation({
				query: (jobCategory) => ({
					url: `${UPDATE_JOB_CATEGORY}${jobCategory.id}`,
					method: 'PUT',
					data: jsonToFormData(jobCategory)
				}),
				invalidatesTags: ['jobCategorys']
			}),
			deleteJobCategory: build.mutation({
				query: (jobCategoryId) => ({
					url: `${DELETE_JOB_CATEGORY}${jobCategoryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['jobCategorys']
			})
		}),
		overrideExisting: false
	});
export default JobCategoryApi;
export const {
	useGetJobCategorysQuery,
	useDeleteJobCategorysMutation,
	useGetJobCategoryQuery,
	useUpdateJobCategoryMutation,
	useDeleteJobCategoryMutation,

	useCreateJobCategoryMutation
} = JobCategoryApi;

export const selectFilteredJobCategorys = (jobCategorys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return jobCategorys;
		}

		return FuseUtils.filterArrayByString(jobCategorys, searchText);
	});
