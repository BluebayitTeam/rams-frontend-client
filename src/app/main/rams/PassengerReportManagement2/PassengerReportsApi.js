import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	AGENT_FILTER_BY,
	AGENT_FILTER_WITHOUT_PG,
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerReports'];
const PassengerReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPassengerReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['passengerReports']
			}),
			getPassengerAllReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['passengerReports']
			}),
			deletePassengerReports: build.mutation({
				query: (passengerReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: passengerReportIds }
				}),
				invalidatesTags: ['passengerReports']
			}),
			getPassengerReport: build.query({
				query: (passengerReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${passengerReportId}`
				}),
				providesTags: ['passengerReports']
			}),
			createPassengerReport: build.mutation({
				query: (newPassengerReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newPassengerReport)
				}),
				invalidatesTags: ['passengerReports']
			}),
			updatePassengerReport: build.mutation({
				query: (passengerReport) => ({
					url: `${UPDATE_DEPARTMENT}${passengerReport.id}`,
					method: 'PUT',
					data: jsonToFormData(passengerReport)
				}),
				invalidatesTags: ['passengerReports']
			}),
			deletePassengerReport: build.mutation({
				query: (passengerReportId) => ({
					url: `${DELETE_DEPARTMENT}${passengerReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['passengerReports']
			})
		}),
		overrideExisting: false
	});
export default PassengerReportApi;
export const {
	useGetPassengerReportsQuery,
	useGetPassengerAllReportsQuery,
	useDeletePassengerReportsMutation,
	useGetPassengerReportQuery,
	useUpdatePassengerReportMutation,
	useDeletePassengerReportMutation,
	useCreatePassengerReportMutation
} = PassengerReportApi;

export const selectFilteredPassengerReports = (passengerReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerReports;
		}

		return FuseUtils.filterArrayByString(passengerReports, searchText);
	});
