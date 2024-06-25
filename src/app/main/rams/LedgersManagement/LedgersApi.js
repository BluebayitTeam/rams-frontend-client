import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_LEDGER,
	DELETE_LEDGER,
	DELETE_LEDGER_MULTIPLE,
	GET_LEDGERS,
	GET_LEDGER_BY_ID,
	UPDATE_LEDGER
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import LedgerModel from './ledger/models/LedgerModel';

export const addTagTypes = ['ledgers'];
const LedgerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getLedgers: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_LEDGERS, params: { page, size, searchKey } }),
				providesTags: ['ledgers']
			}),
			deleteLedgers: build.mutation({
				query: (ledgerIds) => ({
					url: DELETE_LEDGER_MULTIPLE,
					method: 'DELETE',
					data: { ids: ledgerIds }
				}),
				invalidatesTags: ['ledgers']
			}),
			getLedger: build.query({
				query: (ledgerId) => ({
					url: `${GET_LEDGER_BY_ID}${ledgerId}`
				}),
				providesTags: ['ledgers']
			}),
			createLedger: build.mutation({
				query: (newLedger) => ({
					url: CREATE_LEDGER,
					method: 'POST',
					data: jsonToFormData(LedgerModel(newLedger))
				}),
				invalidatesTags: ['ledgers']
			}),
			updateLedger: build.mutation({
				query: (ledger) => ({
					url: `${UPDATE_LEDGER}${ledger.id}`,
					method: 'PUT',
					data: jsonToFormData(ledger)
				}),
				invalidatesTags: ['ledgers']
			}),
			deleteLedger: build.mutation({
				query: (ledgerId) => ({
					url: `${DELETE_LEDGER}${ledgerId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ledgers']
			})
		}),
		overrideExisting: false
	});
export default LedgerApi;
export const {
	useGetLedgersQuery,
	useDeleteLedgersMutation,
	useGetLedgerQuery,
	useUpdateLedgerMutation,
	useDeleteLedgerMutation,

	useCreateLedgerMutation
} = LedgerApi;

export const selectFilteredLedgers = (ledgers) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ledgers;
		}

		return FuseUtils.filterArrayByString(ledgers, searchText);
	});
