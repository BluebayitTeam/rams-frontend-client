import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	FOREIGNLEDGER_FILTER_BY,
	FOREIGNLEDGER_FILTER_WITHOUT_PG,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['foreignLedgerReports'];
const ForeignLedgerReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getForeignLedgerReports: build.query({
				query: (filterData) => ({
					url: FOREIGNLEDGER_FILTER_BY,
					params: filterData
				}),
				providesTags: ['foreignLedgerReports']
			}),
			getForeignLedgerAllReports: build.query({
				query: (filterData) => ({
					url: FOREIGNLEDGER_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['foreignLedgerReports']
			}),
			deleteForeignLedgerReports: build.mutation({
				query: (foreignLedgerReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: foreignLedgerReportIds }
				}),
				invalidatesTags: ['foreignLedgerReports']
			}),
			getForeignLedgerReport: build.query({
				query: (foreignLedgerReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${foreignLedgerReportId}`
				}),
				providesTags: ['foreignLedgerReports']
			}),
			createForeignLedgerReport: build.mutation({
				query: (newForeignLedgerReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newForeignLedgerReport)
				}),
				invalidatesTags: ['foreignLedgerReports']
			}),
			updateForeignLedgerReport: build.mutation({
				query: (foreignLedgerReport) => ({
					url: `${UPDATE_DEPARTMENT}${foreignLedgerReport.id}`,
					method: 'PUT',
					data: jsonToFormData(foreignLedgerReport)
				}),
				invalidatesTags: ['foreignLedgerReports']
			}),
			deleteForeignLedgerReport: build.mutation({
				query: (foreignLedgerReportId) => ({
					url: `${DELETE_DEPARTMENT}${foreignLedgerReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['foreignLedgerReports']
			})
		}),
		overrideExisting: false
	});
export default ForeignLedgerReportApi;
export const {
	useGetForeignLedgerReportsQuery,
	useGetForeignLedgerAllReportsQuery,
	useDeleteForeignLedgerReportsMutation,
	useGetForeignLedgerReportQuery,
	useUpdateForeignLedgerReportMutation,
	useDeleteForeignLedgerReportMutation,
	useCreateForeignLedgerReportMutation
} = ForeignLedgerReportApi;

export const selectFilteredForeignLedgerReports = (foreignLedgerReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return foreignLedgerReports;
		}

		return FuseUtils.filterArrayByString(foreignLedgerReports, searchText);
	});
