import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { UPDATE_DEMAND_ASSIGN } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import DemandAssignModel from './demandAssign/models/DemandAssignModel';

export const addTagTypes = ['demandAssigns'];
const DemandAssignApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			createDemandAssign: build.mutation({
				query: (newDemandAssign) => ({
					url: UPDATE_DEMAND_ASSIGN,
					method: 'PUT',
					data: DemandAssignModel({
						visa_entry: newDemandAssign?.visa_entry,
						status: newDemandAssign?.current_status,
						passengers: newDemandAssign?.passengers
					})
				}),
				invalidatesTags: ['demandAssigns']
			})
		}),
		overrideExisting: false
	});
export default DemandAssignApi;
export const { useCreateDemandAssignMutation } = DemandAssignApi;

export const selectFilteredDemandAssigns = (demandAssigns) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return demandAssigns;
		}

		return FuseUtils.filterArrayByString(demandAssigns, searchText);
	});
