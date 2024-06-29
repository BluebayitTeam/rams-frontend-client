import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_CV_BANKS,
	CREATE_CV_BANK,
	DELETE_CV_BANK,
	UPDATE_CV_BANK,
	CV_BANK_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CvBankModel from './cvBank/models/CvBankModel';

export const addTagTypes = ['cvBanks'];
const CvBankApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCvBanks: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CV_BANKS, params: { page, size, searchKey } }),
				providesTags: ['cvBanks']
			}),
			deleteCvBanks: build.mutation({
				query: (cvBankIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: cvBankIds
				}),
				invalidatesTags: ['cvBanks']
			}),
			getCvBank: build.query({
				query: (cvBankId) => ({
					url: `${CV_BANK_BY_PASSENGER_ID}${cvBankId}`
				}),
				providesTags: ['cvBanks']
			}),
			createCvBank: build.mutation({
				query: (newCvBank) => ({
					url: CREATE_CV_BANK,
					method: 'POST',
					data: jsonToFormData(CvBankModel(newCvBank))
				}),
				invalidatesTags: ['cvBanks']
			}),
			updateCvBank: build.mutation({
				query: (cvBank) => ({
					url: `${UPDATE_CV_BANK}${cvBank.id}`,
					method: 'PUT',
					data: jsonToFormData(cvBank)
				}),
				invalidatesTags: ['cvBanks']
			}),
			deleteCvBank: build.mutation({
				query: (cvBankId) => ({
					url: `${DELETE_CV_BANK}${cvBankId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['cvBanks']
			})
		}),
		overrideExisting: false
	});
export default CvBankApi;
export const {
	useGetCvBanksQuery,
	useDeleteCvBanksMutation,
	useGetCvBankQuery,
	useUpdateCvBankMutation,
	useDeleteCvBankMutation,
	useCreateCvBankMutation
} = CvBankApi;

export const selectFilteredCvBanks = (cvBanks) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return cvBanks;
		}

		return FuseUtils.filterArrayByString(cvBanks, searchText);
	});
