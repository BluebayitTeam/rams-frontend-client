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
import AgentModel from './client/models/AgentModel';

export const addTagTypes = ['agents'];
const AgentApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAgents: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CLIENTS, params: { page, size, searchKey } }),
				providesTags: ['agents']
			}),
			deleteAgents: build.mutation({
				query: (clientIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: clientIds
				}),
				invalidatesTags: ['agents']
			}),
			getAgent: build.query({
				query: (clientId) => ({
					url: `${GET_CLIENT_BY_ID}${clientId}`
				}),
				providesTags: ['agents']
			}),
			createAgent: build.mutation({
				query: (newAgent) => ({
					url: CREATE_CLIENT,
					method: 'POST',
					data: jsonToFormData(AgentModel(newAgent))
				}),
				invalidatesTags: ['agents']
			}),
			updateAgent: build.mutation({
				query: (client) => ({
					url: `${UPDATE_CLIENT}${client.id}`,
					method: 'PUT',
					data: jsonToFormData(client)
				}),
				invalidatesTags: ['agents']
			}),
			deleteAgent: build.mutation({
				query: (clientId) => ({
					url: `${DELETE_CLIENT}${clientId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['agents']
			})
		}),
		overrideExisting: false
	});
export default AgentApi;
export const {
	useGetAgentsQuery,
	useDeleteAgentsMutation,
	useGetAgentQuery,
	useUpdateAgentMutation,
	useDeleteAgentMutation,
	useCreateAgentMutation
} = AgentApi;

export const selectFilteredAgents = (agents) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return agents;
		}

		return FuseUtils.filterArrayByString(agents, searchText);
	});
