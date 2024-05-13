import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_E_VISAENTRY } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CallingAssignModel from './callingAssign/models/CallingAssignModel';

export const addTagTypes = ['callingAssigns'];
const CallingAssignApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			createCallingAssign: build.mutation({
				query: (newCallingAssign) => ({
					url: CREATE_E_VISAENTRY,
					method: 'POST',
					data: jsonToFormData(CallingAssignModel(newCallingAssign))
				}),
				invalidatesTags: ['callingAssigns']
			})
		}),
		overrideExisting: false
	});
export default CallingAssignApi;
export const { useCreateCallingAssignMutation } = CallingAssignApi;

export const selectFilteredCallingAssigns = (callingAssigns) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return callingAssigns;
		}

		return FuseUtils.filterArrayByString(callingAssigns, searchText);
	});
