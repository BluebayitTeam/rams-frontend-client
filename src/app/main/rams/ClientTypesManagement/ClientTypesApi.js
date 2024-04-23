import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_CLIENT_TYPE,
	DELETE_CLIENT_TYPE,
	GET_CLIENT_TYPES,
	GET_CLIENT_TYPE_BY_ID,
	UPDATE_CLIENT_TYPE
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ClientTypeModel from './clientType/models/ClientTypeModel';

export const addTagTypes = ['clientTypes'];
const ClientTypeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getClientTypes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CLIENT_TYPES, params: { page, size, searchKey } }),
				providesTags: ['clientTypes']
			}),
			deleteClientTypes: build.mutation({
				query: (clientTypeIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: clientTypeIds
				}),
				invalidatesTags: ['clientTypes']
			}),
			getClientType: build.query({
				query: (clientTypeId) => ({
					url: `${GET_CLIENT_TYPE_BY_ID}${clientTypeId}`
				}),
				providesTags: ['clientTypes']
			}),
			createClientType: build.mutation({
				query: (newClientType) => ({
					url: CREATE_CLIENT_TYPE,
					method: 'POST',
					data: jsonToFormData(ClientTypeModel(newClientType))
				}),
				invalidatesTags: ['clientTypes']
			}),
			updateClientType: build.mutation({
				query: (clientType) => ({
					url: `${UPDATE_CLIENT_TYPE}${clientType.id}`,
					method: 'PUT',
					data: jsonToFormData(clientType)
				}),
				invalidatesTags: ['clientTypes']
			}),
			deleteClientType: build.mutation({
				query: (clientTypeId) => ({
					url: `${DELETE_CLIENT_TYPE}${clientTypeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['clientTypes']
			})
		}),
		overrideExisting: false
	});
export default ClientTypeApi;
export const {
	useGetClientTypesQuery,
	useDeleteClientTypesMutation,
	useGetClientTypeQuery,
	useUpdateClientTypeMutation,
	useDeleteClientTypeMutation,

	useCreateClientTypeMutation
} = ClientTypeApi;

export const selectFilteredClientTypes = (clientTypes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return clientTypes;
		}

		return FuseUtils.filterArrayByString(clientTypes, searchText);
	});
