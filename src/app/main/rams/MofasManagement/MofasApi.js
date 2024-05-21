import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_MOFA, UPDATE_MOFA, DELETE_MOFA, MOFA_BY_PASSENGER_ID } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MofaModel from './mofa/models/MofaModel';

export const addTagTypes = ['mofas'];
const MofaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMofa: build.query({
				query: (mofaId) => ({
					url: `${MOFA_BY_PASSENGER_ID}${mofaId}`
				}),
				providesTags: ['mofas']
			}),
			createMofa: build.mutation({
				query: (newMofa) => ({
					url: CREATE_MOFA,
					method: 'POST',
					data: jsonToFormData(
						MofaModel({
							...newMofa
							// medical_exam_date: moment(new Date(newMofa?.medical_exam_date)).format('YYYY-MM-DD'),
							// medical_report_date: moment(new Date(newMofa?.medical_report_date)).format('YYYY-MM-DD'),
							// medical_issue_date: moment(new Date(newMofa?.medical_issue_date)).format('YYYY-MM-DD'),
							// medical_expiry_date: moment(new Date(newMofa?.medical_expiry_date)).format('YYYY-MM-DD')
						})
					)
				}),
				invalidatesTags: ['mofas']
			}),
			updateMofa: build.mutation({
				query: (medical) => ({
					url: `${UPDATE_MOFA}${medical.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...medical
						// medical_exam_date: moment(new Date(medical?.medical_exam_date)).format('YYYY-MM-DD'),
						// medical_report_date: moment(new Date(medical?.medical_report_date)).format('YYYY-MM-DD'),
						// medical_issue_date: moment(new Date(medical?.medical_issue_date)).format('YYYY-MM-DD'),
						// medical_expiry_date: moment(new Date(medical?.medical_expiry_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['mofas']
			}),
			deleteMofa: build.mutation({
				query: (mofaId) => ({
					url: `${DELETE_MOFA}${mofaId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['mofas']
			})
		}),
		overrideExisting: false
	});
export default MofaApi;
export const {
	useGetMofasQuery,
	useDeleteMofasMutation,
	useGetMofaQuery,
	useUpdateMofaMutation,
	useDeleteMofaMutation,
	useCreateMofaMutation
} = MofaApi;

export const selectFilteredMofas = (mofas) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return mofas;
		}

		return FuseUtils.filterArrayByString(mofas, searchText);
	});
