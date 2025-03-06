import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_AUTHORIZE,
	DELETE_AUTHORIZE,
	DELETE_AUTHORIZE_MULTIPLE,
	GET_AUTHORIZES,
	GET_AUTHORIZE_BY_ID,
	UPDATE_AUTHORIZE_APPROVED
} from 'src/app/constant/constants';
import AuthorizeModel from './authorize/models/AuthorizeModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['authorizes'];
const AuthorizeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAuthorizes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_AUTHORIZES, params: { page, size, searchKey } }),
				providesTags: ['authorizes']
			}),
			deleteAuthorizes: build.mutation({
				query: (authorizeIds) => ({
					url: DELETE_AUTHORIZE_MULTIPLE,
					method: 'DELETE',
					data: { ids: authorizeIds }
				}),
				invalidatesTags: ['authorizes']
			}),
			getAuthorize: build.query({
				query: (authorizeId) => ({
					url: `${GET_AUTHORIZE_BY_ID}${authorizeId}`
				}),
				providesTags: ['authorizes']
			}),
			createAuthorize: build.mutation({
				query: (newAuthorize) => ({
					url: CREATE_AUTHORIZE,
					method: 'POST',
					data: jsonToFormData(AuthorizeModel(newAuthorize))
				}),
				invalidatesTags: ['authorizes']
			}),
			updateAuthorize: build.mutation({
				query: (authorize) => ({
					url: `${UPDATE_AUTHORIZE_APPROVED}${authorize.id}`,
					method: 'PUT',
					data: jsonToFormData(authorize)
				}),
				invalidatesTags: ['authorizes']
			}),
			deleteAuthorize: build.mutation({
				query: (authorizeId) => ({
					url: `${DELETE_AUTHORIZE}${authorizeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['authorizes']
			})
		}),
		overrideExisting: false
	});
export default AuthorizeApi;
export const {
	useGetAuthorizesQuery,
	useDeleteAuthorizesMutation,
	useGetAuthorizeQuery,
	useUpdateAuthorizeMutation,
	useDeleteAuthorizeMutation,

	useCreateAuthorizeMutation
} = AuthorizeApi;

export const selectFilteredAuthorizes = (authorizes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return authorizes;
		}

		return FuseUtils.filterArrayByString(authorizes, searchText);
	});
