import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_TODOTASKTYPE,
	DELETE_TODOTASKTYPE,
	DELETE_TODOTASKTYPE_MULTIPLE,
	GET_TODOTASKTYPE_BY_ID,
	GET_TODOTASKTYPES,
	UPDATE_TODOTASKTYPE
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import TodotasktypeModel from './todotasktype/models/TodotasktypeModel';

export const addTagTypes = ['todotasktypes'];
const TodotasktypeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTodotasktypes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_TODOTASKTYPES, params: { page, size, searchKey } }),
				providesTags: ['todotasktypes']
			}),
			deleteTodotasktypes: build.mutation({
				query: (todotasktypeIds) => ({
					url: DELETE_TODOTASKTYPE_MULTIPLE,
					method: 'DELETE',
					data: { ids: todotasktypeIds }
				}),
				invalidatesTags: ['todotasktypes']
			}),
			getTodotasktype: build.query({
				query: (todotasktypeId) => ({
					url: `${GET_TODOTASKTYPE_BY_ID}${todotasktypeId}`
				}),
				providesTags: ['todotasktypes']
			}),
			createTodotasktype: build.mutation({
				query: (newTodotasktype) => ({
					url: CREATE_TODOTASKTYPE,
					method: 'POST',
					data: jsonToFormData(TodotasktypeModel(newTodotasktype))
				}),
				invalidatesTags: ['todotasktypes']
			}),
			updateTodotasktype: build.mutation({
				query: (todotasktype) => ({
					url: `${UPDATE_TODOTASKTYPE}${todotasktype.id}`,
					method: 'PUT',
					data: jsonToFormData(todotasktype)
				}),
				invalidatesTags: ['todotasktypes']
			}),
			deleteTodotasktype: build.mutation({
				query: (todotasktypeId) => ({
					url: `${DELETE_TODOTASKTYPE}${todotasktypeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['todotasktypes']
			})
		}),
		overrideExisting: false
	});
export default TodotasktypeApi;
export const {
	useGetTodotasktypesQuery,
	useDeleteTodotasktypesMutation,
	useGetTodotasktypeQuery,
	useUpdateTodotasktypeMutation,
	useDeleteTodotasktypeMutation,

	useCreateTodotasktypeMutation
} = TodotasktypeApi;

export const selectFilteredTodotasktypes = (todotasktypes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return todotasktypes;
		}

		return FuseUtils.filterArrayByString(todotasktypes, searchText);
	});
