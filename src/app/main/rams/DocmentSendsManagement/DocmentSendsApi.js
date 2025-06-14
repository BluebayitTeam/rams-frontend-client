import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_DOCUMENT_MAIL } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import DocmentSendModel from './docmentSend/models/DocmentSendModel';

export const addTagTypes = ['docmentSends'];
const DocmentSendApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			createDocmentSend: build.mutation({
				query: (newDocmentSend) => ({
					url: CREATE_DOCUMENT_MAIL,
					method: 'POST',
					data: DocmentSendModel({
						checkbox: newDocmentSend?.checkbox,
						passengers: newDocmentSend?.passengers,
						email: newDocmentSend?.email
					})
				}),
				invalidatesTags: ['docmentSends']
			})
		}),
		overrideExisting: false
	});
export default DocmentSendApi;
export const { useCreateDocmentSendMutation } = DocmentSendApi;

export const selectFilteredDocmentSends = (docmentSends) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return docmentSends;
		}

		return FuseUtils.filterArrayByString(docmentSends, searchText);
	});
