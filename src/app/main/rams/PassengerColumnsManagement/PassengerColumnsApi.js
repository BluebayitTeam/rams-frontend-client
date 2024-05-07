import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { ALL_USERS, CREATE_CLIENT, GET_CLIENTS, GET_COLUMN_BY_ID, UPDATE_COLUMN } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerColumnModel from './passengerColumn/models/PassengerColumnModel';

export const addTagTypes = ['passengerColumn'];
const PassengerColumnApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPassengerColumns: build.query({
				query: () => ({ url: GET_CLIENTS }),
				providesTags: ['passengerColumn']
			}),
			deletePassengerColumns: build.mutation({
				query: (columnIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: columnIds
				}),
				invalidatesTags: ['passengerColumn']
			}),
			getPassengerColumn: build.query({
				query: (columnId) => ({
					url: `${GET_COLUMN_BY_ID}${columnId}`
				}),
				providesTags: ['passengerColumn']
			}),
			updatePassengerColumn: build.mutation({
				query: (passengerColumn) => ({
					url: `${UPDATE_COLUMN}${passengerColumn?.type}`,
					method: 'PUT',
					data: passengerColumn
				}),
				invalidatesTags: ['passengerColumn']
			}),
			createPassengerColumn: build.mutation({
				query: (newPassengerColumn) => ({
					url: CREATE_CLIENT,
					method: 'POST',
					data: jsonToFormData(PassengerColumnModel(newPassengerColumn))
				}),
				invalidatesTags: ['passengerColumn']
			})
		}),
		overrideExisting: false
	});
export default PassengerColumnApi;
export const {
	useGetPassengerColumnsQuery,
	useDeletePassengerColumnsMutation,
	useGetPassengerColumnQuery,
	useUpdatePassengerColumnMutation,
	useDeletePassengerColumnMutation,

	useCreatePassengerColumnMutation
} = PassengerColumnApi;

export const selectFilteredPassengerColumns = (passengerColumn) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerColumn;
		}

		return FuseUtils.filterArrayByString(passengerColumn, searchText);
	});
