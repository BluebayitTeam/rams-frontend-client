import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import { CREATE_MULTIPLE_VISA_ENTRY } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import MultipleVisaEntryModel from './multipleVisaEntry/models/MultipleVisaEntryModel';

export const addTagTypes = ['multipleVisaEntrys'];
const MultipleVisaEntryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			createMultipleVisaEntry: build.mutation({
				query: (newMultipleVisaEntry) => ({
					url: CREATE_MULTIPLE_VISA_ENTRY,
					method: 'PUT',
					data: MultipleVisaEntryModel({
						visa_entry: newMultipleVisaEntry?.visa_entry,
						passengers: newMultipleVisaEntry?.passengers
					})
				}),
				invalidatesTags: ['multipleVisaEntrys']
			})
		}),
		overrideExisting: false
	});
export default MultipleVisaEntryApi;
export const { useCreateMultipleVisaEntryMutation } = MultipleVisaEntryApi;

export const selectFilteredMultipleVisaEntrys = (multipleVisaEntrys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return multipleVisaEntrys;
		}

		return FuseUtils.filterArrayByString(multipleVisaEntrys, searchText);
	});
