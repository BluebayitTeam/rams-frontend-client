import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_VISAREISSUELISTT,
	UPDATE_VISAREISSUELISTT,
	DELETE_VISAREISSUELISTT,
	VISAREISSUELIST_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import VisaReissueListModel from './visaReissueList/models/VisaReissueListModel';
// import VisaReissueListModel from './visaReissueList/models/VisaReissueListModel';

export const addTagTypes = ['visaReissueLists'];
const VisaReissueListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getVisaReissueList: build.query({
				query: (visaReissueListId) => ({
					url: `${VISAREISSUELIST_BY_PASSENGER_ID}${visaReissueListId}`
				}),
				providesTags: ['visaReissueLists']
			}),
			createVisaReissueList: build.mutation({
				query: (newVisaReissueList) => ({
					url: CREATE_VISAREISSUELISTT,
					method: 'POST',
					data: jsonToFormData(
						VisaReissueListModel({
							...newVisaReissueList
						})
					)
				}),
				invalidatesTags: ['visaReissueLists']
			}),
			updateVisaReissueList: build.mutation({
				query: (visaReissueList) => ({
					url: `${UPDATE_VISAREISSUELISTT}${visaReissueList.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...visaReissueList
					})
				}),
				invalidatesTags: ['visaReissueLists']
			}),
			deleteVisaReissueList: build.mutation({
				query: (visaReissueListId) => ({
					url: `${DELETE_VISAREISSUELISTT}${visaReissueListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['visaReissueLists']
			})
		}),
		overrideExisting: false
	});
export default VisaReissueListApi;
export const {
	useGetVisaReissueListsQuery,
	useDeleteVisaReissueListsMutation,
	useGetVisaReissueListQuery,
	useUpdateVisaReissueListMutation,
	useDeleteVisaReissueListMutation,
	useCreateVisaReissueListMutation
} = VisaReissueListApi;

export const selectFilteredVisaReissueLists = (visaReissueLists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return visaReissueLists;
		}

		return FuseUtils.filterArrayByString(visaReissueLists, searchText);
	});
