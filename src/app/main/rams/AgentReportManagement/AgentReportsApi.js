import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	AGENT_FILTER_BY,
	AGENT_FILTER_WITHOUT_PG,
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['agentReports'];
const AgentReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAgentReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['agentReports']
			}),
			getAgentAllReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['agentReports']
			}),
			deleteAgentReports: build.mutation({
				query: (agentReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: agentReportIds }
				}),
				invalidatesTags: ['agentReports']
			}),
			getAgentReport: build.query({
				query: (agentReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${agentReportId}`
				}),
				providesTags: ['agentReports']
			}),
			createAgentReport: build.mutation({
				query: (newAgentReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newAgentReport)
				}),
				invalidatesTags: ['agentReports']
			}),
			updateAgentReport: build.mutation({
				query: (agentReport) => ({
					url: `${UPDATE_DEPARTMENT}${agentReport.id}`,
					method: 'PUT',
					data: jsonToFormData(agentReport)
				}),
				invalidatesTags: ['agentReports']
			}),
			deleteAgentReport: build.mutation({
				query: (agentReportId) => ({
					url: `${DELETE_DEPARTMENT}${agentReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['agentReports']
			})
		}),
		overrideExisting: false
	});
export default AgentReportApi;
export const {
	useGetAgentReportsQuery,
	useGetAgentAllReportsQuery,
	useDeleteAgentReportsMutation,
	useGetAgentReportQuery,
	useUpdateAgentReportMutation,
	useDeleteAgentReportMutation,
	useCreateAgentReportMutation
} = AgentReportApi;

export const selectFilteredAgentReports = (agentReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return agentReports;
		}

		return FuseUtils.filterArrayByString(agentReports, searchText);
	});
