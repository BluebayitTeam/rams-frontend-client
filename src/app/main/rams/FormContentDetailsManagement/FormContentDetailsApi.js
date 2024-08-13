import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_FORM_CONTENT_DETAIL,
	DELETE_FORM_CONTENT_DETAIL,
	DELETE_FORM_CONTENT_DETAIL_MULTIPLE,
	GET_FORM_CONTENT_DETAILID,
	GET_FORM_CONTENT_DETAILS,
	UPDATE_FORM_CONTENT_DETAIL
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import FormContentDetailModel from './formContentDetail/models/FormContentDetailModel';

export const addTagTypes = ['formContentDetails'];
const FormContentDetailApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFormContentDetails: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_FORM_CONTENT_DETAILS,
					params: { page, size, searchKey }
				}),
				providesTags: ['formContentDetails']
			}),
			deleteFormContentDetails: build.mutation({
				query: (formContentDetailIds) => ({
					url: DELETE_FORM_CONTENT_DETAIL_MULTIPLE,
					method: 'DELETE',
					data: { ids: formContentDetailIds }
				}),
				invalidatesTags: ['formContentDetails']
			}),
			getFormContentDetail: build.query({
				query: (formContentDetailId) => ({
					url: `${GET_FORM_CONTENT_DETAILID}${formContentDetailId}`
				}),
				providesTags: ['formContentDetails']
			}),
			createFormContentDetail: build.mutation({
				query: (newFormContentDetail) => ({
					url: CREATE_FORM_CONTENT_DETAIL,
					method: 'POST',
					data: FormContentDetailModel(newFormContentDetail)
				}),
				invalidatesTags: ['formContentDetails']
			}),
			updateFormContentDetail: build.mutation({
				query: (formContentDetail) => ({
					url: `${UPDATE_FORM_CONTENT_DETAIL}${formContentDetail.id}`,
					method: 'PUT',
					data: formContentDetail
				}),
				invalidatesTags: ['formContentDetails']
			}),
			deleteFormContentDetail: build.mutation({
				query: (formContentDetailId) => ({
					url: `${DELETE_FORM_CONTENT_DETAIL}${formContentDetailId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['formContentDetails']
			})
		}),
		overrideExisting: false
	});
export default FormContentDetailApi;
export const {
	useGetFormContentDetailsQuery,
	useDeleteFormContentDetailsMutation,
	useGetFormContentDetailQuery,
	useUpdateFormContentDetailMutation,
	useDeleteFormContentDetailMutation,

	useCreateFormContentDetailMutation
} = FormContentDetailApi;

export const selectFilteredFormContentDetails = (formContentDetails) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return formContentDetails;
		}

		return FuseUtils.filterArrayByString(formContentDetails, searchText);
	});
