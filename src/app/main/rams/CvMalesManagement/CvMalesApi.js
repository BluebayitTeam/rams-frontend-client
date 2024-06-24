import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_MALECVS,
	CREATE_MALECV,
	DELETE_MALECV,
	UPDATE_MALECV,
	MALECV_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CvMaleModel from './cvMale/models/CvMaleModel';

export const addTagTypes = ['cvMales'];
const CvMaleApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCvMales: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_MALECVS, params: { page, size, searchKey } }),
				providesTags: ['cvMales']
			}),
			deleteCvMales: build.mutation({
				query: (cvMaleIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: cvMaleIds
				}),
				invalidatesTags: ['cvMales']
			}),
			getCvMale: build.query({
				query: (cvMaleId) => ({
					url: `${MALECV_BY_PASSENGER_ID}${cvMaleId}`
				}),
				providesTags: ['cvMales']
			}),
			createCvMale: build.mutation({
				query: (newCvMale) => ({
					url: CREATE_MALECV,
					method: 'POST',
					data: jsonToFormData(CvMaleModel(newCvMale))
				}),
				invalidatesTags: ['cvMales']
			}),
			updateCvMale: build.mutation({
				query: (cvMale) => ({
					url: `${UPDATE_MALECV}${cvMale.id}`,
					method: 'PUT',
					data: jsonToFormData(cvMale)
				}),
				invalidatesTags: ['cvMales']
			}),
			deleteCvMale: build.mutation({
				query: (cvMaleId) => ({
					url: `${DELETE_MALECV}${cvMaleId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['cvMales']
			})
		}),
		overrideExisting: false
	});
export default CvMaleApi;
export const {
	useGetCvMalesQuery,
	useDeleteCvMalesMutation,
	useGetCvMaleQuery,
	useUpdateCvMaleMutation,
	useDeleteCvMaleMutation,
	useCreateCvMaleMutation
} = CvMaleApi;

export const selectFilteredCvMales = (cvMales) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return cvMales;
		}

		return FuseUtils.filterArrayByString(cvMales, searchText);
	});
