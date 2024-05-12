import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	DELETE_OFFICEWORK,
	UPDATE_OFFICEWORK,
	CREATE_OFFICEWORK,
	OFFICEWORK_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import OfficeModel from './office/models/OfficeModel';

export const addTagTypes = ['offices'];
const OfficeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			// getOffices: build.query({
			// 	query: ({ page, size, searchKey }) => ({
			// 		url: GET_DEMANDS,
			// 		params: { page, size, searchKey }
			// 	}),
			// 	providesTags: ['offices']
			// }),
			deleteOffices: build.mutation({
				query: (officeIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: officeIds
				}),
				invalidatesTags: ['offices']
			}),
			getOffice: build.query({
				query: (officeId) => ({
					url: `${OFFICEWORK_BY_PASSENGER_ID}${officeId}`
				}),
				providesTags: ['offices']
			}),
			createOffice: build.mutation({
				query: (newOffice) => ({
					url: CREATE_OFFICEWORK,
					method: 'POST',
					data: jsonToFormData(OfficeModel(newOffice))
				}),
				invalidatesTags: ['offices']
			}),
			updateOffice: build.mutation({
				query: (office) => ({
					url: `${UPDATE_OFFICEWORK}${office.id}`,
					method: 'PUT',
					data: jsonToFormData(office)
				}),
				invalidatesTags: ['offices']
			}),
			deleteOffice: build.mutation({
				query: (officeId) => ({
					url: `${DELETE_OFFICEWORK}${officeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['offices']
			})
		}),
		overrideExisting: false
	});
export default OfficeApi;
export const {
	useGetOfficesQuery,
	useDeleteOfficesMutation,
	useGetOfficeQuery,
	useUpdateOfficeMutation,
	useDeleteOfficeMutation,
	useCreateOfficeMutation
} = OfficeApi;

export const selectFilteredOffices = (offices) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return offices;
		}

		return FuseUtils.filterArrayByString(offices, searchText);
	});
