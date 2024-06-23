import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_QUALIFICATION,
	DELETE_QUALIFICATION,
	DELETE_QUALIFICATION_MULTIPLE,
	GET_QUALIFICATIONS,
	GET_QUALIFICATION_BY_ID,
	UPDATE_QUALIFICATION
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import QualificationModel from './qualification/models/QualificationModel';

export const addTagTypes = ['qualifications'];
const QualificationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getQualifications: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_QUALIFICATIONS, params: { page, size, searchKey } }),
				providesTags: ['qualifications']
			}),
			deleteQualifications: build.mutation({
				query: (qualificationIds) => ({
					url: DELETE_QUALIFICATION_MULTIPLE,
					method: 'DELETE',
					data: { ids: qualificationIds }
				}),
				invalidatesTags: ['qualifications']
			}),
			getQualification: build.query({
				query: (qualificationId) => ({
					url: `${GET_QUALIFICATION_BY_ID}${qualificationId}`
				}),
				providesTags: ['qualifications']
			}),
			createQualification: build.mutation({
				query: (newQualification) => ({
					url: CREATE_QUALIFICATION,
					method: 'POST',
					data: jsonToFormData(QualificationModel(newQualification))
				}),
				invalidatesTags: ['qualifications']
			}),
			updateQualification: build.mutation({
				query: (qualification) => ({
					url: `${UPDATE_QUALIFICATION}${qualification.id}`,
					method: 'PUT',
					data: jsonToFormData(qualification)
				}),
				invalidatesTags: ['qualifications']
			}),
			deleteQualification: build.mutation({
				query: (qualificationId) => ({
					url: `${DELETE_QUALIFICATION}${qualificationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['qualifications']
			})
		}),
		overrideExisting: false
	});
export default QualificationApi;
export const {
	useGetQualificationsQuery,
	useDeleteQualificationsMutation,
	useGetQualificationQuery,
	useUpdateQualificationMutation,
	useDeleteQualificationMutation,

	useCreateQualificationMutation
} = QualificationApi;

export const selectFilteredQualifications = (qualifications) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return qualifications;
		}

		return FuseUtils.filterArrayByString(qualifications, searchText);
	});
