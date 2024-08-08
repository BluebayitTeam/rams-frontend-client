import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_BRANCH,
	DELETE_BRANCH,
	DELETE_BRANCH_MULTIPLE,
	GET_BRANCHS,
	GET_BRANCH_BY_ID,
	UPDATE_BRANCH
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import BranchModel from './branch/models/BranchModel';

export const addTagTypes = ['branchs'];
const BranchApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBranchs: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_BRANCHS, params: { page, size, searchKey } }),
				providesTags: ['branchs']
			}),
			deleteBranchs: build.mutation({
				query: (branchIds) => ({
					url: DELETE_BRANCH_MULTIPLE,
					method: 'DELETE',
					data: { ids: branchIds }
				}),
				invalidatesTags: ['branchs']
			}),
			getBranch: build.query({
				query: (branchId) => ({
					url: `${GET_BRANCH_BY_ID}${branchId}`
				}),
				providesTags: ['branchs']
			}),
			createBranch: build.mutation({
				query: (newBranch) => ({
					url: CREATE_BRANCH,
					method: 'POST',
					data: jsonToFormData(BranchModel(newBranch))
				}),
				invalidatesTags: ['branchs']
			}),
			updateBranch: build.mutation({
				query: (branch) => ({
					url: `${UPDATE_BRANCH}${branch.id}`,
					method: 'PUT',
					data: jsonToFormData(branch)
				}),
				invalidatesTags: ['branchs']
			}),
			deleteBranch: build.mutation({
				query: (branchId) => ({
					url: `${DELETE_BRANCH}${branchId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['branchs']
			})
		}),
		overrideExisting: false
	});
export default BranchApi;
export const {
	useGetBranchsQuery,
	useDeleteBranchsMutation,
	useGetBranchQuery,
	useUpdateBranchMutation,
	useDeleteBranchMutation,

	useCreateBranchMutation
} = BranchApi;

export const selectFilteredBranchs = (branchs) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return branchs;
		}

		return FuseUtils.filterArrayByString(branchs, searchText);
	});
