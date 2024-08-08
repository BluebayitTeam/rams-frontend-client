import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_RECRUITINGAGENCY,
	DELETE_RECRUITINGAGENCY,
	DELETE_RECRUITINGAGENCY_MULTIPLE,
	GET_RECRUITINGAGENCYS,
	GET_RECRUITINGAGENCY_BY_ID,
	UPDATE_RECRUITINGAGENCY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import RecruitingAgencyModel from './recruitingAgency/models/RecruitingAgencyModel';

export const addTagTypes = ['recruitingAgencys'];
const RecruitingAgencyApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getRecruitingAgencys: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_RECRUITINGAGENCYS,
					params: { page, size, searchKey }
				}),
				providesTags: ['recruitingAgencys']
			}),
			deleteRecruitingAgencys: build.mutation({
				query: (recruitingAgencyIds) => ({
					url: DELETE_RECRUITINGAGENCY_MULTIPLE,
					method: 'DELETE',
					data: { ids: recruitingAgencyIds }
				}),
				invalidatesTags: ['recruitingAgencys']
			}),
			getRecruitingAgency: build.query({
				query: (recruitingAgencyId) => ({
					url: `${GET_RECRUITINGAGENCY_BY_ID}${recruitingAgencyId}`
				}),
				providesTags: ['recruitingAgencys']
			}),
			createRecruitingAgency: build.mutation({
				query: (newRecruitingAgency) => ({
					url: CREATE_RECRUITINGAGENCY,
					method: 'POST',
					data: jsonToFormData(RecruitingAgencyModel(newRecruitingAgency))
				}),
				invalidatesTags: ['recruitingAgencys']
			}),
			updateRecruitingAgency: build.mutation({
				query: (recruitingAgency) => ({
					url: `${UPDATE_RECRUITINGAGENCY}${recruitingAgency.id}`,
					method: 'PUT',
					data: jsonToFormData(recruitingAgency)
				}),
				invalidatesTags: ['recruitingAgencys']
			}),
			deleteRecruitingAgency: build.mutation({
				query: (recruitingAgencyId) => ({
					url: `${DELETE_RECRUITINGAGENCY}${recruitingAgencyId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['recruitingAgencys']
			})
		}),
		overrideExisting: false
	});
export default RecruitingAgencyApi;
export const {
	useGetRecruitingAgencysQuery,
	useDeleteRecruitingAgencysMutation,
	useGetRecruitingAgencyQuery,
	useUpdateRecruitingAgencyMutation,
	useDeleteRecruitingAgencyMutation,

	useCreateRecruitingAgencyMutation
} = RecruitingAgencyApi;

export const selectFilteredRecruitingAgencys = (recruitingAgencys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return recruitingAgencys;
		}

		return FuseUtils.filterArrayByString(recruitingAgencys, searchText);
	});
