import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_SUBLEDGER,
	DELETE_SUBLEDGER,
	DELETE_SUBLEDGER_MULTIPLE,
	GET_SUBLEDGERS,
	GET_SUBLEDGER_BY_ID,
	UPDATE_SUBLEDGER
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import SubLedgerModel from './subLedger/models/SubLedgerModel';

export const addTagTypes = ['subLedgers'];
const SubLedgerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSubLedgers: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_SUBLEDGERS, params: { page, size, searchKey } }),
				providesTags: ['subLedgers']
			}),
			deleteSubLedgers: build.mutation({
				query: (subLedgerIds) => ({
					url: DELETE_SUBLEDGER_MULTIPLE,
					method: 'DELETE',
					data: { ids: subLedgerIds }
				}),
				invalidatesTags: ['subLedgers']
			}),
			getSubLedger: build.query({
				query: (subLedgerId) => ({
					url: `${GET_SUBLEDGER_BY_ID}${subLedgerId}`
				}),
				providesTags: ['subLedgers']
			}),
			createSubLedger: build.mutation({
				query: (newSubLedger) => ({
					url: CREATE_SUBLEDGER,
					method: 'POST',
					data: jsonToFormData(SubLedgerModel(newSubLedger))
				}),
				invalidatesTags: ['subLedgers']
			}),
			updateSubLedger: build.mutation({
				query: (subLedger) => ({
					url: `${UPDATE_SUBLEDGER}${subLedger.id}`,
					method: 'PUT',
					data: jsonToFormData(subLedger)
				}),
				invalidatesTags: ['subLedgers']
			}),
			deleteSubLedger: build.mutation({
				query: (subLedgerId) => ({
					url: `${DELETE_SUBLEDGER}${subLedgerId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['subLedgers']
			})
		}),
		overrideExisting: false
	});
export default SubLedgerApi;
export const {
	useGetSubLedgersQuery,
	useDeleteSubLedgersMutation,
	useGetSubLedgerQuery,
	useUpdateSubLedgerMutation,
	useDeleteSubLedgerMutation,

	useCreateSubLedgerMutation
} = SubLedgerApi;

export const selectFilteredSubLedgers = (subLedgers) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return subLedgers;
		}

		return FuseUtils.filterArrayByString(subLedgers, searchText);
	});
