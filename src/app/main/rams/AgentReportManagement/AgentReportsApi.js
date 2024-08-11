import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { UPDATE_DEMAND_ASSIGN } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['agentReports'];
const AgentReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			createAgentReport: build.mutation({
				query: (newAgentReport) => ({
					url: UPDATE_DEMAND_ASSIGN,
					method: 'PUT',
					data: newAgentReport
				}),
				invalidatesTags: ['agentReports']
			})
		}),
		overrideExisting: false
	});
export default AgentReportApi;
export const { useCreateAgentReportMutation } = AgentReportApi;

export const selectFilteredAgentReports = (agentReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return agentReports;
		}

		return FuseUtils.filterArrayByString(agentReports, searchText);
	});
