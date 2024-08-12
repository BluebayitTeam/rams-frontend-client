import { apiService as api } from 'app/store/apiService';
import { AGENT_FILTER_BY, AGENT_FILTER_WITHOUT_PG } from 'src/app/constant/constants';

// Define the tags for cache invalidation and refetching
export const addTagTypes = ['agentReports'];

// Configure API endpoints using the RTK Query API service
const AgentReportApi = api
	.enhanceEndpoints({
		addTagTypes // Specify tags to be used for cache management
	})
	.injectEndpoints({
		endpoints: (build) => ({
			// Endpoint for fetching agents with pagination and search
			getAgents: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['agentReports'] // Tags used for cache invalidation
			}),
			// Endpoint for fetching all agents without pagination
			getAllAgents: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['agentReports'] // Tags used for cache invalidation
			})
		}),
		overrideExisting: false // Prevent overriding existing endpoints
	});

// Export the API service hooks for use in components
export default AgentReportApi;
export const { useGetAgentsQuery, useGetAllAgentsQuery } = AgentReportApi;
