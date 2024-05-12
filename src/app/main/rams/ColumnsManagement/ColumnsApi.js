import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { ALL_USERS, CREATE_CLIENT, GET_CLIENTS, GET_COLUMN_BY_ID, UPDATE_COLUMN } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ColumnModel from './column/models/ColumnModel';

export const addTagTypes = ['columns'];
const ColumnApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getColumns: build.query({
				query: () => ({ url: GET_CLIENTS }),
				providesTags: ['columns']
			}),

			deleteColumns: build.mutation({
				query: (columnIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: columnIds
				}),
				invalidatesTags: ['columns']
			}),

			getColumn: build.query({
				query: (columnId) => ({
					url: `${GET_COLUMN_BY_ID}${columnId}`
				}),
				providesTags: ['columns']
			}),
			updateColumn: build.mutation({
				query: (data) => ({
					url: `${UPDATE_COLUMN}${data?.type}/`,
					method: 'PUT',
					data
				}),

				invalidatesTags: ['columns']
			}),
			createColumn: build.mutation({
				query: (newColumn) => ({
					url: CREATE_CLIENT,
					method: 'POST',
					data: jsonToFormData(ColumnModel(newColumn))
				}),
				invalidatesTags: ['columns']
			})
		}),
		overrideExisting: false
	});
export default ColumnApi;
export const {
	useGetColumnsQuery,
	useDeleteColumnsMutation,
	useGetColumnQuery,
	useUpdateColumnMutation,
	useDeleteColumnMutation,
	useCreateColumnMutation
} = ColumnApi;

export const selectFilteredColumns = (columns) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return columns;
		}

		return FuseUtils.filterArrayByString(columns, searchText);
	});
