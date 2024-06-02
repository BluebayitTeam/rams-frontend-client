import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_DEMANDS,
	GET_DEMAND_BY_ID,
	CREATE_DEMAND,
	DELETE_DEMAND,
	UPDATE_DEMAND
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import DemandModel from './demand/models/DemandModel';

export const addTagTypes = ['demands'];
const DemandApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getDemands: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_DEMANDS,
					params: { page, size, searchKey }
				}),
				providesTags: ['demands']
			}),
			getMultiplePassengers: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_DEMANDS,
					params: { page, size, searchKey }
				}),
				providesTags: ['demands']
			}),
			deleteDemands: build.mutation({
				query: (demandIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: demandIds
				}),
				invalidatesTags: ['demands']
			}),
			getDemand: build.query({
				query: (demandId) => ({
					url: `${GET_DEMAND_BY_ID}${demandId}`
				}),
				providesTags: ['demands']
			}),
			createDemand: build.mutation({
				query: (newDemand) => ({
					url: CREATE_DEMAND,
					method: 'POST',
					data: jsonToFormData(DemandModel(newDemand))
				}),
				invalidatesTags: ['demands']
			}),
			updateDemand: build.mutation({
				query: (demand) => ({
					url: `${UPDATE_DEMAND}${demand.id}`,
					method: 'PUT',
					data: jsonToFormData(demand)
				}),
				invalidatesTags: ['demands']
			}),
			deleteDemand: build.mutation({
				query: (demandId) => ({
					url: `${DELETE_DEMAND}${demandId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['demands']
			})
		}),
		overrideExisting: false
	});
export default DemandApi;
export const {
	useGetDemandsQuery,
	useDeleteDemandsMutation,
	useGetDemandQuery,
	useUpdateDemandMutation,
	useDeleteDemandMutation,
	useCreateDemandMutation
} = DemandApi;

export const selectFilteredDemands = (demands) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return demands;
		}

		return FuseUtils.filterArrayByString(demands, searchText);
	});
