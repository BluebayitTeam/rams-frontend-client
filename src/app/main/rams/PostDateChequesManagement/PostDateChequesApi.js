import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_POST_DATE_CHECK,
	DELETE_POST_DATE_CHECK,
	DELETE_POST_DATE_CHECK_MULTIPLE,
	GET_POST_DATE_CHECKS,
	GET_POST_DATE_CHECK_BY_ID,
	UPDATE_POST_DATE_CHECK
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PostDateChequeModel from './postDateCheque/models/PostDateChequeModel';

export const addTagTypes = ['postDateCheques'];
const PostDateChequeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPostDateCheques: build.query({
				query: ({ page, size, searchKey, is_cheque = 'cheque' }) => ({
					url: GET_POST_DATE_CHECKS,
					params: { page, size, searchKey, is_cheque }
				}),
				providesTags: ['postDateCheques']
			}),
			deletePostDateCheques: build.mutation({
				query: (postDateChequeIds) => ({
					url: DELETE_POST_DATE_CHECK_MULTIPLE,
					method: 'DELETE',
					data: { ids: postDateChequeIds }
				}),
				invalidatesTags: ['postDateCheques']
			}),
			getPostDateCheque: build.query({
				query: (postDateChequeId) => ({
					url: `${GET_POST_DATE_CHECK_BY_ID}${postDateChequeId}`
				}),
				providesTags: ['postDateCheques']
			}),
			createPostDateCheque: build.mutation({
				query: (newPostDateCheque) => ({
					url: CREATE_POST_DATE_CHECK,
					method: 'POST',
					data: jsonToFormData(PostDateChequeModel(newPostDateCheque))
				}),
				invalidatesTags: ['postDateCheques']
			}),
			updatePostDateCheque: build.mutation({
				query: (postDateCheque) => ({
					url: `${UPDATE_POST_DATE_CHECK}${postDateCheque.id}`,
					method: 'PUT',
					data: jsonToFormData(postDateCheque)
				}),
				invalidatesTags: ['postDateCheques']
			}),
			deletePostDateCheque: build.mutation({
				query: (postDateChequeId) => ({
					url: `${DELETE_POST_DATE_CHECK}${postDateChequeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['postDateCheques']
			})
		}),
		overrideExisting: false
	});
export default PostDateChequeApi;
export const {
	useGetPostDateChequesQuery,
	useDeletePostDateChequesMutation,
	useGetPostDateChequeQuery,
	useUpdatePostDateChequeMutation,
	useDeletePostDateChequeMutation,

	useCreatePostDateChequeMutation
} = PostDateChequeApi;

export const selectFilteredPostDateCheques = (postDateCheques) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return postDateCheques;
		}

		return FuseUtils.filterArrayByString(postDateCheques, searchText);
	});
