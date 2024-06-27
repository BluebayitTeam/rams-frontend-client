import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_FEMALECVS,
	GET_FEMALECV_BY_ID,
	CREATE_FEMALECV,
	DELETE_FEMALECV,
	UPDATE_FEMALECV
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CvFemaleModel from './cvFemale/models/CvFemaleModel';

export const addTagTypes = ['cvFemales'];
const CvFemaleApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCvFemales: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_FEMALECVS, params: { page, size, searchKey } }),
				providesTags: ['cvFemales']
			}),
			deleteCvFemales: build.mutation({
				query: (cvFemaleIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: cvFemaleIds
				}),
				invalidatesTags: ['cvFemales']
			}),
			getCvFemale: build.query({
				query: (cvFemaleId) => ({
					url: `${GET_FEMALECV_BY_ID}${cvFemaleId}`
				}),
				providesTags: ['cvFemales']
			}),
			getCvFemalePrint: build.query({
				query: (cvFemaleId) => ({
					url: `${GET_FEMALECV_BY_ID_FOR_PRINT}${cvFemaleId}`
				}),
				providesTags: ['cvFemales']
			}),
			createCvFemale: build.mutation({
				query: (newCvFemale) => ({
					url: CREATE_FEMALECV,
					method: 'POST',
					data: jsonToFormData(
						CvFemaleModel({
							...newCvFemale
							// date_of_birth: moment(new Date(newCvFemale?.date_of_birth)).format('YYYY-MM-DD'),
							// balance_date: moment(new Date(newCvFemale?.balance_date)).format('YYYY-MM-DD')
						})
					)
				}),
				invalidatesTags: ['cvFemales']
			}),
			updateCvFemale: build.mutation({
				query: (cvFemale) => ({
					url: `${UPDATE_FEMALECV}${cvFemale.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...cvFemale
						// date_of_birth: moment(new Date(cvFemale?.date_of_birth)).format('YYYY-MM-DD'),
						// balance_date: moment(new Date(cvFemale?.balance_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['cvFemales']
			}),
			deleteCvFemale: build.mutation({
				query: (cvFemaleId) => ({
					url: `${DELETE_FEMALECV}${cvFemaleId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['cvFemales']
			})
		}),
		overrideExisting: false
	});
export default CvFemaleApi;
export const {
	useGetCvFemalesQuery,
	useDeleteCvFemalesMutation,
	useGetCvFemaleQuery,
	useUpdateCvFemaleMutation,
	useDeleteCvFemaleMutation,
	useCreateCvFemaleMutation
} = CvFemaleApi;

export const selectFilteredCvFemales = (cvFemales) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return cvFemales;
		}

		return FuseUtils.filterArrayByString(cvFemales, searchText);
	});
