import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_CLIENT,
	DELETE_CLIENT,
	GET_CLIENTS,
	GET_CLIENT_BY_ID,
	UPDATE_CLIENT
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ClientModel from './client/models/ClientModel';

export const addTagTypes = ['clients'];
const ClientApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getClients: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CLIENTS, params: { page, size, searchKey } }),
				providesTags: ['clients']
			}),
			deleteClients: build.mutation({
				query: (clientIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: clientIds
				}),
				invalidatesTags: ['clients']
			}),
			getClient: build.query({
				query: (clientId) => ({
					url: `${GET_CLIENT_BY_ID}${clientId}`
				}),
				providesTags: ['clients']
			}),
			createClient: build.mutation({
				query: (newClient) => ({
					url: CREATE_CLIENT,
					method: 'POST',
					data: jsonToFormData(ClientModel(newClient))
				}),
				invalidatesTags: ['clients']
			}),
			updateClient: build.mutation({
				query: (client) => ({
					url: `${UPDATE_CLIENT}${client.id}`,
					method: 'PUT',
					data: jsonToFormData(client)
				}),
				invalidatesTags: ['clients']
			}),
			deleteClient: build.mutation({
				query: (clientId) => ({
					url: `${DELETE_CLIENT}${clientId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['clients']
			})
		}),
		overrideExisting: false
	});
export default ClientApi;
export const {
	useGetClientsQuery,
	useDeleteClientsMutation,
	useGetClientQuery,
	useUpdateClientMutation,
	useDeleteClientMutation,
	useCreateClientMutation
} = ClientApi;

export const selectFilteredClients = (clients) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return clients;
		}

		return FuseUtils.filterArrayByString(clients, searchText);
	});
